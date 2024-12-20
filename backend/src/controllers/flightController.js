const flightServices = require('../services/flightServices');
const Plane = require('../entity/planes');
const Airport = require('../entity/airports');
// Lấy tất cả chuyến bay
const getAllFlight = async (req, res) => {
    try {
        const flights = await flightServices.getAllFlights();
        if (!flights || flights.length === 0) {
            return res.status(404).json({ error: "No flights found" });
        }

        // Lấy danh sách sân bay và hãng hàng không
        const airports = await Airport.findAll({ attributes: ['airport_id', 'name'] });
        const planes = await Plane.findAll({ attributes: ['plane_id', 'model'] });

        // Tạo ánh xạ ID -> Tên
        const airportMap = Object.fromEntries(
            airports.map((airport) => [airport.airport_id, airport.name])
        );

        const planeMap = Object.fromEntries(
            planes.map((plane) => [plane.plane_id, plane.model])
        );

        // Gắn tên vào các chuyến bay và loại bỏ các cột không cần thiết
        const enrichedFlights = flights.map((flight) => {
            const flightJSON = flight.toJSON(); // Chuyển đổi Sequelize instance thành object thuần
            return {
                flight_id: flightJSON.flight_id,
                departure_code: airportMap[flightJSON.departure_airport_id] || "Unknown Airport",
                arrival_code: airportMap[flightJSON.arrival_airport_id] || "Unknown Airport",
                plane: planeMap[flightJSON.plane_id] || "Unknown Plane",
                departure_time: flightJSON.departure_time,
                arrival_time: flightJSON.arrival_time,
                duration: flightJSON.duration,
                status: flightJSON.status,
                true_price_economy: flightJSON.true_price_economy,
                true_price_business: flightJSON.true_price_business
            };
        });

        res.status(200).json(enrichedFlights);
    } catch (error) {
        console.error("Error fetching flights:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Lấy chuyến bay theo ID
const getFlightById = async (req, res) => {
    try {
        const { id } = req.params;
        const flight = await flightServices.getFlightById(id);
        if (!flight) {
            return res.status(404).json({ message: "Flight not found" });
        }
        return res.status(200).json(flight);
    } catch (error) {
        console.error("Error fetching flight by ID:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Lấy chuyến bay theo trạng thái
const getFlightByStatus = async (req, res) => {
    try {
        const { status } = req.query;
        const flights = await flightServices.getFlightByStatus(status);
        return res.status(200).json(flights);
    } catch (error) {
        console.error("Error fetching flight by status:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Tạo mới chuyến bay
const createFlight = async (req, res) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || authHeader !== "Bearer admin") {
        return res.status(403).json({ message: "Unauthorized access" });
    }

    try {
        const {flightData} = req.body;
        console.log("asadsads:",flightData)
        await flightServices.createFlight(flightData);
        return res.status(201).json({ message: "Flight created successfully" });
    } catch (error) {
        console.error("Error creating flight:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Cập nhật chuyến bay
const updateFlight = async (req, res) => {
    console.log("goi duoc vo day roi");
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || authHeader !== "Bearer admin") {
        return res.status(403).json({ message: "Unauthorized access" });
    }


    try {
        const { id } = req.params;
        const flightData = req.body;
        await flightServices.updateFlight(id, flightData);
        return res.status(200).json({ message: "Flight updated successfully" });
    } catch (error) {
        console.error("Error updating flight:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Xóa chuyến bay
const deleteFlight = async (req, res) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || authHeader !== "Bearer admin") {
        return res.status(403).json({ message: "Unauthorized access" });
    }


    try {
        const { id } = req.params;
        await flightServices.deleteFlight(id);
        return res.status(200).json({ message: "Flight deleted successfully" });
    } catch (error) {
        console.error("Error deleting flight:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Lấy tất cả chuyến bay (chỉ dành cho Admin)
const getAllFlightAdmin = async (req, res) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || authHeader !== "Bearer admin") {
        return res.status(403).json({ message: "Unauthorized access" });
    }


    try {
        const flights = await flightServices.getAllFlights();
        return res.status(200).json(flights);
    } catch (error) {
        console.error("Error fetching all flights for admin:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Tìm kiếm chuyến bay
const findFlight = async (req, res) => {
    try {
        const searchCriteria = req.body;
        const flights = await flightServices.findFlight(searchCriteria);
        console.log(flights);
        return res.status(200).json(flights);
    } catch (error) {
        console.error("Error finding flight:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Tìm kiếm thông tin cơ bản của chuyến bay
const findBasicFlight = async (req, res) => {
    try {
        const { id } = req.body;
        const flight = await flightServices.getFlightById(id);
        if (!flight) {
            return res.status(404).json({ message: "Basic flight information not found" });
        }

        return res.status(200).json(flight);
    } catch (error) {
        console.error("Error fetching basic flight information:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getAllFlight,
    getFlightById,
    getFlightByStatus,
    createFlight,
    updateFlight,
    deleteFlight,
    getAllFlightAdmin,
    findFlight,
    findBasicFlight
};
