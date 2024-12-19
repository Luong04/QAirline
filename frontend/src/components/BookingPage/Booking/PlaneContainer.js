import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./PlaneContainer.css";
import logo from "../../../assets/image/logo.png";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Component chính
const PlaneContainer = ({ flights, goFlights, returnFlights, setFlights, setGoFlights, setReturnFlights }) => {
  // Dùng useLocation để lấy thông tin state từ navigate
  console.log(flights);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedGoFlight, setSelectedGoFlight] = useState(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);
  const renderContent = () => {
    console.log("Flights length: ", flights.length);
    console.log("GoFlights length: ", goFlights.length);
    console.log("ReturnFlights length: ", returnFlights.length);
    if (flights.length > 0) {
      return <button className="reserve-btn" onClick={() => handleBookingFlights(false)}>Đặt vé</button>
    } else if (goFlights.length > 0 || returnFlights.length > 0) {
      return <button className="reserve-btn" onClick={() => handleBookingFlights(true)}>Đặt vé</button>
    }
    else {
      return (
        <div className="no-flights">
          <p>Không tìm thấy chuyến bay</p>
        </div>
      );
    }
  };


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
  const handleBookingFlights = async (isRoundTrip) => {
    if (!isRoundTrip) {
      if (selectedFlight) {
        const seatReservation = await axios.post('http://localhost:8081/api/findSeatReservations', {
          goFlightId: selectedFlight.flight_id
        })
        console.log("SEATTT:", seatReservation.data);
        navigate('/booking/choosingSeat', { state: { goFlight: selectedFlight, seatReservation: seatReservation.data, departure_code: flights[0].departure_code, arrival_code: flights[0].arrival_code } });
      }
      else alert("Vui lòng chọn chuyến bay");
    }
    else {
      if (selectedGoFlight && selectedReturnFlight) {
        const seatReservation = await axios.post('http://localhost:8081/api/findSeatReservations', {
          goFlightId: selectedGoFlight.flight_id,
          returnFlightId: selectedReturnFlight.flight_id,
        })
        console.log("SEATTT:", seatReservation.data);
        navigate('/booking/choosingSeat', { state: { goFlight: selectedGoFlight, returnFlight: selectedReturnFlight, seatReservation: seatReservation.data, departure_code: goFlights[0].departure_code, arrival_code: goFlights[0].arrival_time } });
      }
      else alert("Vui lòng chọn chuyến bay chiều đi và chiều về.");
    }
  };

  useEffect(() => {
    // Kiểm tra nếu state có tồn tại và lấy dữ liệu chuyến bay từ location
    if (location.state) {
      console.log('State:', location.state);  // In ra để kiểm tra dữ liệu
      if (location.state.flights) setFlights(location.state.flights);
      if (location.state.goFlights) setGoFlights(location.state.goFlights);
      if (location.state.returnFlights) setReturnFlights(location.state.returnFlights);
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
              <div className="container-price">
                <p>Phổ thông</p>
                <p>{plane.true_price_economy} $</p>
              </div>
              <div className="container-price">
                <p>Thương gia</p>
                <p>{plane.true_price_business} $</p>
              </div>
              <input type="radio" name="optionOneway" onChange={() => setSelectedFlight(plane)} />
            </div>
          </div>
        )
        )
      ) : (
        <>
          {goFlights.length > 0 && goFlights.map((plane, index) => (
            <div>
              <h3 style={{ color: "#046262" }}>CHIỀU ĐI</h3>
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
                  <div className="container-price">
                    <p>Phổ thông</p>
                    <p>{plane.true_price_economy} $</p>
                  </div>
                  <div className="container-price">
                    <p>Thương gia</p>
                    <p>{plane.true_price_business} $</p>
                  </div>
                  <input type="radio" name="optionGo" onChange={() => setSelectedGoFlight(plane)} />
                </div>
              </div>
            </div>
          ))}

          {returnFlights.length > 0 && returnFlights.map((plane, index) => (
            <div>
              <h3 style={{ color: "#046262" }}>CHIỀU VỀ</h3>
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
                  <div className="container-price">
                    <p>Phổ thông</p>
                    <p>{plane.true_price_economy} $</p>
                  </div>
                  <div className="container-price">
                    <p>Thương gia</p>
                    <p>{plane.true_price_business} $</p>
                  </div>
                  <input type="radio" name="optionReturn" onChange={() => setSelectedReturnFlight(plane)} />
                </div>
              </div>
            </div>
          ))}


        </>
      )
      }
      {renderContent()}

    </div>
  );

};

export default PlaneContainer;
