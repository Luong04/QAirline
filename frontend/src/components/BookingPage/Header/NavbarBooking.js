import React, { useState } from 'react';
import logo from "../../../assets/image/logo.png";
import "./NavbarBooking.css";

const NavbarBooking = () => {
    const [activeSection, setActiveSection] = useState('#chon-chuyen');

    const handleMenuClick = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="navBooking">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <nav className="menu">
                <ul>
                    <li className={activeSection === '#chon-chuyen' ? 'active' : ''}>
                        <a href="booking/chon-chuyen" onClick={() => handleMenuClick('booking/chon-chuyen')}>CHỌN CHUYẾN</a>
                    </li>
                    <li className={activeSection === '#thong-tin' ? 'active' : ''}>
                        <a href="booking/thong-tin" onClick={() => handleMenuClick('booking/thong-tin')}>THÔNG TIN KHÁCH HÀNG</a>
                    </li>
                    <li className={activeSection === '#thanh-toan' ? 'active' : ''}>
                        <a href="booking/thanh-toan" onClick={() => handleMenuClick('booking/thanh-toan')}>THANH TOÁN</a>
                    </li>
                    <li className={activeSection === '#xac-nhan' ? 'active' : ''}>
                        <a href="booking/xac-nhan" onClick={() => handleMenuClick('booking/xac-nhan')}>XÁC NHẬN</a>
                    </li>
                    <li className={activeSection === '/' ? 'active' : ''}>
                        <a href="/" onClick={() => handleMenuClick('/')}>VỀ TRANG CHỦ</a>
                    </li>
                </ul>
            </nav></div>

    );
};

export default NavbarBooking;
