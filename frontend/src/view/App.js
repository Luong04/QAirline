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
      </Routes>
    </div>
  );
}

export default App;
