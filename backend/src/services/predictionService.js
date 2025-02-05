const { name } = require('ejs');
const Airport = require('../entity/airports');
const { Op } = require('sequelize');
const Plane = require('../entity/planes');

const getPlaces = async (req, res) => {
    const { query } = req.query; // Lấy tham số tìm kiếm từ query string
    try {
        // Tìm các sân bay chứa từ khóa tìm kiếm (query)
        const airports = await Airport.findAll({
            
            attributes: ['name'] // Lấy cột 'name' của sân bay
        });

        // Chuyển đổi kết quả thành JSON
        const enrichedAirports = airports.map((airport) => {
            return airport.name; // Trả về tên sân bay
        });

        res.status(200).json(enrichedAirports); // Trả kết quả JSON
    } catch (error) {
        console.error('Error fetching airports:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPlanes = async (req, res) => {
    const { query } = req.query; // Lấy tham số tìm kiếm từ query string
    try {
        // Tìm các sân bay chứa từ khóa tìm kiếm (query)
        const planes = await Plane.findAll({
            attributes: ['plane_id'] // Lấy cột 'name' của sân bay
        });

        // Chuyển đổi kết quả thành JSON
        const enrichedPlanes = planes.map((plane) => {
            return plane.plane_id; // Trả về tên sân bay
        });

        res.status(200).json(enrichedPlanes); // Trả kết quả JSON
    } catch (error) {
        console.error('Error fetching planes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getPlaces, getPlanes
};
