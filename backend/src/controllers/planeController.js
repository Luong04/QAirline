const { AsyncQueueError } = require('sequelize');
const planeServices = require('../services/planeServices');
const Plane = require('../entity/planes');

// Tạo mới hoặc cập nhật máy bay
const createPlane = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        if (!authHeader || authHeader !== "Bearer admin") {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const { plane_id, model, total_seat, seat_economy, seat_business } = req.body;
        if (!plane_id || !model || !total_seat || !seat_economy || !seat_business) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        await Plane.create({
            plane_id,
            model,
            total_seat,
            seat_economy,
            seat_business
        });
        return res.status(200).json({ message: 'Plane created successfully' });
    } catch (error) {
        console.error("Error creating plane:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Cập nhật thông tin máy bay
const updatePlane = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        if (!authHeader || authHeader !== "Bearer admin") {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const { plane_id, model, total_seat, seat_economy, seat_business } = req.body;
        if (!plane_id || !model || !total_seat || !seat_economy || !seat_business) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Sử dụng phương thức update của Sequelize để cập nhật thông tin máy bay
        const updated = await Plane.update(
            {
                model,
                total_seat,
                seat_economy,
                seat_business
            },
            {
                where: { plane_id }  // Tìm máy bay theo plane_id
            }
        );

        if (updated[0] === 0) {  // Kiểm tra xem có bản ghi nào được cập nhật không
            return res.status(404).json({ message: 'Plane not found' });
        }

        return res.status(200).json({ message: 'Plane updated successfully' });
    } catch (error) {
        console.error("Error updating plane:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Xóa máy bay
const removePlane = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        if (!authHeader || authHeader !== "Bearer admin") {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const { plane_id } = req.body;
        if (!plane_id) {
            return res.status(400).json({ message: 'Missing required field: plane_id' });
        }

        // Sử dụng phương thức destroy của Sequelize để xóa máy bay
        const deleted = await Plane.destroy({
            where: { plane_id }
        });

        if (deleted === 0) {  // Kiểm tra xem có bản ghi nào được xóa không
            return res.status(404).json({ message: 'Plane not found' });
        }

        return res.status(200).json({ message: 'Plane removed successfully' });
    } catch (error) {
        console.error("Error removing plane:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getPlane = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        if (!authHeader || authHeader !== "Bearer admin") {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        const planes = await Plane.findAll();
        return res.status(200).json({ planes });
    } catch (error) {
        console.error("Error get plane:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    createPlane,
    updatePlane,
    removePlane,
    getPlane
};
