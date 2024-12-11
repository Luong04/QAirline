import React from "react";
import "./CheckBooking.css";
import logo from "../../assets/image/logo.png"
import TicketB from "../../components/BookingPage/Tickets/TicketB.js"

const CheckBooking = () => {
    return (
        <div>
            <div className="header-checkBooking">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <h2> TRA CỨU THÔNG TIN ĐẶT VÉ / HỦY VÉ</h2>
            </div>
            <div className="container-checkBooking">
                <section className="left-checkBooking">
                <h3>Thông Tin Đặt Vé</h3>
          <ul>
            <li>Họ Tên: Nguyễn Văn A</li>
            <li>Email: example@gmail.com</li>
            <li>Số Điện Thoại: 0901234567</li>
            <li>Ngày Đặt Vé: 11/12/2024</li>
            <li>Tổng Số Vé: 2</li>
          </ul>
                </section>
                <section className="right-checkBooking"><TicketB/></section>
            </div>
        </div>

    )
}

export default CheckBooking;