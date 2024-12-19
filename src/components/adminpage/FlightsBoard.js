import { React, useState, useEffect } from "react";
import "../../styles/adminpage/FlightsBoard.css";
import Flight from "./Flight.js";
import EditFlight from "./EditFlight.js";

const FlightsBoard = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      const res = await fetch("http://localhost:8081/admin/adminflights", {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setFlights(data);
      }
    };
    fetchFlights();
  }, []);

  const [editingFlight, setEditingFlight] = useState(null);

  const handleEdit = (flight) => {
    setEditingFlight(flight);
  };

  const handleCancel = () => {
    setEditingFlight(null);
  };

  const handleDelete = async (flight_id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa chuyến bay này?")) {
      const res = await fetch(
        `http://localhost:8081/admin/adminflights/${flight_id}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setFlights(flights.filter((flight) => flight.flight_id !== flight_id));
        alert("Xóa chuyến bay thành công");
      } else {
        alert("Xóa chuyến bay thất bại");
      }
    }
  };

  return (
    <div className="flights-board">
      <h2>Danh sách chuyến bay</h2>
      {flights.map((flight) => (
        <Flight flight={flight} onDelete={handleDelete} onEdit={handleEdit} />
      ))}
      {editingFlight && (
        <EditFlight flight={editingFlight} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default FlightsBoard;
