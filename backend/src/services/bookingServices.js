const Booking = require('../entity/bookings');
const Customer = require('../entity/customers');
const Payment = require('../entity/payments');
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
    return Array.from({ length: 6 }, () =>
        characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
}
 
async function getAllBookings() {
    return await Booking.findAll();
}

async function getBookingByForm(id, email, phone) {
    const booking = await Booking.findByPk(id);
    if (!booking) throw new Error("Booking not found");

    const customer = await Customer.findByPk(booking.customer_id);
    if (!customer) throw new Error("Customer not found");

    if(email !== customer.customer_email || phone !== customer.customer_phone){
        throw new Error("Email or Phone does not match");
    }

    const enrichedBooking = {
        booking_id: booking.booking_id,
        customer_name: `${customer.first_name} ${customer.last_name}`,
        email: customer.email,
        booking_date: booking.booking_date,
        total_price: booking.total_price,
        status: booking.status
    };
    return enrichedBooking;
}

async function createPayment(booking_id, amount, payment_method) {
    await Payment.create({
        booking_id,
        amount,
        payment_method
    });

    await Booking.update(
        { status: "Paid" },
        { where: { booking_id } }
    );

    await publisher.publish("booking_status", JSON.stringify({ booking_id, status: "Paid" }));
}

async function cancelBooking(booking_id) {
    const booking = await Booking.findByPk(booking_id);
    if (booking && booking.status === "Unpaid") {
        booking.status = "Cancelled";
        await booking.save();
    }
}

async function createBooking(customerData, flightData, passengers) {
    const { customer_id, customer_firstname, customer_lastname, customer_email, customer_phone, customer_date_of_birth } = customerData;
    const { flight_ids, number_ticket } = flightData;

    const [new_customer] = await Customer.upsert({
        customer_id,
        first_name: customer_firstname,
        last_name: customer_lastname,
        email: customer_email,
        phone: customer_phone,
        date_of_birth: customer_date_of_birth
    });

    let total = passengers.reduce((sum, p) => sum + p.passenger_price, 0);
    const date = new Date();
    const preBookingID = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;

    let booking_id;
    do {
        const sufBookingID = generateBookingID();
        booking_id = preBookingID + sufBookingID;
    } while (generatedBookings.has(booking_id));
    generatedBookings.add(booking_id);

    const new_booking = await Booking.create({
        booking_id,
        customer_id: new_customer.customer_id,
        total_price: total,
        status: "Unpaid",
    });

    return new_booking;
}

module.exports = {
    getAllBookings,
    getBookingByForm,
    createPayment,
    cancelBooking,
    createBooking
};
