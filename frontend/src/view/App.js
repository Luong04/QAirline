import React, {useState} from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from '../page/HomePage/Home.js';
import Check from '../page/CheckTicket/Check.js';
import ListFlight from '../page/ListFlight/ListFlight.js';
import Booking from '../page/Booking/Booking.js';


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/checkticket" element={<Check/>}/>
        <Route path="/listflight" element={<ListFlight/>}/>
        <Route path="/booking" element={<Booking/>}/>
      </Routes>
    </div>
  );
}

export default App;
