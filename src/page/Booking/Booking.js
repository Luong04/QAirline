import React, { useState } from "react"; // Đảm bảo import useState từ React
import "./Booking.css";
import NavbarBooking from '../../components/BookingPage/Header/NavbarBooking.js';
import InfoFlight from '../../components/BookingPage/Info/InfoFlight.js';
import PlaneContainer from '../../components/BookingPage/Booking/PlaneContainer.js';

const Booking = () => {
    const [flights, setFlights] = useState([]);
    const [goFlights, setGoFlights] = useState([]);
    const [returnFlights, setReturnFlights] = useState([]);

    return (
        <div>
            <NavbarBooking />
            <InfoFlight setFlights={setFlights} setGoFlights={setGoFlights} setReturnFlights={setReturnFlights} />
            <PlaneContainer 
                flights={flights} 
                goFlights={goFlights} 
                returnFlights={returnFlights} 
                setFlights={setFlights} 
                setGoFlights={setGoFlights} 
                setReturnFlights={setReturnFlights}  
            />
        </div>
    );
}

export default Booking;
