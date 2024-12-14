import { React, useState } from "react";
import "../../styles/adminpage/FlightsBoard.css";
import Flight from "./Flight.js";

const FlightsBoard = () => {
  const [flights, setFlights] = useState([
    {
      id: 1,
      status: "On Time",
      departureTime: "10:00",
      departureAirport: "LAX",
      arrivalTime: "12:00",
      arrivalAirport: "JFK",
      economyPrice: 300,
      businessPrice: 500,
    },
    {
      id: 2,
      status: "Delayed",
      departureTime: "12:00",
      departureAirport: "JFK",
      arrivalTime: "14:00",
      arrivalAirport: "LAX",
      economyPrice: 300,
      businessPrice: 500,
    },
    {
      id: 3,
      status: "On Time",
      departureTime: "14:00",
      departureAirport: "LAX",
      arrivalTime: "16:00",
      arrivalAirport: "JFK",
      economyPrice: 300,
      businessPrice: 500,
    },
  ]);

  const handleDeleteFlights = (flight) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa chuyến bay này?")) {
      setFlights(flights.filter((f) => f !== flight));
    }
  };

  return (
    <div className="flights-board">
      <h2>Danh sách chuyến bay</h2>
      {flights.map((flight) => (
        <Flight flight={flight} onDelete={handleDeleteFlights} />
      ))}
    </div>
  );
};

export default FlightsBoard;
