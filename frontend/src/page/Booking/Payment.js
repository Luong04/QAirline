import React from "react"; // Đảm bảo import useState từ React
import "./Payment.css";
import NavbarBooking from '../../components/BookingPage/Header/NavbarBooking.js';
import { Link, useAsyncError } from 'react-router-dom'
import logo from "../../assets/image/logo.png";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [booker, setBooker] = useState(null);
  const [goFlight, setGoFlight] = useState(null);
  const [returnFlight, setReturnFlight] = useState(null);
  const [businessSeats, setBusinessSeats] = useState(null);
  const [economySeats, setEconomySeats] = useState(null);
  const [total, setTotal] = useState(null);
  const [booking_id, setBookingId] = useState(null);
  const [payment_method, setPaymentMethod] = useState("Credit Card");

  const handleSubmit = async () => {
    const response = await axios.post('http://localhost:8081/api/createPayment', {
      booking_id, amount: total, payment_method
    });
    if(response.status === 201) {
      alert("Xác nhận thanh toán thành công");
    }
    navigate("/booking/confirmPayment",  { state: {booking_id, booker} });
  }

  useEffect(() => {
    const fetchData = async () => {
      if (location.state) {
        console.log("State:", location.state);
        if (location.state.total) {
          setTotal(location.state.total);
        }
        if (location.state.form) {
          setBooker(location.state.form);
        }
        if (location.state.goFlight) {
          setGoFlight(location.state.goFlight);
        }
        if (location.state.goFlight) {
          setReturnFlight(location.state.returnFlight);
        }
        if (location.state.number_business) {
          setBusinessSeats(location.state.number_business);
        }
        if (location.state.number_economy) {
          setEconomySeats(location.state.number_economy);
        }
        if (location.state.booking_id) {
          setBookingId(location.state.booking_id);
        }
      } else {
        setBooker(null);
        setBusinessSeats(null);
        setGoFlight(null);
        setReturnFlight(null);
        setEconomySeats(null);
        setTotal(null);
        setBookingId(null);
      }
    };

    fetchData();
  }, [location]);

  return (
    <div>
      <NavbarBooking />
      <div className="header-choosing">
        <Link to="/booking/infoClient" style={{ textDecoration: "none" }}>
          <button className="circle-button">
            <span className="arrow">&lt;</span>
          </button>
        </Link>
        <span style={{ display: "inline", margin: "auto" }}>
          <p style={{ fontSize: "24px" }}>THÔNG TIN ĐẶT VÉ</p>
        </span>
      </div>
      <div className="payment-container">
        <section className="inforBooking-container">

          <div className="inforTrip">
            <h3>THÔNG TIN HÀNH TRÌNH (CHIỀU ĐI)</h3>
            <div className="time-location">
              <div className="departure">
                <span className="location" style={{ marginBottom: "10px" }}>{goFlight?.departure_code}</span>
                <span className="time">{goFlight?.departure_time}</span>
              </div>
              <div className="duration">
                <div className="line-container" style={{ marginBottom: "10px" }}>
                  <div className="line"></div>
                  <div className="icon-container">
                    <img src={logo} alt="Icon" className="icon" />
                  </div>
                  <div className="line"></div>
                </div>
                <span className="total-time">{goFlight?.duration}</span>
              </div>
              <div className="arrival">
                <span className="location" style={{ marginBottom: "10px" }}>{goFlight?.arrival_code}</span>
                <span className="time">{goFlight?.arrival_time}</span>
              </div>
            </div>
          </div>
          <div>
            {returnFlight && (
                        <div className="inforTrip">
                        <h3>THÔNG TIN HÀNH TRÌNH (CHIỀU VỀ)</h3>
                        <div className="time-location">
                          <div className="departure">
                            <span className="location" style={{ marginBottom: "10px" }}>{returnFlight?.departure_code}</span>
                            <span className="time">{returnFlight?.departure_time}</span>
                          </div>
                          <div className="duration">
                            <div className="line-container" style={{ marginBottom: "10px" }}>
                              <div className="line"></div>
                              <div className="icon-container">
                                <img src={logo} alt="Icon" className="icon" />
                              </div>
                              <div className="line"></div>
                            </div>
                            <span className="total-time">{returnFlight?.duration}</span>
                          </div>
                          <div className="arrival">
                            <span className="location" style={{ marginBottom: "10px" }}>{returnFlight?.arrival_code}</span>
                            <span className="time">{returnFlight?.arrival_time}</span>
                          </div>
                        </div>
                      </div>
            )}
          </div>
          <div className="inforCustomer">
            <h3>THÔNG TIN KHÁCH HÀNG</h3>
            <p>Họ tên: <span style={{ fontWeight: "bold" }}>{booker?.fullName}</span></p>
            <p>Số điện thoại: <span style={{ fontWeight: "bold" }}>{booker?.phone}</span></p>
            <p>Email: <span style={{ fontWeight: "bold" }}>{booker?.email}</span></p>
          </div>
        </section>
        <section className="bill-container">
          <div className="bill">
            <h3>SỐ TIỀN CẦN THANH TOÁN</h3>
            <p>Hãng thương gia: <span style={{ fontWeight: "bold" }}>{businessSeats}</span></p>
            <p>Hãng phổ thông: <span style={{ fontWeight: "bold" }}>{economySeats}</span></p>
            <hr />
            <p>Tổng số tiền: <span style={{ fontWeight: "bold" }}>{total} $</span></p>
          </div>
          <div className="form-payment">
            <h3>HÌNH THỨC THANH TOÁN</h3>
            <label className="row-payment">
              <input
                type="radio"
                name="payment"
                value="Credit Card"
                checked={payment_method === "Credit Card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              /> <p>Credit Card</p>
              <input
                type="radio"
                name="payment"
                value="Bank Transfer"
                checked={payment_method === "Bank Transfer"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              /> <p>Bank Transfer</p>
              </label>
              <label className="row-payment">
              
              <input
                type="radio"
                name="payment"
                value="PayPal"
                checked={payment_method === "PayPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              /> <p>PayPal</p>
              <input
                type="radio"
                name="payment"
                value="Cash"
                checked={payment_method === "Cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              /> <p>Cash</p>
              
            </label>
            <button type="submit" className="submit-btn" style={{width: "50%"}}onClick={handleSubmit}>THANH TOÁN
            </button>
          </div>
        </section>
      </div>

    </div>
  )
}

export default Payment;
