import { React } from "react";
import "../../styles/adminpage/Flight.css";

const Flight = ({ flight, onDelete, onEdit }) => {
  const handleEdit = () => {
    onEdit(flight);
  };

  const handleDelete = () => {
    onDelete(flight.flight_id);
  };

  return (
    <div className="flight">
      <div className="flight-details">
        <div className="flight-id-status">
          <div className="flight-id">{flight.flight_id}</div>
          <div className="flight-status">{flight.status}</div>
        </div>
        <div className="departure-info">
          <div className="departure-time">{flight.departure_time}</div>
          <div className="location">{flight.departure_code}</div>
        </div>
        <div className="flight-icon">
          <span className="plane-icon">✈️</span>
          <span>{flight.plane_id}</span>
        </div>
        <div className="arrival-info">
          <div className="arrival-time">{flight.arrival_time}</div>
          <div className="location">{flight.arrival_code}</div>
        </div>
      </div>
      <div className="eco-price">
        Giá vé phổ thông <br />
        {flight.true_price_economy} $
      </div>
      <div className="bus-price">
        Giá vé thương gia
        <br />
        {flight.true_price_business} $
      </div>
      <div className="edit-delete">
        <button className="edit-button" onClick={handleEdit}>
          Chỉnh sửa
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Xoá
        </button>
      </div>
    </div>
  );
};

export default Flight;
