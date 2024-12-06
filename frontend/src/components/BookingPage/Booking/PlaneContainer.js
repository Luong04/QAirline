import React from "react";
import "./PlaneContainer.css";
import logo from "../../../assets/image/logo.png";
import { Link } from 'react-router-dom'


// Dữ liệu chuyến xe (có thể đến từ API hoặc props)

const planeData = [
  {
    departure_place: "Hà Nội",
    arrival_place: "Đà Nẵng",
    depature_time: "19:50 10/12/2024",
    arrival_time: "23:00 10/12/2024",
    duration: "3h 10p",
    seatsAvailable: 16,
  },
  {
    departure_place: "Hà Nội",
    arrival_place: "Hồ Chí Minh",
    depature_time: "20:00 10/12/2024",
    arrival_time: "10:00 11/12/2024",
    duration: "14h 30p",
    seatsAvailable: 8,
  },
  {
    departure_place: "Hà Nội",
    arrival_place: "Hồ Chí Minh",
    depature_time: "20:00 10/12/2024",
    arrival_time: "10:00 11/12/2024",
    duration: "14h 30p",
    seatsAvailable: 8,
  },
  // Thêm các chuyến xe khác...
];


const PlaneContainer = () => {
  return (
    <div className="plane-container">
      {planeData.map((plane, index) => (
        <div key={index} className="plane-card">
          <div className="card-left">
            <div class="time-location">
              <div class="departure">
                <span class="location"  style={{ marginBottom: "10px"}}>{plane.departure_place}</span>
                <span class="time">{plane.depature_time}</span>
              </div>
              <div class="duration">
                <div class="line-container" style={{ marginBottom: "10px"}}>
                  <div class="line"></div>
                  <div class="icon-container">
                    <img src={logo} alt="Icon" class="icon" />
                  </div>
                  <div class="line"></div>
                </div>
                <span class="total-time">{plane.duration}</span>
              </div>
              <div class="arrival">
                <span class="location" style={{ marginBottom: "10px"}}>{plane.arrival_place}</span>
                <span class="time">{plane.arrival_time}</span>

              </div>
            </div>
          </div>
          <div className="card-right"><p>Còn trống: {plane.seatsAvailable} chỗ</p>
            <Link to="/booking/chon-chuyen" className="reserve-btn"><button className="reserve-btn">Đặt vé</button></Link></div>

        </div>
      ))}
    </div>
  );
};


export default PlaneContainer;
