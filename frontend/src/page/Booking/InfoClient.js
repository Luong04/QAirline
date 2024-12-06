import React from "react";
import "./InfoClient.css";
import NavbarBooking from '../../components/BookingPage/Header/NavbarBooking.js';
import { Link } from 'react-router-dom'

const InfoClient = () => {
    return (
        <div>
            <NavbarBooking />
            <div className="header-choosing">
                <Link to="/choosing" style={{ textDecoration: "none" }}> <button className="circle-button">
                    <span className="arrow">&lt;</span>
                </button> </Link>
                <span style={{ display: "inline", margin: "auto" }}>
                    <p style={{ fontSize: "24px" }}>THÔNG TIN LIÊN HỆ</p>
                </span>

            </div>
        </div>
    );
}


export default InfoClient;