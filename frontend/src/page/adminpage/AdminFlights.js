import { React, useState, useEffect } from "react";
import "./AdminFlights.css";
import AddFlights from "../../components/adminpage/AddFlights.js";
import Flight from "../../components/adminpage/Flight.js";
import EditFlight from "../../components/adminpage/EditFlight.js";

const AdminFlights = () => {
  const [flights, setFlights] = useState([]);
  const [editingFlight, setEditingFlight] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);  // Thêm state phụ

  useEffect(() => {
    const fetchFlights = async () => {
      const res = await fetch("http://localhost:8081/api/flights", {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setFlights(data);
      }
    };
    fetchFlights();
  }, [refreshTrigger]);  // Thêm refreshTrigger vào dependency array

  const handleAddFlight = (newFlight) => {
    setFlights((prevFlights) => [...prevFlights, newFlight]);
    setRefreshTrigger(!refreshTrigger);  // Cập nhật refreshTrigger để trigger lại useEffect
  };


  const handleEditFlight = (editedFlight) => {
    setFlights(
      flights?.map((flight) =>
        flight.flight_id === editedFlight.flight_id ? editedFlight : flight
      )
    );
    setRefreshTrigger(!refreshTrigger);
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
      const token = localStorage.getItem("role");
      const res = await fetch(
        `http://localhost:8081/api/admin/removeFlights/${flight_id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
        }
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
        {flights?.map((flight) => (
          <Flight
            key={flight.flight_id}  // Thêm key để React có thể nhận diện các phần tử
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
