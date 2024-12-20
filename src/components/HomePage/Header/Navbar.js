import React from "react";
import { Link } from 'react-router-dom'
import "./Navbar.css";
import logo from "../../../assets/image/logo.png";

const Navbar = ({ toggleLogin }) => {
    return (
        <nav className="navbar">
            <img src={logo} alt="Logo" className="navbar-logo" />
            <span ><Link to="/" className="navbar-text">TRANG CHỦ</Link></span>
            <span><Link to="/listflight" className="navbar-text">THÔNG TIN HÀNH TRÌNH</Link></span>
            <span><Link to="/checkticket" className="navbar-text">TRA CỨU VÉ</Link></span>
            <span><Link to="#" className="navbar-text" onClick={toggleLogin}>ĐĂNG NHẬP</Link></span>
            <span className="navbar-text">☰</span>
        </nav>
    );
}

export default Navbar;
