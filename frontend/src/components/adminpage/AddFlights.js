import { React, useState, useEffect } from "react";
import "../../styles/adminpage/AddFlights.css";
import DatePicker from "react-datepicker";
import { Navigate, useNavigate } from "react-router-dom";

const AddFlights = ({ onUpdate }) => {
  const [planeID, setPlaneID] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedArrival, setSelectedArrival] = useState(null);
  const [status, setStatus] = useState("");
  const [priceEconomy, setPriceEconomy] = useState(0);
  const [priceBusiness, setPriceBusiness] = useState(0);

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
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const planeRes = await fetch("http://localhost:8081/api/getPlanes", {
          method: "GET",
        });
        const airportRes = await fetch("http://localhost:8081/api/getPlaces", {
          method: "GET",
        });

        if (planeRes.status === 200 && airportRes.status === 200) {
          console.log(planeRes.json(), airportRes.json());
          const planeData = await planeRes.json();
          planeData.map((plane) => plane.plane_id);
          const airportData = await airportRes.json();
          airportData.map((airport) => airport.airport_id);
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
      const token = localStorage.getItem("role");
      const res = await fetch("http://localhost:8081/api/admin/createFlight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
        const newFlight = await res.json();
        onUpdate(newFlight);
        navigate("/admin/flights");
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
        </div>
        <div className="flights-input">
          <input
            type="text"
            id="from"
            name="from"
            placeholder="Nhập nơi khởi hành"
            required
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
        </div>
        <div>
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
        </div>
        <div className="flights-input">
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
        </div>
        <div className="flights-input">
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
        </div>
        <div className="flights-input">
          <input
            type="text"
            id="plane-id"
            name="plane-id"
            placeholder="Nhập mã máy bay"
            value={planeID}
            required
            onChange={handlePlaneIDChange}
            onFocus={() => setIsPlaneIDFocused(true)}
            onBlur={() => setIsPlaneIDFocused(false)}
          />
          {isPlaneIDFocused && filteredPlaneSuggestions.length > 0 && (
            <ul className="suggestions-list">
              {filteredPlaneSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(setPlaneID, suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
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
