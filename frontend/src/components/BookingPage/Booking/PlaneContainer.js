import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./PlaneContainer.css";
import logo from "../../../assets/image/logo.png";

// Component chính
const PlaneContainer = ({ flights, goFlights, returnFlights, setFlights, setGoFlights, setReturnFlights }) => {
  // Dùng useLocation để lấy thông tin state từ navigate
  const location = useLocation(); 

  /*      Các dữ liệu trong mảng flights, flights chứa nhiều phần tử con, mỗi phần tử gồm
            flight_id: flight.flight_id,
            departure_code: departure_airport.code,
            arrival_code: arrival_airport.code,
            departure_time: flight.departure_time,
            arrival_time: flight.arrival_time,
            plane: plane.model,
            duration_time: flight.duration,
            economy_price: flight.true_price_economy, 
            business_price: flight.true_price_business, 
  */

  // Dùng useEffect để cập nhật state flights khi location thay đổi
  useEffect(() => {
    // Kiểm tra nếu state có tồn tại và lấy dữ liệu chuyến bay từ location
    if (location.state) {
      if(location.state.flights) setFlights(location.state.flights);
      if(location.state.goFlights) setGoFlights(location.state.goFlights);
      if(location.state.returnFlights) setReturnFlights(location.state.returnFlights);
    } else {
      setFlights([]);
      setGoFlights([]);
      setReturnFlights([]);
    }
  }, [location]);  // Hook này sẽ chạy lại khi location thay đổi

  return (
    <div className="plane-container">
      {flights.length > 0 ? (
        flights.map((plane, index) => (
          <div key={index} className="plane-card">
            <div className="card-left">
              <div className="time-location">
                <div className="departure">
                  <span className="location" style={{ marginBottom: "10px" }}>{plane.departure_code}</span>
                  <span className="time">{plane.departure_time}</span>
                </div>
                <div className="duration">
                  <div className="line-container" style={{ marginBottom: "10px" }}>
                    <div className="line"></div>
                    <div className="icon-container">
                      <img src={logo} alt="Icon" className="icon" />
                    </div>
                    <div className="line"></div>
                  </div>
                  <span className="total-time">{plane.duration_time}</span>
                </div>
                <div className="arrival">
                  <span className="location" style={{ marginBottom: "10px" }}>{plane.arrival_code}</span>
                  <span className="time">{plane.arrival_time}</span>
                </div>
              </div>
            </div>
            <div className="card-right">
              <button className="reserve-btn">Đặt vé</button>
            </div>
          </div>
        ))
      ) : (
        <>
          {goFlights.length > 0 && goFlights.map((plane, index) => (
            <div key={index} className="plane-card">Go flights
              <div className="card-left">
                <div className="time-location">
                  <div className="departure">
                    <span className="location" style={{ marginBottom: "10px" }}>{plane.departure_code}</span>
                    <span className="time">{plane.departure_time}</span>
                  </div>
                  <div className="duration">
                    <div className="line-container" style={{ marginBottom: "10px" }}>
                      <div className="line"></div>
                      <div className="icon-container">
                        <img src={logo} alt="Icon" className="icon" />
                      </div>
                      <div className="line"></div>
                    </div>
                    <span className="total-time">{plane.duration_time}</span>
                  </div>
                  <div className="arrival">
                    <span className="location" style={{ marginBottom: "10px" }}>{plane.arrival_code}</span>
                    <span className="time">{plane.arrival_time}</span>
                  </div>
                </div>
              </div>
              <div className="card-right">
                <button className="reserve-btn">Đặt vé</button>
              </div>
            </div>
          ))}
          
          {returnFlights.length > 0 && returnFlights.map((plane, index) => (
            <div key={index} className="plane-card">Return flights
              <div className="card-left">
                <div className="time-location">
                  <div className="departure">
                    <span className="location" style={{ marginBottom: "10px" }}>{plane.departure_code}</span>
                    <span className="time">{plane.departure_time}</span>
                  </div>
                  <div className="duration">
                    <div className="line-container" style={{ marginBottom: "10px" }}>
                      <div className="line"></div>
                      <div className="icon-container">
                        <img src={logo} alt="Icon" className="icon" />
                      </div>
                      <div className="line"></div>
                    </div>
                    <span className="total-time">{plane.duration_time}</span>
                  </div>
                  <div className="arrival">
                    <span className="location" style={{ marginBottom: "10px" }}>{plane.arrival_code}</span>
                    <span className="time">{plane.arrival_time}</span>
                  </div>
                </div>
              </div>
              <div className="card-right">
                <button className="reserve-btn">Đặt vé</button>
              </div>
            </div>
          ))}
          {flights.length === 0 && goFlights.length === 0 && returnFlights.length === 0 && (
            <div className="no-flights">
              <p>Không tìm thấy chuyến bay</p>
            </div>
          )}
        </>
      )}
      
    </div>
  );
  
};

export default PlaneContainer;
