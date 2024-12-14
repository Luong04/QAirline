import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./view/App";
import Admin from "./view/adminpage/Admin";
import AdminHome from "./view/adminpage/AdminHome";
import AdminPlanes from "./view/adminpage/AdminPlanes";
import AdminFlights from "./view/adminpage/AdminFlights";
import AdminNews from "./view/adminpage/AdminNews";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<Admin />}>
          <Route index element={<AdminHome />} />
          <Route path="/admin/planes" element={<AdminPlanes />} />
          <Route path="/admin/flights" element={<AdminFlights />} />
          <Route path="/admin/news" element={<AdminNews />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
