// trang này để định tuyến api (cho frontend), các trang chứa file json
const express = require('express');
const router = express.Router();
const {getAllFlight, getFlightById, getAllFlightAdmin, createFlight, updateFlight, deleteFlight, findFlight} = require('../services/flightServices');
const {getAllBookingAdmin, getBookingById, createBooking, createPayment, cancelBooking} = require('../services/bookingServices');
const {updatePrice} = require('../services/priceServices');
const {createSeatReservations, createOneSeatReservations} = require('../services/seatServices');
// Giả sử bạn đã có models từ Sequelize


// Lấy danh sách tất cả chuyến bay
router.get('/flights', getAllFlight);

router.get('/adminflights', getAllFlightAdmin);

// Lấy thông tin chuyến bay cụ thể theo ID
router.get('/adminflights/:id', getFlightById);

// Tạo một chuyến bay mới
router.post('/adminflights', createFlight);

// Cập nhật thông tin chuyến bay
router.put('/adminflights/:id', updateFlight);

// Xóa chuyến bay
router.delete('/adminflights/:id', deleteFlight);

router.get('/findFlight', findFlight)

router.get('/booking/:id', getBookingById);

router.get('/adminbooking/', getAllBookingAdmin);

router.post('/createBooking', createBooking);
router.delete('/cancelBooking', cancelBooking);
router.post('/createPayment', createPayment);

router.post('/updatePrice', updatePrice);
router.post('/createSeatReservations', createSeatReservations);
router.post('/createOneSeatReservations', createOneSeatReservations);

module.exports = router;
