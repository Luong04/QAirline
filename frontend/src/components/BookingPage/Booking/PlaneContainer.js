import React from "react";
import "./PlaneContainer.css";


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
  // Thêm các chuyến xe khác...
];


const PlaneContainer = () => {
  return (
    <div className="plane-container">
      {planeData.map((plane, index) => (
        <div key={index} className="plane-card">
          <div className="card-left"><h3>
            {plane.departure_place} → {plane.arrival_place}
          </h3>
          <p>{plane.depature_time}</p>
          <p>{plane.duration}</p>
          </div>
          <div className="card-right"><p>Còn trống: {plane.seatsAvailable} chỗ</p>
          <button className="reserve-btn">Đặt vé</button></div>
         
        </div>
      ))}
    </div>
  );
};


export default PlaneContainer;
