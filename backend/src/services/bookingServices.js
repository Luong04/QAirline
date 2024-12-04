const Booking = require('../entity/bookings');
const Customer = require('../entity/customers');
const Flight = require('../entity/flights');
const Payment = require('../entity/payments');
const {createTicket} = require('./ticketServices');
const {createEmailforBooking} = require('./mailServices');
const redis = require('redis');
const publisher = redis.createClient();

const subscriber = redis.createClient();

publisher.on('connect', () => {
    console.log('Publisher connected to Redis');
});

publisher.on('error', (err) => {
    console.error('Publisher connection error:', err);
});

subscriber.on('connect', () => {
    console.log('Subscriber connected to Redis');
});

subscriber.on('error', (err) => {
    console.error('Subscriber connection error:', err);
});

const generatedBookings = new Set();

function generateBookingID() {
    const characters = '0123456789';
    let sufBookingID;
    // Tạo ticket ID ngẫu nhiên
    sufBookingID = Array.from({ length: 6 }, () =>
        characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');

    return sufBookingID;
}


const getAllBookingAdmin = async (req, res) => {
    try {
        const bookings = await Booking.findAll(); // Lấy tất cả chuyến bay từ cơ sở dữ liệu

        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching flights:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

/*
ham getbookingbyid tra ve :
+ ho ten: firstname + lastname
+ email
+ booking date
+ total price
+ status
*/

const getBookingById = async (req, res) => {
    try {
        const { id } = req.params; // Sử dụng 'id' thay vì 'booking_id'
        console.log(id);
        const booking = await Booking.findByPk(id); // Truy vấn thông tin booking theo ID

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        const customer = await Customer.findByPk(booking.customer_id); // Lấy thông tin khách hàng

        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        const passengers = await Promise.all(
            tickets.map(async (ticket) => {
                const passenger = await Customer.findByPk(ticket.customer_id);
                return {
                    ticket_id: ticket.ticket_id,
                    name: `${passenger.first_name} ${passenger.last_name}`,
                    customer_id: passenger.customer_id 
                };
            })
        );

        // Chuẩn bị dữ liệu trả về
        const enrichedBooking = {
            booking_id: booking.booking_id,
            customer_name: `${customer.first_name} ${customer.last_name}`,
            email: customer.email,
            booking_date: booking.booking_date,
            total_price: booking.total_price,
            status: booking.status,
            passengers
        };

        res.status(200).json(enrichedBooking);
    } catch (error) {
        console.error("Error fetching booking by ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
 
//khi ghép vs FE, create booking sẽ được tạo trước, xong hiện hộp thoại create payment xong mới thực hiện tạo vé ...

const createPayment = async (req, res) => {
    const { booking_id, amount, payment_method } = req.body;

    try {
        // Tạo thông tin thanh toán
        await Payment.create({
            booking_id,
            amount,
            payment_method
        });

        // Cập nhật trạng thái booking thành "paid"
        await Booking.update(
            { status: "Paid" },
            { where: { booking_id } }
        );

        await publisher.publish("booking_status", JSON.stringify({ booking_id, status: "Paid" }));

        res.status(200).json({ message: "Payment successful, booking marked as paid" });
    } catch (error) {
        console.error("Error in createPayment:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const cancelBooking = async (booking_id) => {
    try {
        const booking = await Booking.findByPk(booking_id);
        if (booking && booking.status === "Unpaid") {
            // Cập nhật trạng thái booking thành "cancelled"
            booking.status = "Cancelled";
            await booking.save();
        }
    } catch (error) {
        console.error("Error in cancelBooking:", error);
    }
};


const createBooking = async (req, res) => {
    const {
        customer_id,
        customer_firstname,
        customer_lastname,
        customer_email,
        customer_phone,
        customer_date_of_birth,
        flight_ids,
        number_ticket,
        passengers // gồm nhiều passenger, mỗi passenger gồm {passenger_id, passenger_firstname, passenger_lastname, passenger_seat, passenger_class, passenger_price}
    } = req.body;

    try {
        // Tạo khách hàng mới
        const [new_customer, created] = await Customer.upsert({
            customer_id: customer_id,
            first_name: customer_firstname,
            last_name: customer_lastname,
            email: customer_email,
            phone: customer_phone,
            date_of_birth: customer_date_of_birth
        });

        //khởi tạo biên tổng giá tiền
        let total = 0;
        for (const passenger of passengers) {
            total += passenger.passenger_price;
            const [new_passenger, created] = await Customer.upsert({
                customer_id: passenger.passenger_id,
                first_name: passenger.passenger_firstname,
                last_name: passenger.passenger_lastname,
            });
        }

        // Tính tổng giá tiền

        // Tạo booking với trạng thái "unpaid"
        const date = new Date();
        const preBookingID = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
        let booking_id;
        do {
            const sufBookingID = generateBookingID();
            booking_id = preBookingID + sufBookingID;
        } while(generatedBookings.has(booking_id));
        generatedBookings.add(booking_id);
        console.log(booking_id);
        const new_booking = await Booking.create({
            booking_id,
            customer_id: new_customer.customer_id,
            total_price: total,
            status: "Unpaid",
        });
        const newBookingId = new_booking.booking_id;

        subscriber.subscribe("booking_status");
       
        subscriber.on("message", async (channel, message) => {
            const { booking_id, status } = JSON.parse(message);

            if (channel === "booking_status" && Number(booking_id) === Number(newBookingId)) {
                console.log("status: ", status);
                if (status === "Paid") {
                    //tạo vé 
                    const dataTickets = [];
                    for(let j = 0 ; j < flight_ids.length; j++) {
                        for (let i = 0; i < number_ticket; i++) {
                            const ticket = {
                                booking_id: newBookingId,
                                flight_id: flight_ids[j],
                                customer_id: passengers[i].passenger_id,
                                seat_number: passengers[i].passenger_seat,
                                class: passengers[i].passenger_class,
                                price: passengers[i].passenger_price,
                            };
                            
                            const newTicket = await createTicket(ticket);
                            dataTickets.push(newTicket);
                        }
                    }
                    
                    // gửi mail
                    const subject = "[Thông báo] QAirline thông báo đặt vé thành công";
                    const to = customer_email;
                    const text = "Cảm ơn bạn đã sử dụng dịch vụ đặt vé máy bay của QAirline - Vui từng chuyến bay, dưới đây là thông tin đặt vé của bạn \n Nếu có thắc mắc hay phản hồi về dịch vụ của chúng tôi, liên hệ qua thông tin đã cung cấp trên trang chủ";
                    createEmailforBooking(to, subject, text, dataTickets, new_customer, new_booking);
                    subscriber.unsubscribe();
                    return res.status(200).json({ message: "Booking completed and tickets created!" });
                } else if (status === "Cancelled") {
                    subscriber.unsubscribe();
                    res.status(400).json({ error: "Booking has been cancelled" });
                }
            } else {
                return res.status(400).json({error: "Conflict ID or status"});
            }
        });
        setTimeout(async () => {
            await cancelBooking(newBookingId);
            res.status(408).json({ error: "Payment timeout. Booking not completed" });
            subscriber.unsubscribe();
        }, 120000); // 2 phút
    } catch (error) {
        console.error("Error in createBooking:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    getBookingById, getAllBookingAdmin, createBooking, cancelBooking, createBooking, createPayment
}