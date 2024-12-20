const Flight = require('../entity/flights');
const Plane = require('../entity/planes');
const Airport = require('../entity/airports');
const { Op } = require('sequelize');
const moment = require('moment');

const getAllFlights = async () => {
    return await Flight.findAll();
};

const getFlightById = async (id) => {
    return await Flight.findByPk(id);
};

const createFlight = async (flightData) => {
    try {
        // Kiểm tra dữ liệu đầu vào
        console.log("aaaaaaaaaaaaaaaaaaa : ", flightData);
        if (!flightData.departure_airport_id || !flightData.arrival_airport_id) {
            throw new Error("Thông tin sân bay không được để trống");
        }

        // Tìm kiếm thông tin sân bay
        const departureAirport = await Airport.findOne({ where: { name: flightData.departure_airport_id } });
        const arrivalAirport = await Airport.findOne({ where: { name: flightData.arrival_airport_id } });
        console.log("aaaaasdasdsasadas:",arrivalAirport);
        if (!departureAirport || !arrivalAirport) {
            
            throw new Error("Không tìm thấy thông tin sân bay");
        }

        // Tính toán thời gian bay (phút)
        const departureTime = new Date(flightData.departure_time);
        const arrivalTime = new Date(flightData.arrival_time);
        const totalMinutes = Math.floor((arrivalTime - departureTime) / (1000 * 60)); // Thời gian bay tính bằng phút

        if (totalMinutes <= 0) {
            throw new Error("Thời gian đến phải sau thời gian khởi hành");
        }

        // Chuyển đổi tổng phút sang định dạng hh:mm:ss
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const seconds = 0; // Nếu không có giây cụ thể
        const duration = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        // Cập nhật lại dữ liệu chuyến bay
        const updatedFlightData = {
            ...flightData,
            status: 'Scheduled',
            departure_airport_id: departureAirport.airport_id, // Thay thế tên sân bay bằng ID
            arrival_airport_id: arrivalAirport.airport_id,    // Thay thế tên sân bay bằng ID
            duration: duration,                      // Thời lượng chuyến bay dưới dạng hh:mm:ss
        };

        // Lưu vào cơ sở dữ liệu
        return await Flight.create(updatedFlightData);
    } catch (error) {
        console.error("Error creating flight:", error);
        throw new Error("Không thể tạo chuyến bay: " + error.message);
    }
};

const updateFlight = async (id, flightData) => {
    try {
        // Kiểm tra dữ liệu đầu vào
        console.log("Cập nhật chuyến bay: ", flightData);
        if (!flightData.departure_airport_id || !flightData.arrival_airport_id) {
            throw new Error("Thông tin sân bay không được để trống");
        }

        // Tìm kiếm thông tin sân bay
        const departureAirport = await Airport.findOne({ where: { name: flightData.departure_airport_id } });
        const arrivalAirport = await Airport.findOne({ where: { name: flightData.arrival_airport_id } });
        console.log("Thông tin sân bay đến: ", arrivalAirport);
        if (!departureAirport || !arrivalAirport) {
            throw new Error("Không tìm thấy thông tin sân bay");
        }

        // Tính toán thời gian bay (phút)
        const departureTime = new Date(flightData.departure_time);
        const arrivalTime = new Date(flightData.arrival_time);
        const totalMinutes = Math.floor((arrivalTime - departureTime) / (1000 * 60)); // Thời gian bay tính bằng phút

        if (totalMinutes <= 0) {
            throw new Error("Thời gian đến phải sau thời gian khởi hành");
        }

        // Chuyển đổi tổng phút sang định dạng hh:mm:ss
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const seconds = 0; // Nếu không có giây cụ thể
        const duration = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        // Tìm chuyến bay theo ID
        const flight = await Flight.findByPk(id);
        if (!flight) {
            throw new Error("Chuyến bay không tồn tại");
        }

        // Cập nhật lại dữ liệu chuyến bay
        const updatedFlightData = {
            ...flightData,
            status: 'Scheduled',
            departure_airport_id: departureAirport.airport_id, // Thay thế tên sân bay bằng ID
            arrival_airport_id: arrivalAirport.airport_id,    // Thay thế tên sân bay bằng ID
            duration: duration,                      // Thời lượng chuyến bay dưới dạng hh:mm:ss
        };

        // Cập nhật chuyến bay
        await flight.update(updatedFlightData);
        return flight;
    } catch (error) {
        console.error("Lỗi khi cập nhật chuyến bay:", error);
        throw new Error("Không thể cập nhật chuyến bay: " + error.message);
    }
};

const deleteFlight = async (id) => {
    try {
        // Kiểm tra sự tồn tại của chuyến bay
        const flight = await Flight.findByPk(id);
        if (!flight) {
            throw new Error("Chuyến bay không tồn tại");
        }

        // Xóa chuyến bay
        await flight.destroy();
        return true;
    } catch (error) {
        console.error("Lỗi khi xóa chuyến bay:", error);
        throw new Error("Không thể xóa chuyến bay: " + error.message);
    }
};


const findFlight = async (params) => {
    const {
        departure_place, arrival_place, is_one_way, departure_date, return_date
    } = params;

    const departure_airport = await Airport.findOne({ where: { name: departure_place } });
    const arrival_airport = await Airport.findOne({ where: { name: arrival_place } });

    if (!departure_airport || !arrival_airport) {
        throw new Error('Không tìm thấy sân bay');
    }

    const formattedDepartureDate = moment(departure_date, 'YYYY-MM-DD', true).format('YYYY-MM-DD');
    if (!moment(formattedDepartureDate, 'YYYY-MM-DD', true).isValid()) {
        throw new Error('Ngày đi không hợp lệ');
    }

    const startOfDay = moment(formattedDepartureDate).startOf('day').utc().add(7, 'hours');
    const endOfDay = moment(formattedDepartureDate).endOf('day').utc().add(7, 'hours');

    const found_flights = await Flight.findAll({
        where: {
            departure_airport_id: departure_airport.airport_id,
            arrival_airport_id: arrival_airport.airport_id,
            departure_time: {
                [Op.gte]: startOfDay.toDate(),
                [Op.lte]: endOfDay.toDate()
            }
        }
    });

    const foundFlights_ = found_flights.map(flight => flight.get());

    if (foundFlights_.length === 0) {
        throw new Error('Không tìm thấy chuyến bay đi');
    }
    const airports = await Airport.findAll({ attributes: ['airport_id', 'code'] });
    const airportMap = Object.fromEntries(
        airports.map((airport) => [airport.airport_id, airport.code])
    );
    // Gắn tên vào các chuyến bay và loại bỏ các cột không cần thiết
    const foundFlights = foundFlights_.map((flight) => {
        return {
            flight_id: flight.flight_id,
            plane_id: flight.plane_id,
            departure_code: airportMap[flight.departure_airport_id] || "Unknown Airport",
            arrival_code: airportMap[flight.arrival_airport_id] || "Unknown Airport",
            departure_time: flight.departure_time,
            arrival_time: flight.arrival_time,
            duration: flight.duration,
            status: flight.status,
            true_price_economy: flight.true_price_economy,
            true_price_business: flight.true_price_business
        };
    });
    if (is_one_way === "true") {
        // Tạo ánh xạ ID -> Tên

        return foundFlights;
    }

    // Handle return flights
    const formattedReturnDate = moment(return_date, 'YYYY-MM-DD', true).format('YYYY-MM-DD');
    if (!moment(formattedReturnDate, 'YYYY-MM-DD', true).isValid()) {
        throw new Error('Ngày khứ hồi không hợp lệ');
    }

    const startOfReturnDay = moment(formattedReturnDate).startOf('day').utc().add(7, 'hours');
    const endOfReturnDay = moment(formattedReturnDate).endOf('day').utc().add(7, 'hours');

    const return_flights = await Flight.findAll({
        where: {
            departure_airport_id: arrival_airport.airport_id,
            arrival_airport_id: departure_airport.airport_id,
            departure_time: {
                [Op.gte]: startOfReturnDay.toDate(),
                [Op.lte]: endOfReturnDay.toDate()
            }
        }
    });

    if (return_flights.length === 0) {
        throw new Error('Không tìm thấy chuyến bay đi');
    }

    const returnFlights_ = return_flights.map(flight => flight.get());
    const returnFlights = returnFlights_.map((flight) => {
        return {
            flight_id: flight.flight_id,
            plane_id: flight.plane_id,
            departure_code: airportMap[flight.departure_airport_id] || "Unknown Airport",
            arrival_code: airportMap[flight.arrival_airport_id] || "Unknown Airport",
            departure_time: flight.departure_time,
            arrival_time: flight.arrival_time,
            duration: flight.duration,
            status: flight.status,
            true_price_economy: flight.true_price_economy,
            true_price_business: flight.true_price_business
        };
    });
    return { foundFlights, returnFlights };
};

module.exports = {
    getAllFlights,
    getFlightById,
    createFlight,
    updateFlight,
    deleteFlight,
    findFlight
};
