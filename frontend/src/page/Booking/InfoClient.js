import React, { useState } from "react";
import "./InfoClient.css";
import NavbarBooking from '../../components/BookingPage/Header/NavbarBooking.js';
import { Link, useNavigate } from 'react-router-dom';

const InfoClient = () => {

  const navigate = useNavigate(); // Khởi tạo useNavigate
  // State quản lý thông tin người đặt vé
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // State quản lý ghế
  const [seats, setSeats] = useState([
    { id: 1, type: "Thương gia", code: "SG01" },
    { id: 2, type: "Thương gia", code: "SG02" },
    { id: 3, type: "Phổ thông", code: "PT01" },
  ]);

  // Tách hành khách dựa trên hạng ghế
  const businessClassPassengers = seats.filter(seat => seat.type === "Thương gia");
  const economyClassPassengers = seats.filter(seat => seat.type === "Phổ thông");

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Kiểm tra form
  const validateForm = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Họ tên không được để trống";
    if (!form.phone.trim()) newErrors.phone = "Số điện thoại không được để trống";
    else if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Số điện thoại không hợp lệ (10 chữ số)";
    if (!form.email.trim()) newErrors.email = "Email không được để trống";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email không hợp lệ";
    return newErrors;
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsFormSubmitted(true);
    }
  };

  const [passengerInfo, setPassengerInfo] = useState(
    seats.map((seat) => ({
      id: seat.id,
      code: seat.code,
      fullName: "",
      cccd: "",
      errors: {}, // Lỗi cho từng hành khách
    }))
  );

  const handlePassengerChange = (e, id) => {
    const { name, value } = e.target;
    setPassengerInfo((prev) =>
      prev.map((passenger) =>
        passenger.id === id
          ? { ...passenger, [name]: value, errors: { ...passenger.errors, [name]: "" } }
          : passenger
      )
    );
  };

  const validatePassengers = () => {
    let isValid = true;
    const updatedPassengers = passengerInfo.map((passenger) => {
      const errors = {};
      if (!passenger.fullName.trim()) {
        errors.fullName = "Họ tên không được để trống";
        isValid = false;
      }
      if (!passenger.cccd.trim()) {
        errors.cccd = "CCCD/CMND không được để trống";
        isValid = false;
      } else if (!/^\d{12}$/.test(passenger.cccd)) {
        errors.cccd = "CCCD/CMND phải là 12 chữ số";
        isValid = false;
      }
      return { ...passenger, errors };
    });

    setPassengerInfo(updatedPassengers);
    return isValid;
  };

  const handleFinish = () => {
    if (validatePassengers()) {
      navigate("/booking/payment");
    } else {
      alert("Vui lòng kiểm tra thông tin của hành khách!");
    }
  };



  return (
    <div>
      <NavbarBooking />
      <div className="header-choosing">
        <Link to="/booking/choosingSeat" style={{ textDecoration: "none" }}>
          <button className="circle-button">
            <span className="arrow">&lt;</span>
          </button>
        </Link>
        <span style={{ display: "inline", margin: "auto" }}>
          <p style={{ fontSize: "24px" }}>THÔNG TIN LIÊN HỆ</p>
        </span>
      </div>
      <div className="infoclient-container">
        {/* Section 1: Thông tin người đặt vé */}
        <section className="booker-container">
          <h2>NGƯỜI ĐẶT VÉ</h2>
          <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
            <div className="form-group">
              <label htmlFor="fullName">Họ tên <span className="required">*</span></label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Nhập họ tên"
                value={form.fullName}
                onChange={handleInputChange}
              />
              {errors.fullName && <p className="error-text">{errors.fullName}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Số điện thoại <span className="required">*</span></label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Nhập số điện thoại"
                value={form.phone}
                onChange={handleInputChange}
              />
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email <span className="required">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Nhập email"
                value={form.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            <button type="submit" className="submit-btn">Tiếp tục</button>
          </form>
        </section>

        {/* Section 2: Thông tin hành khách hạng thương gia */}
        {isFormSubmitted && (
          <section className="client-container">

            <h2>HÀNH KHÁCH HẠNG THƯƠNG GIA</h2>
            {passengerInfo
              .filter((passenger) => businessClassPassengers.some((seat) => seat.id === passenger.id))
              .map((passenger) => (
                <form key={passenger.id} className="seat-form">
                  <div className="form-group">
                    <label>Mã ghế:</label>
                    <input type="text" value={passenger.code} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Họ tên:</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Nhập họ tên hành khách"
                      value={passenger.fullName}
                      onChange={(e) => handlePassengerChange(e, passenger.id)}
                    />
                    {passenger.errors.fullName && <p className="error-text">{passenger.errors.fullName}</p>}
                  </div>
                  <div className="form-group">
                    <label>CCCD/CMND:</label>
                    <input
                      type="text"
                      name="cccd"
                      placeholder="Nhập CCCD/CMND"
                      value={passenger.cccd}
                      onChange={(e) => handlePassengerChange(e, passenger.id)}
                    />
                    {passenger.errors.cccd && <p className="error-text">{passenger.errors.cccd}</p>}
                  </div>
                </form>
              ))}
          </section>
        )}

        {/* Section 3: Thông tin hành khách hạng phổ thông */}
        {isFormSubmitted && (
          <section className="client-container">
            <h2>HÀNH KHÁCH HẠNG PHỔ THÔNG</h2>
            {passengerInfo
              .filter((passenger) => economyClassPassengers.some((seat) => seat.id === passenger.id))
              .map((passenger) => (
                <form key={passenger.id} className="seat-form">
                  <div className="form-group">
                    <label>Mã ghế:</label>
                    <input type="text" value={passenger.code} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Họ tên:</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Nhập họ tên hành khách"
                      value={passenger.fullName}
                      onChange={(e) => handlePassengerChange(e, passenger.id)}
                    />
                    {passenger.errors.fullName && <p className="error-text">{passenger.errors.fullName}</p>}
                  </div>
                  <div className="form-group">
                    <label>CCCD/CMND:</label>
                    <input
                      type="text"
                      name="cccd"
                      placeholder="Nhập CCCD/CMND"
                      value={passenger.cccd}
                      onChange={(e) => handlePassengerChange(e, passenger.id)}
                    />
                    {passenger.errors.cccd && <p className="error-text">{passenger.errors.cccd}</p>}
                  </div>
                </form>
              ))}
            <button type="button" className="submit-btn" onClick={handleFinish}>
              Xong
            </button>
          </section>
        )}

      </div>
    </div>
  );
};

export default InfoClient;
