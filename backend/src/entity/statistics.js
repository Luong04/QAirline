// models/Airports.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Statistic = sequelize.define('Statistic', {
    statistic_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,  // Đặt admin_id làm khóa chính
        autoIncrement: true, // Tự động tăng giá trị
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    numberOfTicketBooked: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    numberOfTicketCancelled: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    revenueFromBooking: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    amountPayBack: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    finalRevenue: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'Statistics',
    timestamps: false
});

module.exports = Statistic;
