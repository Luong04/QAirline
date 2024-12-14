import React from "react";
import Navbar from "../components/Navbar.js";
import FlightBooking from "../components/FlightBooking.js";

import "../styles/MainSection.css";

const MainSection = ({toggleLogin}) => {
  return (
    <div className="main-section">
      <Navbar toggleLogin={toggleLogin} />
      <FlightBooking />
    </div>
  );
};

export default MainSection;