const bookingServices = require('../services/bookingServices');

const getAllBookingAdmin = async (req, res) => {
    try {
        const bookings = await bookingServices.getAllBookings();
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getBookingByForm = async (req, res) => {
    try {
        const { booking_id, cccd, email } = req.body;
        const bookingInfo = await bookingServices.getBookingByForm(booking_id, cccd, email);

        if (!bookingInfo) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.status(200).json(bookingInfo);
    } catch (error) {
        console.error("Error fetching booking by ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const createBooking = async (req, res) => {
    try {
        const bookingData = req.body;
        const result = await bookingServices.createBooking(bookingData);

        if (result.status === "timeout") {
            return res.status(408).json({ error: "Payment timeout. Booking not completed" });
        } else if (result.status === "cancelled") {
            return res.status(400).json({ error: "Booking has been cancelled" });
        } else if (result.status === "completed") {
            return res.status(200).json({ message: "Booking completed and tickets created!" });
        }
    } catch (error) {
        console.error("Error in createBooking:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const createPayment = async (req, res) => {
    try {
        const paymentData = req.body;
        await bookingServices.createPayment(paymentData);
        res.status(200).json({ message: "Payment successful, booking marked as paid" });
    } catch (error) {
        console.error("Error in createPayment:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    getAllBookingAdmin,
    getBookingByForm,
    createBooking,
    createPayment
};
