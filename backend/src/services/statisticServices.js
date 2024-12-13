const Statistic = require('../entity/statistics');
const Ticket = require('../entity/tickets');
const { Op } = require('sequelize');

//flag = true thì là đặt vé, flag = false là hủy vé
const updateStatistic = async (date, flag, ticket_id) => {
    const ticket = await Ticket.findByPk(ticket_id);
    const statistic = await Statistic.findOne({
        where: {
            date: date
        }
    });
    if(!statistic) {
        statistic = await Statistic.create({
            date: date,
            numberOfTicketBooked:0,
            numberOfTicketCancelled:0,
            revenueFromBooking:0,
            amountPayBack:0,
            finalRevenue:0
        })
    }
    if(flag) {
        await Statistic.upsert({
            numberOfTicketBooked: statistic.numberOfTicketBooked + 1,
            revenueFromBooking: statistic.revenueFromBooking + ticket.price,
            finalRevenue: statistic.finalRevenue + ticket.price
        })
    } else {
        await Statistic.upsert({
            numberOfTicketCancelled: statistic.numberOfTicketCancelled + 1,
            amountPayBack: statistic.amountPayBack + ticket.price,
            finalRevenue: statistic.finalRevenue - ticket.price
        })
    }
    
};

const getStatisticInDate = async (date) => {
    const statistic = Statistic.findOne({
        where: {date}
    });
    return statistic;
}

const getStatisticInWeek = async (date) => {
    // Chuyển đổi `date` sang đối tượng Date
    const inputDate = new Date(date);

    // Xác định ngày đầu tuần (thứ Hai)
    const dayOfWeek = inputDate.getDay(); // 0: Chủ nhật, 1: Thứ hai, ..., 6: Thứ bảy
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Tính offset cho thứ hai
    const sundayOffset = dayOfWeek === 0 ? 0 : 7 - dayOfWeek; // Offset cho Chủ nhật

    const monday = new Date(inputDate); // Bắt đầu từ ngày truyền vào
    monday.setDate(inputDate.getDate() + mondayOffset); // Tìm ngày thứ hai

    const sunday = new Date(inputDate); // Kết thúc vào ngày chủ nhật
    sunday.setDate(inputDate.getDate() + sundayOffset);

    // Truy vấn trong phạm vi tuần
    const statistics = await Statistic.findAll({
        where: {
            date: {
                [Op.between]: [monday, sunday]
            }
        }
    });

    return statistics;
};

const getStatisticInMonth = async (date) => {
    // Chuyển đổi `date` sang đối tượng Date
    const inputDate = new Date(date);

    // Tính ngày đầu tháng và cuối tháng
    const firstDayOfMonth = new Date(inputDate.getFullYear(), inputDate.getMonth(), 1); // Ngày đầu tháng
    const lastDayOfMonth = new Date(inputDate.getFullYear(), inputDate.getMonth() + 1, 0); // Ngày cuối tháng

    // Truy vấn trong phạm vi tháng
    const statistics = await Statistic.findAll({
        where: {
            date: {
                [Op.between]: [firstDayOfMonth, lastDayOfMonth]
            }
        }
    });

    return statistics;
};


const getWeeklyTotals = async (date) => {
    // Lấy danh sách các bản ghi trong tuần
    const statistics = await getStatisticInWeek(date);

    // Khởi tạo 5 mảng để lưu giá trị từng ngày
    const numberOfTicketBookedArray = [];
    const numberOfTicketCancelledArray = [];
    const revenueFromBookingArray = [];
    const amountPayBackArray = [];
    const finalRevenueArray = [];

    // Khởi tạo các biến tổng
    let totalNumberOfTicketBooked = 0;
    let totalNumberOfTicketCancelled = 0;
    let totalRevenueFromBooking = 0;
    let totalAmountPayBack = 0;
    let totalFinalRevenue = 0;

    // Duyệt qua từng bản ghi và tính toán
    statistics.forEach(stat => {
        // Thêm giá trị của từng ngày vào mảng
        numberOfTicketBookedArray.push(stat.numberOfTicketBooked || 0);
        numberOfTicketCancelledArray.push(stat.numberOfTicketCancelled || 0);
        revenueFromBookingArray.push(stat.revenueFromBooking || 0);
        amountPayBackArray.push(stat.amountPayBack || 0);
        finalRevenueArray.push(stat.finalRevenue || 0);

        // Cộng dồn giá trị để tính tổng
        totalNumberOfTicketBooked += stat.numberOfTicketBooked || 0;
        totalNumberOfTicketCancelled += stat.numberOfTicketCancelled || 0;
        totalRevenueFromBooking += stat.revenueFromBooking || 0;
        totalAmountPayBack += stat.amountPayBack || 0;
        totalFinalRevenue += stat.finalRevenue || 0;
    });

    // Trả về 5 mảng và 5 tổng
    return {
        arrays: {
            numberOfTicketBookedArray,
            numberOfTicketCancelledArray,
            revenueFromBookingArray,
            amountPayBackArray,
            finalRevenueArray,
        },
        totals: {
            totalNumberOfTicketBooked,
            totalNumberOfTicketCancelled,
            totalRevenueFromBooking,
            totalAmountPayBack,
            totalFinalRevenue,
        },
    };
};

const getMonthlyTotals = async (date) => {
    // Lấy danh sách các bản ghi trong tuần
    const statistics = await getStatisticInMonth(date);

    // Khởi tạo 5 mảng để lưu giá trị từng ngày
    const numberOfTicketBookedArray = [];
    const numberOfTicketCancelledArray = [];
    const revenueFromBookingArray = [];
    const amountPayBackArray = [];
    const finalRevenueArray = [];

    // Khởi tạo các biến tổng
    let totalNumberOfTicketBooked = 0;
    let totalNumberOfTicketCancelled = 0;
    let totalRevenueFromBooking = 0;
    let totalAmountPayBack = 0;
    let totalFinalRevenue = 0;

    // Duyệt qua từng bản ghi và tính toán
    statistics.forEach(stat => {
        // Thêm giá trị của từng ngày vào mảng
        numberOfTicketBookedArray.push(stat.numberOfTicketBooked || 0);
        numberOfTicketCancelledArray.push(stat.numberOfTicketCancelled || 0);
        revenueFromBookingArray.push(stat.revenueFromBooking || 0);
        amountPayBackArray.push(stat.amountPayBack || 0);
        finalRevenueArray.push(stat.finalRevenue || 0);

        // Cộng dồn giá trị để tính tổng
        totalNumberOfTicketBooked += stat.numberOfTicketBooked || 0;
        totalNumberOfTicketCancelled += stat.numberOfTicketCancelled || 0;
        totalRevenueFromBooking += stat.revenueFromBooking || 0;
        totalAmountPayBack += stat.amountPayBack || 0;
        totalFinalRevenue += stat.finalRevenue || 0;
    });

    // Trả về 5 mảng và 5 tổng
    return {
        arrays: {
            numberOfTicketBookedArray,
            numberOfTicketCancelledArray,
            revenueFromBookingArray,
            amountPayBackArray,
            finalRevenueArray,
        },
        totals: {
            totalNumberOfTicketBooked,
            totalNumberOfTicketCancelled,
            totalRevenueFromBooking,
            totalAmountPayBack,
            totalFinalRevenue,
        },
    };
};


module.exports = {
    updateStatistic,
    getStatisticInDate,
    getStatisticInWeek,
    getStatisticInMonth,
    getWeeklyTotals,
    getMonthlyTotals
};
