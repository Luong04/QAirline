const Ticket = require('../entity/tickets');
const Customer = require('../entity/customers');
const Booking = require('../entity/bookings');
const Flight = require('../entity/flights');
const SeatReservation = require('../entity/seats');
const { DATE } = require('sequelize');

//tạo id vé
const generatedTickets = new Set();

function generateTicketID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let ticketID;

    do {
        // Tạo ticket ID ngẫu nhiên
        ticketID = Array.from({ length: 6 }, () =>
            characters.charAt(Math.floor(Math.random() * characters.length))
        ).join('');
    } while (generatedTickets.has(ticketID)); // Đảm bảo không trùng

    // Thêm ticket ID vào tập hợp để theo dõi
    generatedTickets.add(ticketID);

    return ticketID;
}


const getTicketbyForm = async (req, res) => {
    try {
        const { ticket_id, email, phone } = req.body;

        // Kiểm tra và tìm ticket
        const ticket = await Ticket.findByPk(ticket_id);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        // Tìm customer liên quan
        const customer = await Customer.findByPk(ticket.customer_id);
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        // Tìm booking liên quan
        const booking = await Booking.findByPk(ticket.booking_id);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        // Kiểm tra email và phone khớp
        if (email !== customer.email || phone !== customer.phone) {
            return res.status(400).json({ error: "Invalid email or phone" });
        }

        // Kết hợp dữ liệu để trả về
        const enrichedTicket = {
            ticket_id: ticket.ticket_id,
            customer_name: `${customer.first_name} ${customer.last_name}`,
            email: customer.email,
            booking_date: booking.booking_date,
            price: ticket.price,
        };

        res.status(200).json(enrichedTicket);
    } catch (error) {
        console.error("Error retrieving ticket:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// TEST API
const cancelTicket = async (req, res)=> {
    const {ticket_id} = req.body;
    const ticket = await Ticket.findByPk(ticket_id);
    const booking_id = ticket.booking_id;
    const booking = await Booking.findByPk(booking_id);
    const flight_id = ticket.flight_id;
    const flight = await Flight.findByPk(flight_id);
    const flight_date = flight.departure_time;
    const expire_date = new Date(flight_date.getTime() - 3*24*60*60*1000);
    const current_date = new Date();
    const seat_reservation = await SeatReservation.findOne({
        where: {
            seat_number: ticket.seat_number,
            flight_id, 
        }
    });
    if(expire_date <= current_date ){
        console.log("Huỷ vé thất bại do quá hạn");
        res.status(400).json({
            success: false,
            message: "Không thể hủy vé vì đã vượt qua thời hạn cho phép hủy trước giờ khởi hành."
        });
    } else {
        try {
            await Ticket.destroy({
                where: {
                    ticket_id: ticket_id
                }
            });
            await SeatReservation.update(
                { status: "available" },
                { where: {seat_reservation_id: seat_reservation.seat_reservation_id} }
            );
            res.status(200).json({
                success: true,
                message: "Bạn đã hủy vé thành công"
            })
        } catch(error) {
            res.status(500).json({
                error: "Internal Server Error"
            })
        }
    }
}


const createTicket = async (ticket) => {
    const ticket_id = generateTicketID();
    const booking_id = ticket.booking_id;
    const customer_id  = ticket.customer_id;
    const flight_id = ticket.flight_id;
    const seat_number = ticket.seat_number;
    const type = ticket.class; 
    const price = ticket.price;
    const seat_reservation = await SeatReservation.findOne({
        where: {
            seat_number: ticket.seat_number,
            flight_id, 
        }
    });
    const newTicket = await Ticket.create({
        ticket_id,
        booking_id,
        customer_id,
        flight_id,
        seat_number,
        class: type, 
        price
    })
    if (newTicket) {
        await SeatReservation.update(
            { status: "reserved" },
            { where: {seat_reservation_id: seat_reservation.seat_reservation_id} }
        );
        return newTicket; // Trả về ticket thay vì gửi response
    }

    throw new Error("Can't create ticket");
}

module.exports = {
    getTicketbyForm, createTicket
}