const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
sequelize.sync({ force: false }) // Sử dụng `force: false` để không xóa bảng cũ
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Unable to create tables:', err);
  });
const SeatReservation = sequelize.define('SeatReservation', {
    seat_reservation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    flight_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Flights', // Liên kết với bảng Flights
            key: 'flight_id'  // Khóa chính của bảng Flights
        }
    },
    ticket_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: 'Tickets',  // Liên kết với bảng Tickets
            key: 'ticket_id'  // Khóa chính của bảng Tickets
        }
    },
    seat_number: {
        type: DataTypes.STRING,
        allowNull: false  // Số ghế đã đặt
    },
    seat_class: {
        type: DataTypes.ENUM('Economy', 'Business'),
        allowNull: false  // Hạng ghế
    },
    status: {
        type: DataTypes.ENUM('reserved', 'available'),
        defaultValue: 'available',  // Trạng thái ghế
        allowNull: false
    }
}, {
    tableName: 'SeatReservations',
    timestamps: false
});

module.exports = SeatReservation;
