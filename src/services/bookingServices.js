const Booking = require('../entity/bookings');
const Customer = require('../entity/customers');
const Ticket = require('../entity/tickets');


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

        // Chuẩn bị dữ liệu trả về
        const enrichedBooking = {
            booking_id: booking.booking_id,
            customer_name: `${customer.first_name} ${customer.last_name}`,
            email: customer.email,
            booking_date: booking.booking_date,
            total_price: booking.total_price,
            status: booking.status,
        };

        res.status(200).json(enrichedBooking);
    } catch (error) {
        console.error("Error fetching booking by ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const createBooking = async (req, res) => {
      
}



module.exports = {
    getBookingById, getAllBookingAdmin, createBooking
}