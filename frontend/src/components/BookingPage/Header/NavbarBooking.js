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
                    <li className={location.pathname === "/booking" || location.pathname === "/booking/chon-chuyen" ? "active" : ""}>
                        <Link to="/booking/chon-chuyen">CHỌN CHUYẾN</Link>
                    </li>
                    <li className={location.pathname === "/booking/thong-tin" ? "active" : ""}>
                        <Link to="/booking/thong-tin">THÔNG TIN KHÁCH HÀNG</Link>
                    </li>
                    <li className={location.pathname === "/booking/thanh-toan" ? "active" : ""}>
                        <Link to="/booking/thanh-toan">THANH TOÁN</Link>
                    </li>
                    <li className={location.pathname === "/booking/xac-nhan" ? "active" : ""}>
                        <Link to="/booking/xac-nhan">XÁC NHẬN</Link>
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
