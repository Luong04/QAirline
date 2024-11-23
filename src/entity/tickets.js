// models/Tickets.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Ticket = sequelize.define('Ticket', {
    ticket_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,  // Đặt admin_id làm khóa chính
        autoIncrement: false, // Tự động tăng giá trị
        allowNull: false
    },
    booking_id: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'Tickets',
    timestamps: false
});

module.exports = Ticket;
