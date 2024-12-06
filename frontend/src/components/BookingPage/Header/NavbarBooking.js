import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/image/logo.png";
import "./NavbarBooking.css";

const NavbarBooking = () => {
    const location = useLocation(); // Lấy URL hiện tại

    return (
        <div className="navBooking">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <nav className="menu">
                <ul>
                    <li className={location.pathname === "/booking" || location.pathname === "/booking/choosingSeat" ? "active" : ""}>
                        <Link to="/booking/choosingSeat">CHỌN CHUYẾN</Link>
                    </li>
                    <li className={location.pathname === "/booking/infoClient" ? "active" : ""}>
                        <Link to="/booking/infoClient">THÔNG TIN KHÁCH HÀNG</Link>
                    </li>
                    <li className={location.pathname === "/booking/payment" ? "active" : ""}>
                        <Link to="/booking/payment">THANH TOÁN</Link>
                    </li>
                    <li className={location.pathname === "/booking/confirmPayment" ? "active" : ""}>
                        <Link to="/booking/confirmPayment">XÁC NHẬN</Link>
                    </li>
                    <li className={location.pathname === "/" ? "active" : ""}>
                        <Link to="/">VỀ TRANG CHỦ</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavbarBooking;
