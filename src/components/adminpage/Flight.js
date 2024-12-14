import React from "react";
import "../../styles/adminpage/Flight.css";

const Flight = ({ flight, onDelete }) => {
  const handleDelete = () => {
    onDelete(flight);
  };

  return (
    <div className="flight">
      <div className="flight-details">
        <div className="flight-id-status">
          <div className="flight-id">{flight.id}</div>
          <div className="flight-status">{flight.status}</div>
        </div>
        <div className="departure-info">
          <div className="departure-time">{flight.departureTime}</div>
          <div className="location">{flight.departureAirport}</div>
        </div>
        <div className="flight-icon">
          <span className="plane-icon">✈️</span>
        </div>
        <div className="arrival-info">
          <div className="arrival-time">{flight.arrivalTime}</div>
          <div className="location">{flight.arrivalAirport}</div>
        </div>
      </div>
      <div className="eco-price">
        Giá vé phổ thông <br />
        {flight.economyPrice} VND
      </div>
      <div className="bus-price">
        Giá vé thương gia
        <br />
        {flight.businessPrice} VND
      </div>
      <div className="edit-delete">
        <button className="edit-button">Chỉnh sửa</button>
        <button className="delete-button" onClick={handleDelete}>
          Xoá
        </button>
      </div>
    </div>
  );
};

export default Flight;
