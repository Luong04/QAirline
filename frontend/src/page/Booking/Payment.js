import React from "react"; // Đảm bảo import useState từ React
import "./Payment.css";
import NavbarBooking from '../../components/BookingPage/Header/NavbarBooking.js';
import { Link } from 'react-router-dom'
import logo from "../../assets/image/logo.png";


const Payment = () => {
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
            <h3>THÔNG TIN HÀNH TRÌNH</h3>
            <div className="time-location">
              <div className="departure">
                <span className="location" style={{ marginBottom: "10px" }}>HAN</span>
                <span className="time">7/12/2024</span>
              </div>
              <div className="duration">
                <div className="line-container" style={{ marginBottom: "10px" }}>
                  <div className="line"></div>
                  <div className="icon-container">
                    <img src={logo} alt="Icon" className="icon" />
                  </div>
                  <div className="line"></div>
                </div>
                <span className="total-time">2h00</span>
              </div>
              <div className="arrival">
                <span className="location" style={{ marginBottom: "10px" }}>HCM</span>
                <span className="time">8/12/2024</span>
              </div>
            </div>
          </div>
          <div className="inforCustomer">
            <h3>THÔNG TIN KHÁCH HÀNG</h3>
            <p>Họ tên: <span style={{ fontWeight: "bold" }}>Nguyễn Đàm Kiên</span></p>
            <p>Số điện thoại: <span style={{ fontWeight: "bold" }}>0364830484</span></p>
            <p>Email: <span style={{ fontWeight: "bold" }}>kientrungx10st@gmail.com</span></p>
          </div>
        </section>
        <section className="bill-container">
          <div className="bill">
            <h3>SỐ TIỀN CẦN THANH TOÁN</h3>
            <p>Hãng thương gia: <span style={{ fontWeight: "bold" }}>2 vé (B2, B5)</span></p>
            <p>Hãng phổ thông: <span style={{ fontWeight: "bold" }}>1 vé (E1)</span></p>
            <hr />
            <p>Tổng số tiền: <span style={{ fontWeight: "bold" }}>2 800 000 VND</span></p>
          </div>
          <div className="form-payment">
            <h3>HÌNH THỨC THANH TOÁN</h3>
            <label>
              <input type="radio" name="payment" value="vnp" checked style={{width:"13px"}}/> VNPay
            </label>
            <button type="button" className="submit-btn">THANH TOÁN
            </button>
          </div>
        </section>
      </div>

    </div>
  )
}

export default Payment;
