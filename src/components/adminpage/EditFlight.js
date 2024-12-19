import { React, useState } from "react";
import "../../styles/adminpage/EditFlight.css";
import DatePicker from "react-datepicker";

const EditFlight = ({ flight, onCancel }) => {
  const [departureAirport, setDepartureAirport] = useState(
    flight.departure_airport_id
  );
  const [arrivalAirport, setArrivalAirport] = useState(
    flight.arrival_airport_id
  );
  const [departureTime, setDepartureTime] = useState(flight.departure_time);
  const [arrivalTime, setArrivalTime] = useState(flight.arrival_time);
  const [priceEconomy, setPriceEconomy] = useState(flight.true_price_economy);
  const [priceBusiness, setPriceBusiness] = useState(
    flight.true_price_business
  );
  const [planeID, setPlaneID] = useState(flight.plane_id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("Bạn có chắc chắn muốn cập nhật chuyến bay này?")) {
      try {
        const res = await fetch(
          `http://localhost:8081/admin/adminflights/${planeID}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              flight_id: flight.flight_id,
              departure_airport_id: departureAirport,
              arrival_airport_id: arrivalAirport,
              departure_time: departureTime,
              arrival_time: arrivalTime,
              true_price_economy: priceEconomy,
              true_price_business: priceBusiness,
              plane_id: planeID,
            }),
          }
        );
        if (res.ok) {
          alert("Cập nhật chuyến bay thành công");
        } else {
          alert("Cập nhật chuyến bay thất bại");
        }
      } catch (error) {
        console.error(error);
        alert("Cập nhật chuyến bay thất bại");
      }
    }
  };

  return (
    <div className="overlay">
      <div className="edit-flight">
        <h2 style={{ marginTop: "0", textAlign: "center" }}>
          Chỉnh sửa chuyến bay
        </h2>
        <form className="edit-flight-form" onSubmit={handleSubmit}>
          <div className="flights-input">
            <label htmlFor="from">Nơi khởi hành </label>
            <input
              type="text"
              id="from"
              name="from"
              placeholder="Nhập nơi khởi hành"
              required
              value={departureAirport}
              onChange={(e) => setDepartureAirport(e.target.value)}
            />
          </div>
          <div className="flights-input">
            <label htmlFor="to">Nơi đến </label>
            <input
              type="text"
              id="to"
              name="to"
              placeholder="Nhập nơi đến"
              required
              value={arrivalAirport}
              onChange={(e) => setArrivalAirport(e.target.value)}
            />
          </div>
          <div className="flights-input">
            <label htmlFor="departure">Ngày khởi hành </label>
            <DatePicker
              id="departure"
              name="departure"
              selected={new Date(departureTime)}
              onChange={(date) => setDepartureTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="time"
              dateFormat="dd/MM/yyyy HH:mm"
            ></DatePicker>
          </div>
          <div className="flights-input">
            <label htmlFor="arrival">Ngày đến </label>
            <DatePicker
              id="arrival"
              name="arrival"
              selected={new Date(arrivalTime)}
              onChange={(date) => setArrivalTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="time"
              dateFormat="dd/MM/yyyy HH:mm"
            ></DatePicker>
          </div>
          <div className="flights-input">
            <label htmlFor="price-eco">Giá vé phổ thông (VND) </label>
            <input
              type="number"
              id="price-eco"
              name="price-economy"
              placeholder="Nhập giá vé phổ thông"
              value={priceEconomy}
              min="0"
              onChange={(e) => setPriceEconomy(e.target.value)}
            />
          </div>
          <div className="flights-input">
            <label htmlFor="price-bus">Giá vé thương gia (VND) </label>
            <input
              type="number"
              id="price-bus"
              name="price-business"
              placeholder="Nhập giá vé thương gia"
              value={priceBusiness}
              min="0"
              onChange={(e) => setPriceBusiness(e.target.value)}
            />
          </div>
          <div className="flights-input">
            <label htmlFor="plane-id">Mã máy bay </label>
            <input
              type="text"
              id="plane-id"
              name="plane-id"
              placeholder="Nhập mã máy bay"
              value={planeID}
              onChange={(e) => setPlaneID(e.target.value)}
            />
          </div>
          <div className="flights-input">
            <button type="submit" className="edit-flight-button">
              Lưu
            </button>
            <button
              type="button"
              className="cancel-flight-button"
              onClick={onCancel}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFlight;
