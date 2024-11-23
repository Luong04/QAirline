// models/Bookings.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Booking = sequelize.define('Booking', {
    booking_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,  // Đặt admin_id làm khóa chính
        autoIncrement: true, // Tự động tăng giá trị
        allowNull: false
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    booking_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Paid', 'Unpaid', 'Cancelled'),
        defaultValue: 'Unpaid'
    }
}, {
    tableName: 'Bookings',
    timestamps: false
});

module.exports = Booking;
