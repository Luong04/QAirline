const planeServices = require('../services/planeServices');

// Tạo mới hoặc cập nhật máy bay
const createPlane = async (req, res) => {
    try {
        if (!req.session.authenticated) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        const { plane_id, model, total_seat, seat_economy, seat_business } = req.body;
        if (!plane_id || !model || !total_seat || !seat_economy || !seat_business) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        await planeServices.createPlane(plane_id, model, total_seat, seat_economy, seat_business);
        return res.status(200).json({ message: 'Plane created successfully' });
    } catch (error) {
        console.error("Error creating plane:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Cập nhật thông tin máy bay
const updatePlane = async (req, res) => {
    try {
        if (!req.session.authenticated) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        const { model, total_seat, seat_economy, seat_business } = req.body;
        if (!model || !total_seat || !seat_economy || !seat_business) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        await planeServices.updatePlane(model, total_seat, seat_economy, seat_business);
        return res.status(200).json({ message: 'Plane updated successfully' });
    } catch (error) {
        console.error("Error updating plane:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Xóa máy bay
const removePlane = async (req, res) => {
    try {
        if (!req.session.authenticated) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        const { plane_id } = req.body;
        if (!plane_id) {
            return res.status(400).json({ message: 'Missing required field: plane_id' });
        }

        await planeServices.removePlane(plane_id);
        return res.status(200).json({ message: 'Plane removed successfully' });
    } catch (error) {
        console.error("Error removing plane:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    createPlane,
    updatePlane,
    removePlane
};
