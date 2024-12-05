// models/Airports.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Airport = sequelize.define('Airport', {
    airport_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,  // Đặt admin_id làm khóa chính
        autoIncrement: true, // Tự động tăng giá trị
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.CHAR(3),
        unique: true,
        allowNull: false
    }
}, {
    tableName: 'Airports',
    timestamps: false
});

module.exports = Airport;
