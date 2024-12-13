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


const getTicketbyForm = async (ticket_id, customer_id) => {
    try {
        // Kiểm tra và tìm ticket
        const ticket = await Ticket.findByPk(ticket_id);
        if (!ticket) {
            return "Ticket not found";
        }

        // Kiểm tra email và phone khớp
        if (customer_id !== ticket.customer_id) {
            return "Invalid customer id";
        }

        // Tìm customer liên quan
        const customer = await Customer.findByPk(customer_id);
        if (!customer) {
            return "Customer not found";
        }

        // Tìm booking liên quan
        const booking = await Booking.findByPk(ticket.booking_id);
        if (!booking) {
            return "Booking not found";
        }

        // Kết hợp dữ liệu để trả về
        const enrichedTicket = {
            ticket_id: ticket.ticket_id,
            customer_name: `${customer.first_name} ${customer.last_name}`,
            customer_id: customer_id,
            booking_date: booking.booking_date,
            price: ticket.price,
        };

        return enrichedTicket;
    } catch (error) {
        return "Error retrieving ticket";
    }
};

// TEST API
const cancelTicket = async (ticket_id)=> {
    const ticket = await Ticket.findByPk(ticket_id);
    const booking_id = ticket.booking_id;
    const booking = await Booking.findByPk(booking_id);
    const flight_id = ticket.flight_id;
    const flight = await Flight.findByPk(flight_id);
    const flight_date = flight.departure_time;
    const expire_date = new Date(flight_date.getTime() - 24*60*60*1000);
    const expire_date1 = new Date(flight_date.getTime() - 3*24*60*60*1000);

    const current_date = new Date();
    const seat_reservation = await SeatReservation.findOne({
        where: {
            seat_number: ticket.seat_number,
            flight_id, 
        }
    });
    let amount;
    if(expire_date1 >= current_date ){
        console.log("Huỷ vé và nhận lại 80% số tiền vé lúc đặt");
        amount = 0.8
    }
    else if(expire_date1 <= current_date && current_date <= expire_date){
        console.log("Huỷ vé và nhận lại 50% số tiền vé lúc đặt");
        amount = 0.5
    } else {
        console.log("Không thể hủy vé vì quá hạn");
        return "Yêu cầu hủy vé không thành công do quá hạn.";
    }
    if(current_date <= expire_date){
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
            return amount;
        } catch(error) {
            return "Internal Server Error";
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
    getTicketbyForm, createTicket, cancelTicket
}