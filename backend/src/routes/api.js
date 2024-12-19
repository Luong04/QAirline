// trang này để định tuyến api (cho frontend), các trang chứa file json
const express = require('express');
const router = express.Router();
const {getAllFlight, getFlightById, getAllFlightAdmin, createFlight, updateFlight, deleteFlight, findFlight, findBasicFlight} = require('../controllers/flightController.js');
const {getAllBookingAdmin, createBooking, cancelBooking, createPayment} = require('../services/bookingServices.js');
const {updatePrice} = require('../services/priceServices.js');
const {getTicket, createNewTicket, cancelTicketById} = require('../controllers/ticketController.js');
const {createSeatReservations, createOneSeatReservations} = require('../services/seatServices');
const {getPlaces } = require('../services/predictionService');
const {updateStatistic, getStatisticInDate, getStatisticInWeek, getStatisticInMonth, getWeeklyTotals, getMonthlyTotals } = require('../controllers/statisticController.js');
const {createNotification, getNotification, removeNotification} = require('../controllers/notificationController.js');
const {findSeatReservations} = require('../controllers/seatController.js')
const {getBookingByForm} = require('../controllers/bookingController.js')
// Giả sử bạn đã có models từ Sequelize

// Lấy danh sách tất cả chuyến bay
router.get('/flights', getAllFlight);

router.get('/admin/adminflights', getAllFlightAdmin);

// Lấy thông tin chuyến bay cụ thể theo ID
router.get('/admin/adminflights/:id', getFlightById);

// Tạo một chuyến bay mới
router.post('/admin/adminflights', createFlight);

// Cập nhật thông tin chuyến bay
router.put('/admin/adminflights/:id', updateFlight);

// Xóa chuyến bay
router.delete('/admin/adminflights/:id', deleteFlight);

router.post('/findFlight', findFlight)
router.post('/findBasicFlight', findBasicFlight)
router.get('/getPlaces', getPlaces);

router.post('/getBookingByForm', getBookingByForm);
router.get('/adminbooking', getAllBookingAdmin);
router.post('/createBooking', createBooking);
router.post('/createPayment', createPayment);
router.post('/findSeatReservations', findSeatReservations);

router.post('/getTicketById', getTicket);
router.post('/createTicket', createNewTicket);
router.post('/cancelTicketById', cancelTicketById);

router.post('/admin/updatePrice', updatePrice);
router.post('/createSeatReservations', createSeatReservations);
router.post('/createOneSeatReservations', createOneSeatReservations);

router.post('/admin/updateStatistic', updateStatistic);
router.get('/admin/getStatisticInDate', getStatisticInDate);
router.get('/admin/getStatisticInWeek', getStatisticInWeek);
router.get('/admin/getStatisticInMonth', getStatisticInMonth);
router.get('/admin/getWeeklyTotal', getWeeklyTotals);
router.get('/admin/getMonthlyTotal', getMonthlyTotals);

router.post('/admin/createNotification', createNotification);
router.delete('/admin/removeNotification', removeNotification);
router.get('/admin/getNotification', getNotification);

module.exports = router;
