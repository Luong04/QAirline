import React from "react";
import "./AdminFlights.css";
import AddFlights from "../../components/adminpage/AddFlights.js";
import FlightsBoard from "../../components/adminpage/FlightsBoard.js";

const AdminFlights = () => {
  return (
    <div className="admin-flights">
      <AddFlights />
      <FlightsBoard />
    </div>
  );
};

export default AdminFlights;
