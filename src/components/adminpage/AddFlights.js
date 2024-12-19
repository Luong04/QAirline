import { React, useState, useEffect } from "react";
import "../../styles/adminpage/AddFlights.css";
import DatePicker from "react-datepicker";

const AddFlights = () => {
  const [planeID, setPlaneID] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedArrival, setSelectedArrival] = useState(null);
  const [status, setStatus] = useState("");
  const [priceEconomy, setPriceEconomy] = useState(0);
  const [priceBusiness, setPriceBusiness] = useState(0);

  // useEffect(() => {
  //   const fetchPlanes = async () => {
  //     const res = await fetch("http://localhost:8081/admin/getPlanes", {
  //       method: "GET",
  //     });
  //     if (res.ok) {
  //       const data = await res.json();
  //       setPlaneList(data);
  //     }
  //   };
  //   fetchPlanes();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const flightData = {
        plane_id: planeID,
        departure_airport_id: departureAirport,
        arrival_airport_id: arrivalAirport,
        departure_time: selectedDeparture,
        arrival_time: selectedArrival,
        status: status,
        true_price_economy: priceEconomy,
        true_price_business: priceBusiness,
      };
      const res = await fetch("http://localhost:8081/admin/adminflights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flightData: flightData,
        }),
      });
      if (res.ok) {
        alert("Thêm chuyến bay thành công");
        setPlaneID("");
        setDepartureAirport("");
        setArrivalAirport("");
        setSelectedDeparture(null);
        setSelectedArrival(null);
        setStatus("");
        setPriceEconomy(0);
        setPriceBusiness(0);
      } else {
        alert("Thêm chuyến bay thất bại");
      }
    } catch (error) {
      console.error(error);
      alert("Thêm chuyến bay thất bại");
    }
  };

  return (
    <div class="add-flights">
      <h2 style={{ textAlign: "center", marginTop: "0" }}>Thêm chuyến bay</h2>
      <form class="add-flights-form" onSubmit={handleSubmit}>
        <div className="flights-input">
          <label htmlFor="from">Nơi khởi hành </label>
          <input
            type="text"
            id="from"
            name="from"
            placeholder="Nhập nơi khởi hành"
            required
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
            onChange={(e) => setArrivalAirport(e.target.value)}
          />
        </div>
        <div className="flights-input">
          <label htmlFor="departure">Ngày khởi hành </label>
          <DatePicker
            id="departure"
            selected={selectedDeparture}
            onChange={(date) => setSelectedDeparture(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="yyyy/MM/dd HH:mm:ss"
            placeholderText="Nhập ngày khởi hành"
            required
          />
        </div>
        <div className="flights-input">
          <label htmlFor="arrival">Ngày đến </label>
          <DatePicker
            id="arrival"
            selected={selectedArrival}
            onChange={(date) => setSelectedArrival(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="yyyy/MM/dd HH:mm:ss"
            placeholderText="Nhập ngày đến"
            required
          />
        </div>
        <div className="flights-input">
          <label htmlFor="price-eco">Giá vé phổ thông (VND) </label>
          <input
            type="number"
            id="price-eco"
            name="price-economy"
            placeholder="Nhập giá vé phổ thông"
            onChange={(e) => setPriceEconomy(e.target.value)}
            min="0"
            required
          />
        </div>
        <div className="flights-input">
          <label htmlFor="price-bus">Giá vé thương gia (VND) </label>
          <input
            type="number"
            id="price-bus"
            name="price-business"
            placeholder="Nhập giá vé thương gia"
            onChange={(e) => setPriceBusiness(e.target.value)}
            min="0"
            required
          />
        </div>
        <div className="flights-input">
          <label htmlFor="plane-id">Mã máy bay </label>
          <input
            type="text"
            id="plane-id"
            name="plane-id"
            placeholder="Nhập mã máy bay"
            required
            onChange={(e) => setPlaneID(e.target.value)}
          />
        </div>
        <div className="flights-input">
          <button type="submit" className="button">
            Thêm chuyến bay
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFlights;
