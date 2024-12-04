// models/Bookings.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Booking = sequelize.define('Booking', {
    booking_id: {
        type: DataTypes.STRING,
        primaryKey: true,  // Đặt admin_id làm khóa chính
        allowNull: false
    },
    customer_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    booking_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    total_price: {
        type: DataTypes.FLOAT,
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
