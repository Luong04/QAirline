// models/Customers.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Customer = sequelize.define('Customer', {
    customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,  // Đặt admin_id làm khóa chính
        autoIncrement: true, // Tự động tăng giá trị
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING
    },
    date_of_birth: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'Customers',
    timestamps: false
});

module.exports = Customer;
