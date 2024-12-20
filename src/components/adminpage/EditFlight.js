import { React, useState, useEffect } from "react";
import "../../styles/adminpage/EditFlight.css";
import DatePicker from "react-datepicker";

const EditFlight = ({ flight, onCancel, onEdit }) => {
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

  const [planeSuggestions, setPlaneSuggestions] = useState([]);
  const [airportSuggestions, setAirportSuggestions] = useState([]);

  const [filteredPlaneSuggestions, setFilteredPlaneSuggestions] = useState([]);
  const [filteredDepartureSuggestions, setFilteredDepartureSuggestions] =
    useState([]);
  const [filteredArrivalSuggestions, setFilteredArrivalSuggestions] = useState(
    []
  );

  const [isPlaneIDFocused, setIsPlaneIDFocused] = useState(false);
  const [isDepartureFocused, setIsDepartureFocused] = useState(false);
  const [isArrivalFocused, setIsArrivalFocused] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const planeRes = await fetch("http://localhost:8081/api/getPlanes", {
          method: "GET",
        });
        const airportRes = await fetch(
          "http://localhost:8081/api/getPlaces",
          {
            method: "GET",
          }
        );

        if (planeRes.ok && airportRes.ok) {
          const planeData = await planeRes.json();
          const airportData = await airportRes.json();
          setPlaneSuggestions(planeData);
          setAirportSuggestions(airportData);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, []);

  const handlePlaneIDChange = (e) => {
    const value = e.target.value;
    setPlaneID(value);
    setFilteredPlaneSuggestions(
      planeSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleDepartureChange = (e) => {
    const value = e.target.value;
    setDepartureAirport(value);
    setFilteredDepartureSuggestions(
      airportSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleArrivalChange = (e) => {
    const value = e.target.value;
    setArrivalAirport(value);
    setFilteredArrivalSuggestions(
      airportSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSuggestionClick = (setter, suggestion) => {
    setter(suggestion);
    setFilteredPlaneSuggestions([]);
    setFilteredDepartureSuggestions([]);
    setFilteredArrivalSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("Bạn có chắc chắn muốn cập nhật chuyến bay này?")) {
      try {
        const token = localStorage.getItem("role");
        const res = await fetch(`http://localhost:8081/api/admin/updateFlights/${flight.flight_id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" ,Authorization: `Bearer ${token}`},
            body: JSON.stringify({
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
          onEdit({
            ...flight,
            departure_airport_id: departureAirport,
            arrival_airport_id: arrivalAirport,
            departure_time: departureTime,
            arrival_time: arrivalTime,
            true_price_economy: priceEconomy,
            true_price_business: priceBusiness,
            plane_id: planeID,
          });
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
          </div>
          <div className="flights-input">
            <input
              type="text"
              id="from"
              name="from"
              placeholder="Nhập nơi khởi hành"
              required
              value={departureAirport}
              onChange={handleDepartureChange}
              onFocus={() => setIsDepartureFocused(true)}
              onBlur={() => setIsDepartureFocused(false)}
            />
            {isDepartureFocused && filteredDepartureSuggestions.length > 0 && (
              <ul className="suggestions-list">
                {filteredDepartureSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleSuggestionClick(setDepartureAirport, suggestion)
                    }
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flights-input">
            <label htmlFor="to">Nơi đến </label>
          </div>
          <div className="flights-input">
            <input
              type="text"
              id="to"
              name="to"
              placeholder="Nhập nơi đến"
              required
              value={arrivalAirport}
              onChange={handleArrivalChange}
              onFocus={() => setIsArrivalFocused(true)}
              onBlur={() => setIsArrivalFocused(false)}
            />
            {isArrivalFocused && filteredArrivalSuggestions.length > 0 && (
              <ul className="suggestions-list">
                {filteredArrivalSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleSuggestionClick(setArrivalAirport, suggestion)
                    }
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flights-input">
            <label htmlFor="departure">Ngày khởi hành </label>
          </div>
          <div className="flights-input">
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
          </div>
          <div className="flights-input">
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
          </div>
          <div className="flights-input">
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
          </div>
          <div className="flights-input">
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
          </div>
          <div className="flights-input">
            <input
              type="text"
              id="plane-id"
              name="plane-id"
              placeholder="Nhập mã máy bay"
              value={planeID}
              onChange={handlePlaneIDChange}
              onFocus={() => setIsPlaneIDFocused(true)}
              onBlur={() => setIsPlaneIDFocused(false)}
            />
            {isPlaneIDFocused && filteredPlaneSuggestions.length > 0 && (
              <ul className="suggestions-list">
                {filteredPlaneSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleSuggestionClick(setPlaneID, suggestion)
                    }
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
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
