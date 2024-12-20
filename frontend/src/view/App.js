import React, {useState} from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from '../page/HomePage/Home.js';
import Check from '../page/CheckTicket/Check.js';
import ListFlight from '../page/ListFlight/ListFlight.js';
import Booking from '../page/Booking/Booking.js';
import ChoosingSeat from '../page/Booking/ChoosingSeat.js';
import InfoClient from '../page/Booking/InfoClient.js';
import Payment from '../page/Booking/Payment.js';
import ConfirmPayment from '../page/Booking/ConfirmPayment.js';
import CheckBooking from '../page/CheckTicket/CheckBooking.js'
import TicketB from '../components/BookingPage/Tickets/TicketB.js';


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/checkticket" element={<Check/>}/>
        <Route path="/listflight" element={<ListFlight/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/booking/choosingSeat" element={<ChoosingSeat/>}/>
        <Route path="/booking/infoClient" element={<InfoClient/>}/>
        <Route path="/booking/payment" element={<Payment/>}/>
        <Route path="/booking/confirmPayment" element={<ConfirmPayment/>}/>
        <Route path="/checkBooking" element={<CheckBooking/>}/>
        <Route path="/ticket" element={<TicketB/>}/>
      </Routes>
    </div>
  );
}

export default App;
