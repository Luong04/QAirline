const Ticket = require('../entity/tickets');
const Customer = require('../entity/customers');
const Booking = require('../entity/bookings');
const Flight = require('../entity/flights');

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
    const {ticket_id, email, phone} = req.body();
    const ticket = await Ticket.findByPk(ticket_id);
    if (!ticket) {
        res.status(404).json({ error: "Flight not found" });
    } else {
        customer = await Customer.findByPk(ticket.customer_id);
        booking = await Booking.findByPk(ticket.booking_id);
        if(email === customer.email && phone === customer.phone){
            const enrichedTicket = {
                ticket_id: ticket.ticket_id,
                customer_name: `${customer.first_name} ${customer.last_name}`,
                email: customer.email,
                booking_date: booking.booking_date,
                price: ticket.price,
            }
        }
        res.status(200).json(enrichedTicket);
    }
}

const createTicket = async (ticket) => {
    const ticket_id = generateTicketID();
    const booking_id = ticket.booking_id;
    const flight_id = ticket.flight_id;
    const seat_number = ticket.seat_number;
    const tclass = ticket.tclass; 
    const price = ticket.price;
    const newTicket = await Ticket.create({
        ticket_id,
        booking_id,
        flight_id,
        seat_number,
        tclass, 
        price
    })
    if(newTicket) res.status(201).json(newTicket);
    else res.status(500).json({error: "Can't create ticket"});
}

module.exports = {
    getTicketbyForm, createTicket
}