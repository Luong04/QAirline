// models/Flights.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Flight = sequelize.define('Flight', {
    flight_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,  // Đặt admin_id làm khóa chính
        autoIncrement: true, // Tự động tăng giá trị
        allowNull: false
    },
    plane_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    departure_airport_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    arrival_airport_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    departure_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    arrival_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    duration: {
        type: DataTypes.TIME
    },
    status: {
        type: DataTypes.ENUM('Scheduled', 'In Flight', 'Landed', 'Cancelled', 'Delayed'),
        defaultValue: 'Scheduled'
    },
    true_price_economy: {
        type: DataTypes.FLOAT, // Giá hạng kinh tế
        allowNull: true
    },
    true_price_business: {
        type: DataTypes.FLOAT, // Giá hạng thương gia
        allowNull: true
    },
}, {
    tableName: 'Flights',
    timestamps: false
});

module.exports = Flight;
