// models/Payments.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Payment = sequelize.define('Payment', {
    payment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,  // Đặt admin_id làm khóa chính
        autoIncrement: true, // Tự động tăng giá trị
        allowNull: false
    },
    booking_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    payment_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    payment_method: {
        type: DataTypes.ENUM('Credit Card', 'PayPal', 'Bank Transfer', 'Cash')
    }
}, {
    tableName: 'Payments',
    timestamps: false
});

module.exports = Payment;
