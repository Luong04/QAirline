// models/Airlines.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Airline = sequelize.define('Airline', {
    airline_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,  // Đặt admin_id làm khóa chính
        autoIncrement: true, // Tự động tăng giá trị
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Airlines',
    timestamps: false
});

module.exports = Airline;
