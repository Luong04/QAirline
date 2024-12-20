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
import HoiAn from '../page/HomePage/HoiAn.js';
import DaNang from '../page/HomePage/DaNang.js';

import Admin from "../page/adminpage/Admin";
import AdminHome from "../page/adminpage/AdminHome";
import AdminPlanes from "../page/adminpage/AdminPlanes";
import AdminFlights from "../page/adminpage/AdminFlights";
import AdminNews from "../page/adminpage/AdminNews";

import ProtectedRoute from './ProtectedRoute'; // Import middleware bảo vệ

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        {/* Admin routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="admin">
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route 
            path="/admin/planes" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPlanes />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/admin/flights" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminFlights />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/admin/news" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminNews />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/checkticket" element={<Check/>}/>
        <Route path="/listflight" element={<ListFlight/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/booking/choosingSeat" element={<ChoosingSeat/>}/>
        <Route path="/booking/infoClient" element={<InfoClient/>}/>
        <Route path="/booking/payment" element={<Payment/>}/>
        <Route path="/booking/confirmPayment" element={<ConfirmPayment/>}/>
        <Route path="/checkBooking" element={<CheckBooking/>}/>
        <Route path="/ticket" element={<TicketB/>}/>
        <Route path="/hoian" element={<HoiAn/>}/>
        <Route path="/danang" element={<DaNang/>}/>
      </Routes>
    </div>
  );
}

export default App;
