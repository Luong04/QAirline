const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Plane = sequelize.define('Plane', {
    plane_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total_seat: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    seat_economy: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    seat_business: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
}, {
    tableName: 'Planes',
    timestamps: false
});

module.exports = Plane
