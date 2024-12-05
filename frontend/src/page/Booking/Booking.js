import React from "react";
import "./Booking.css";
import NavbarBooking from '../../components/BookingPage/Header/NavbarBooking.js';
import InfoFlight from '../../components/BookingPage/Info/InfoFlight.js';
import PlaneContainer from '../../components/BookingPage/Booking/PlaneContainer.js';


const Booking = () => {
    return (
        <div>
            <NavbarBooking/>
            <InfoFlight/>
            <PlaneContainer />
        </div>
    );
}


export default Booking;