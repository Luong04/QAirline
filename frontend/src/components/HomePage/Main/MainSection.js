import React from "react";
import Navbar from '../Header/Navbar.js';
import FlightBooking from "./FlightBooking.js";

import "./MainSection.css";

const MainSection = ({toggleLogin}) => {
  return (
    <div className="main-section">
      <Navbar toggleLogin={toggleLogin} />
      <FlightBooking />
    </div>
  );
};

export default MainSection;