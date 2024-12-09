const Flight = require('../entity/flights')
const Plane = require('../entity/planes');
const Airport = require('../entity/airports');
const { Op } = require('sequelize');
const moment = require('moment');
const ECONOMY_PRICE = 1000000;
const BUSINESS_PRICE = 3000000;
const getAllFlightAdmin = async (req, res) => {
    try {
        const flights = await Flight.findAll(); // Lấy tất cả chuyến bay từ cơ sở dữ liệu

        res.status(200).json(flights);
    } catch (error) {
        console.error("Error fetching flights:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getFlightById = async (req, res) => {
    const { id } = req.params;
    try {
        const flight = await Flight.findByPk(id);
        if (flight) {
            res.status(200).json(flight);
        } else {
            res.status(404).json({ error: "Flight not found" });
        }
    } catch (error) {
        console.error("Error fetching flight:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getAllFlight = async (req, res) => {
    try {
        // Lấy tất cả chuyến bay
        const flights = await Flight.findAll();
        
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
                departure_airport: airportMap[flightJSON.departure_airport_id] || "Unknown Airport",
                arrival_airport: airportMap[flightJSON.arrival_airport_id] || "Unknown Airport",
                plane: planeMap[flightJSON.plane_id] || "Unknown Plane",
                departure_time: flightJSON.departure_time,
                arrival_time: flightJSON.arrival_time,
                duration: flightJSON.duration,
                status: flightJSON.status,
            };
        });

        res.status(200).json(enrichedFlights);
    } catch (error) {
        console.error("Error fetching flights:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const getFlightByStatus = async (req, res) => {
    const {status} = req.params;
    try {
        const flight = await Flight.findOne({ where: {status: status }});
        if (flight) {
            res.status(200).json(flight);
        } else {
            res.status(404).json({ error: "Flight not found" });
        }
    } catch (error) {
        console.error("Error fetching flight:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const createFlight = async (req, res) => {
    const { plane_id, departure_airport_id, arrival_airport_id, departure_time, arrival_time, duration, status } = req.body;
    try {
        const newFlight = await Flight.create({
            plane_id,
            departure_airport_id,
            arrival_airport_id,
            departure_time,
            arrival_time,
            duration,
            status
        });
        res.status(201).json(newFlight);
    } catch (error) {
        console.error("Error creating flight:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const updateFlight = async (req, res) => {
    const { id } = req.params;
    const { plane_id, departure_airport_id, arrival_airport_id, departure_time, arrival_time, duration, status } = req.body;

    try {
        const flight = await Flight.findByPk(id);
        if (flight) {
            await flight.update({
                plane_id,
                departure_airport_id,
                arrival_airport_id,
                departure_time,
                arrival_time,
                duration,
                status
            });
            res.status(200).json(flight);
        } else {
            res.status(404).json({ error: "Flight not found" });
        }
    } catch (error) {
        console.error("Error updating flight:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteFlight = async (req, res) => {
    const { id } = req.params;
    try {
        const flight = await Flight.findByPk(id);
        if (flight) {
            await flight.destroy();
            res.status(200).json({ message: "Flight deleted successfully" });
        } else {
            res.status(404).json({ error: "Flight not found" });
        }
    } catch (error) {
        console.error("Error deleting flight:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const findFlight = async (req, res) => {
    const { departure_place, arrival_place, is_one_way, departure_date, comeback_date, numberTicket, typeTicket } = req.body;

    // Tìm sân bay
    const departure_airport = await Airport.findOne({ where: { name: departure_place } });
    const arrival_airport = await Airport.findOne({ where: { name: arrival_place } });

    if (!departure_airport || !arrival_airport) {
        return res.status(404).json({ message: 'Không tìm thấy sân bay' });
    }

    // Định dạng và kiểm tra ngày đi
    const formattedDate = moment(departure_date, 'YYYY-MM-DD', true).format('YYYY-MM-DD');
    if (!moment(formattedDate, 'YYYY-MM-DD', true).isValid()) {
        return res.status(400).json({ message: 'Ngày đi không hợp lệ' });
    }

    // Tìm chuyến bay đi (departure)
    const foundFlight = await Flight.findAll({
        where: {
            departure_airport_id: departure_airport.airport_id,
            arrival_airport_id: arrival_airport.airport_id,
            departure_time: {
                [Op.gte]: `${formattedDate} 00:00:00`,
                [Op.lt]: `${formattedDate} 23:59:59`
            }
        }
    });

    if (foundFlight.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy chuyến bay đi' });
    }

    if (is_one_way === "true") {
        const result = await Promise.all(foundFlight.map(async (flight) => {
            const plane = await Plane.findByPk(flight.plane_id);
            return {
                flight_id: flight.flight_id,
                departure_code: departure_airport.code,
                arrival_code: arrival_airport.code,
                departure_time: flight.departure_time,
                arrival_time: flight.arrival_time,
                plane: plane.model,
                duration_time: flight.duration,
                economy_price: 1000000, // Giá vé kinh tế giả định
                business_price: 3000000, // Giá vé hạng thương gia giả định
                number_ticket: numberTicket, // Số lượng vé
                type_ticket: typeTicket // Loại vé (economy hoặc business)
            };
        }));
        return res.status(200).json(result);
    }

    // Xử lý chuyến bay khứ hồi (comeback)
    if (comeback_date !== "") {
        const formattedComebackDate = moment(comeback_date, 'YYYY-MM-DD', true).format('YYYY-MM-DD');
        if (!moment(formattedComebackDate, 'YYYY-MM-DD', true).isValid()) {
            return res.status(400).json({ message: 'Ngày khứ hồi không hợp lệ' });
        }

        // Tìm chuyến bay về (comeback)
        const returnFlight = await Flight.findAll({
            where: {
                departure_airport_id: arrival_airport.airport_id,
                arrival_airport_id: departure_airport.airport_id,
                departure_time: {
                    [Op.gte]: `${formattedComebackDate} 00:00:00`,
                    [Op.lt]: `${formattedComebackDate} 23:59:59`
                }
            }
        });

        if (returnFlight.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy chuyến bay khứ hồi' });
        }

        // Nếu tìm thấy chuyến bay đi và về
        const go_result = await Promise.all(foundFlight.map(async (flight) => {
            const plane = await Plane.findByPk(flight.plane_id);
            return {
                flight_id: flight.flight_id,
                departure_code: departure_airport.code,
                arrival_code: arrival_airport.code,
                departure_time: flight.departure_time,
                arrival_time: flight.arrival_time,
                plane: plane.model,
                duration_time: flight.duration,
                economy_price: 1000000,
                business_price: 3000000,
                number_ticket: numberTicket,
                type_ticket: typeTicket
            };
        }));

        const comeback_result = await Promise.all(returnFlight.map(async (flight) => {
            const plane = await Plane.findByPk(flight.plane_id);
            return {
                flight_id: flight.flight_id,
                departure_code: arrival_airport.code,
                arrival_code: departure_airport.code,
                departure_time: flight.departure_time,
                arrival_time: flight.arrival_time,
                plane: plane.model,
                duration_time: flight.duration,
                economy_price: ECONOMY_PRICE,
                business_price: BUSINESS_PRICE,
                number_ticket: numberTicket,
                type_ticket: typeTicket
            };
        }));
        return res.status(200).json({ goInfo: go_result, comebackInfo: comeback_result });
    }
    // Trường hợp không có chuyến bay về và không phải là chuyến bay một chiều
    return res.status(400).json({ message: 'Yêu cầu không hợp lệ' });
};


module.exports = {
    getAllFlight, getFlightById, getFlightByStatus, createFlight, updateFlight, deleteFlight, getAllFlightAdmin, findFlight
}