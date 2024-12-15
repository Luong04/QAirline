const { Sequelize } = require('sequelize');
const SeatReservation = require('../entity/seats'); // Đường dẫn tới model SeatReservation
const Flight = require('../entity/flights'); // Đường dẫn tới model Flight
const Plane = require('../entity/planes');

const createSeatReservations = async () => {
    try {
        // Lấy danh sách các chuyến bay
        const flights = await Flight.findAll();

        for (const flight of flights) {
            const { flight_id, plane_id } = flight.dataValues;
            const planeInfo = await Plane.findOne({
                where: {plane_id}
            });

            if (!planeInfo) {
                console.warn(`Không tìm thấy thông tin máy bay cho plane_id: ${plane_id}`);
                continue;
            }

            const { seat_economy, seat_business } = planeInfo.dataValues;

            // Tạo ghế Business
            for (let i = 1; i <= seat_business; i++) {
                await SeatReservation.create({
                    flight_id,
                    ticket_id: null,
                    seat_number: `B${i}`, // Mã ghế Business
                    seat_class: 'Business',
                    status: 'available',
                });
            }

            // Tạo ghế Economy
            for (let i = 1; i <= seat_economy; i++) {
                await SeatReservation.create({
                    flight_id,
                    ticket_id: null,
                    seat_number: `E${i}`, // Mã ghế Economy
                    seat_class: 'Economy',
                    status: 'available',
                });
            }
        }

        console.log('Tạo chỗ ngồi cho tất cả chuyến bay thành công!');
    } catch (err) {
        console.error('Lỗi khi tạo chỗ ngồi:', err);
    }
}



const createOneSeatReservations = async (flight_id) => {
    const flight = await Flight.findByPk(flight_id);
    const { plane_id } = flight.dataValues;
    const plane = Plane.findOne({
        where: {plane_id}
    })
    const {seat_business, seat_economy} = plane.dataValues;
    // Tạo ghế Business
    for (let i = 1; i <= seat_business; i++) {
        await SeatReservation.create({
            flight_id,
            ticket_id: null,
            seat_number: `B${i}`, // Mã ghế Business
            seat_class: 'Business',
            status: 'available',
        });
    }

    // Tạo ghế Economy
    for (let i = 1; i <= seat_economy; i++) {
        await SeatReservation.create({
            flight_id,
            ticket_id: null,
            seat_number: `E${i}`, // Mã ghế Economy
            seat_class: 'Economy',
            status: 'available',
        });
    }
}

const findSeatReservations = async (goFlightId, returnFlightId) => {
    const goFlight = await Flight.findByPk(goFlightId);
    const goPlane = await Plane.findByPk(goFlight.plane_id);
    const seatsGoBusiness = await SeatReservation.findAll({
        where:{
            flight_id : goFlightId,
            seat_class : "Business"
        }
    })
    const seatsGoEconomy = await SeatReservation.findAll({
        where:{
            flight_id : goFlightId,
            seat_class : "Economy"
        }
    })

    if(returnFlightId) {
        const returnFlight = await Flight.findByPk(returnFlightId);
        const returnPlane = await Plane.findByPk(returnFlight.plane_id);
        const seatsReturnBusiness = await SeatReservation.findAll({
            where:{
                flight_id : returnFlightId,
                seat_class : "Business"
            }
        })
        const seatsReturnEconomy = await SeatReservation.findAll({
            where:{
                flight_id : returnFlightId,
                seat_class : "Economy"
            }
        })

        return {goPlane, seatsGoBusiness, seatsGoEconomy, returnPlane, seatsReturnBusiness, seatsReturnEconomy}
    }
    return {goPlane, seatsGoBusiness, seatsGoEconomy}
}

module.exports = {
    createSeatReservations, createOneSeatReservations, findSeatReservations
}