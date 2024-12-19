const seatServices = require('../services/seatServices');

// Tạo mới hoặc cập nhật máy bay
const findSeatReservations = async (req, res) => {
    try {
        const { goFlightId, returnFlightId } = req.body;
        if (!goFlightId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const seatReservation = await seatServices.findSeatReservations(goFlightId, returnFlightId);
        return res.status(200).json(seatReservation);
    } catch (error) {
        console.error("Error retrieve seat reservation:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    findSeatReservations
}