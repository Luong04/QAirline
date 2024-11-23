const Flight = require('../entity/flights')
const Airline = require('../entity/airlines');
const Airport = require('../entity/airports');
const { Op } = require('sequelize');
const moment = require('moment');

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
        const airlines = await Airline.findAll({ attributes: ['airline_id', 'name'] });

        // Tạo ánh xạ ID -> Tên
        const airportMap = Object.fromEntries(
            airports.map((airport) => [airport.airport_id, airport.name])
        );

        const airlineMap = Object.fromEntries(
            airlines.map((airline) => [airline.airline_id, airline.name])
        );

        // Gắn tên vào các chuyến bay và loại bỏ các cột không cần thiết
        const enrichedFlights = flights.map((flight) => {
            const flightJSON = flight.toJSON(); // Chuyển đổi Sequelize instance thành object thuần
            return {
                flight_id: flightJSON.flight_id,
                departure_airport: airportMap[flightJSON.departure_airport_id] || "Unknown Airport",
                arrival_airport: airportMap[flightJSON.arrival_airport_id] || "Unknown Airport",
                airline: airlineMap[flightJSON.airline_id] || "Unknown Airline",
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
    const { airline_id, departure_airport_id, arrival_airport_id, departure_time, arrival_time, duration, status } = req.body;
    try {
        const newFlight = await Flight.create({
            airline_id,
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
    const { airline_id, departure_airport_id, arrival_airport_id, departure_time, arrival_time, duration, status } = req.body;

    try {
        const flight = await Flight.findByPk(id);
        if (flight) {
            await flight.update({
                airline_id,
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
    const { departure_place, arrival_place, is_one_way, departure_date, comeback_date } = req.body;

    // Tìm sân bay
    const departure_airport = await Airport.findOne({ where: { name: departure_place } });
    const arrival_airport = await Airport.findOne({ where: { name: arrival_place } });

    if (!departure_airport || !arrival_airport) {
        return res.status(404).json({ message: 'Không tìm thấy sân bay' });
    }

    // Định dạng ngày để chỉ lấy phần "YYYY-MM-DD"
    const formattedDate = moment(departure_date, 'YYYY-MM-DD', true).format('YYYY-MM-DD');
    if (!moment(formattedDate, 'YYYY-MM-DD', true).isValid()) {
        return res.status(400).json({ message: 'Ngày không hợp lệ' });
    }

    // Tìm chuyến bay khớp với ngày đã định dạng
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

    if (is_one_way === "true") {
        if (foundFlight.length > 0) {
            const result = await Promise.all(foundFlight.map(async (flight) => {
                const airline = await Airline.findByPk(flight.airline_id);
                return {
                    departure_code: departure_airport.code,
                    arrival_code: arrival_airport.code,
                    departure_time: flight.departure_time,
                    arrival_time: flight.arrival_time,
                    airline: airline.name,
                    duration_time: flight.duration,
                    economy_price: 1000000,
                    business_price: 3000000
                };
            }));
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: 'Không tìm thấy chuyến bay' });
        }
    }

    // Logic xử lý cho chuyến bay khứ hồi (nếu cần)
    if (!is_one_way && comeback_date) {
        const formattedComebackDate = moment(comeback_date, 'YYYY-MM-DD', true).format('YYYY-MM-DD');
        if (!moment(formattedComebackDate, 'YYYY-MM-DD', true).isValid()) {
            return res.status(400).json({ message: 'Ngày khứ hồi không hợp lệ' });
        }

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

        if (foundFlight.length > 0 && returnFlight.length > 0) {
            const go_result = await Promise.all(foundFlight.map(async (flight) => {
                const airline = await Airline.findByPk(flight.airline_id);
                return {
                    departure_code: departure_airport.code,
                    arrival_code: arrival_airport.code,
                    departure_time: flight.departure_time,
                    arrival_time: flight.arrival_time,
                    airline: airline.name,
                    duration_time: flight.duration,
                    economy_price: 1000000,
                    business_price: 3000000
                };
            }));

            const comeback_result = await Promise.all(returnFlight.map(async (flight) => {
                const airline = await Airline.findByPk(flight.airline_id);
                return {
                    departure_code: arrival_airport.code,
                    arrival_code: departure_airport.code,
                    departure_time: flight.departure_time,
                    arrival_time: flight.arrival_time,
                    airline: airline.name,
                    duration_time: flight.duration,
                    economy_price: 1000000,
                    business_price: 3000000
                };
            }));

            return res.status(200).json({ goInfo: go_result, comebackInfo: comeback_result });
        } else {
            return res.status(404).json({ message: 'Không tìm thấy chuyến bay' });
        }
    }
};


module.exports = {
    getAllFlight, getFlightById, getFlightByStatus, createFlight, updateFlight, deleteFlight, getAllFlightAdmin, findFlight
}