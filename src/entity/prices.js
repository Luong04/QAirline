const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
sequelize.sync({ force: false }) // Sử dụng `force: false` để không xóa bảng cũ
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Unable to create tables:', err);
  });
const Plane = require('./planes')
const Price = sequelize.define('Price', {
    price_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    plane_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Plane,  // Liên kết với bảng Plane
            key: 'plane_id' // Khóa chính của bảng Plane
        }
    },
    departure_airport_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    arrival_airport_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    base_price_economy: {
        type: DataTypes.FLOAT, // Giá hạng kinh tế
        allowNull: false
    },
    base_price_business: {
        type: DataTypes.FLOAT, // Giá hạng kinh tế
        allowNull: false
    }
}, {
    tableName: 'Prices',
    timestamps: false
});


module.exports = Price;
