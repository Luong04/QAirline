import React from "react";
import { Link } from 'react-router-dom'
import "./Navbar.css";
import logo from "../../../assets/image/logo.png";
import homeIcon from '../../../assets/image/home_icon.png';
import languageIcon from '../../../assets/image/language_icon.png';
import profileIcon from '../../../assets/image/profile_icon.png';

const Navbar = ({ toggleLogin }) => {
    return (
        <nav className="navbar">
            <img src={logo} alt="Logo" className="navbar-logo" />
            <div className="navbar-item">
                <img src={homeIcon} alt="Home Icon" className="navbar-icon" />
                <span ><Link to="/" className="navbar-text">Trang chủ</Link></span>
            </div>
            <span><Link to="/listflight" className="navbar-text">Thông tin hành trình</Link></span>
            <span><Link to="/checkticket" className="navbar-text">Tra cứu vé</Link></span>

            <span><Link className="navbar-text" onClick={toggleLogin}>Đăng nhập</Link></span>
            <div className="navbar-icon1">☰</div>
        </nav>
    );
}

export default Navbar;
