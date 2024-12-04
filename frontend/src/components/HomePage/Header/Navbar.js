import React from "react";
import { Link } from 'react-router-dom'
import "./Navbar.css";
import logo from "../../../assets/image/logo.png";
import homeIcon from '../../../assets/image/home_icon.png';
import languageIcon from '../../../assets/image/language_icon.png';
import profileIcon from '../../../assets/image/profile_icon.png';

const Navbar = ({toggleLogin}) => {
    return (
        <nav className="navbar">
                <img src={logo} alt="Logo" className="navbar-logo" />
                <div className="navbar-item">
                    <img src={homeIcon} alt="Home Icon" className="navbar-icon" />
                    <span ><Link to="/" className="navbar-text1">Trang chủ</Link></span>
                </div>
                <span ><Link to="/listflight" className="navbar-text">Thông tin hành trình</Link></span>
                <span className="navbar-text">Trợ giúp</span>
            
                <div className="navbar-item">
                    <img src={languageIcon} alt="Language Icon" className="navbar-icon" />
                    <span className="navbar-text1">EN</span>
                </div>
                <img src={profileIcon} alt="Profile Icon" className="navbar-icon"></img>
                <span className="navbar-text1" onClick={toggleLogin}>Đăng nhập </span>
                <span className="navbar-icon1">☰</span>
        </nav>
    );
} 

export default Navbar;
