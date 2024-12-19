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
                <div className={location.pathname === "/booking" || location.pathname === "/booking/choosingSeat" ? "active" : ""}>
                        <Link to="/booking/choosingSeat">CHỌN CHUYẾN</Link>
                    </div>
                    <div className={location.pathname === "/booking/infoClient" ? "active" : ""}>
                        <Link to="/booking/infoClient">THÔNG TIN KHÁCH HÀNG</Link>
                    </div>
                    <div className={location.pathname === "/booking/payment" ? "active" : ""}>
                        <Link to="/booking/payment">THANH TOÁN</Link>
                    </div>
                    <div className={location.pathname === "/booking/confirmPayment" ? "active" : ""}>
                        <Link to="/booking/confirmPayment">XÁC NHẬN</Link>
                    </div>
                    <div className={location.pathname === "/" ? "active" : ""}>
                        <Link to="/">VỀ TRANG CHỦ</Link>
                    </div>
            </nav>
        </div>
    );
};

export default NavbarBooking;
