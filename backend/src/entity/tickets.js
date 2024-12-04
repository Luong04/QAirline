// models/Tickets.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Ticket = sequelize.define('Ticket', {
    ticket_id: {
        type: DataTypes.STRING,
        primaryKey: true,  // Đặt admin_id làm khóa chính
        autoIncrement: false, // Tự động tăng giá trị
        allowNull: false
    },
    booking_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customer_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    flight_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    seat_number: {
        type: DataTypes.STRING
    },
    class: {
        type: DataTypes.ENUM('Economy', 'Business'),
        defaultValue: 'Economy'
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'Tickets',
    timestamps: false
});

module.exports = Ticket;
