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
                        <a href="#chon-chuyen" onClick={() => handleMenuClick('#chon-chuyen')}>CHỌN CHUYẾN</a>
                    </li>
                    <li className={activeSection === '#thong-tin' ? 'active' : ''}>
                        <a href="#thong-tin" onClick={() => handleMenuClick('#thong-tin')}>THÔNG TIN KHÁCH HÀNG</a>
                    </li>
                    <li className={activeSection === '#thanh-toan' ? 'active' : ''}>
                        <a href="#thanh-toan" onClick={() => handleMenuClick('#thanh-toan')}>THANH TOÁN</a>
                    </li>
                    <li className={activeSection === '#xac-nhan' ? 'active' : ''}>
                        <a href="#xac-nhan" onClick={() => handleMenuClick('#xac-nhan')}>XÁC NHẬN</a>
                    </li>
                    <li className={activeSection === '/' ? 'active' : ''}>
                        <a href="/" onClick={() => handleMenuClick('/')}>VỀ TRANG CHỦ</a>
                    </li>
                </ul>
            </nav></div>

    );
};

export default NavbarBooking;
