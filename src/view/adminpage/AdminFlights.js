import { React, useState, useEffect } from "react";
import "./AdminFlights.css";
import AddFlights from "../../components/adminpage/AddFlights.js";
import Flight from "../../components/adminpage/Flight.js";
import EditFlight from "../../components/adminpage/EditFlight.js";

const AdminFlights = () => {
  const [flights, setFlights] = useState([]);
  const [editingFlight, setEditingFlight] = useState(null);

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

  const handleAddFlight = (newFlight) => {
    setFlights([...flights, newFlight]);
  };

  const handleEditFlight = (editedflight) => {
    setFlights(
      flights.map((flight) =>
        flight.flight_id === editedflight.flight_id ? editedflight : flight
      )
    );
    setEditingFlight(null);
  };

  const handleEdit = (flight) => {
    setEditingFlight(flight);
  };

  const handleCancelEdit = () => {
    setEditingFlight(null);
  };

  const handleDeleteFlight = async (flight_id) => {
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
    <div className="admin-flights">
      <AddFlights onUpdate={handleAddFlight} />
      <div className="flights-board">
        <h2>Danh sách chuyến bay</h2>
        {flights.map((flight) => (
          <Flight
            flight={flight}
            onDelete={handleDeleteFlight}
            onEdit={handleEdit}
          />
        ))}
        {editingFlight && (
          <EditFlight
            flight={editingFlight}
            onCancel={handleCancelEdit}
            onEdit={handleEditFlight}
          />
        )}
      </div>
    </div>
  );
};

export default AdminFlights;
