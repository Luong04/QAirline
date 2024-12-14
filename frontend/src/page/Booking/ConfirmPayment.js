import React, { useState } from "react"; // Đảm bảo import useState từ React
import "./ConfirmPayment.css";
import NavbarBooking from '../../components/BookingPage/Header/NavbarBooking.js';
import { Link, redirect } from 'react-router-dom';
import logo from "../../assets/image/logo.png";
import TicketB from "../../components/BookingPage/Tickets/TicketB.js";

const ConfirmPayment = () => {
    // 1. Sử dụng useState để quản lý thông tin vé
    const [ticketsInfo, setTicketInfo] = useState([{
        name: "Nguyen Dam Kien",
        ticketCode: "A26537",
        departure: "Vinh",
        destination: "Hồ Chí Minh",
        departureTime: "12h00 21/3/2025",
        arrivalTime: "14h30 21/3/2025",
        seat: "B13",
        price: "1000000",
        classType: "ECONOMY"
    }, {
        name: "Nguyen Dam Kien",
        ticketCode: "A26537",
        departure: "Vinh",
        destination: "Hồ Chí Minh",
        departureTime: "12h00 21/3/2025",
        arrivalTime: "14h30 21/3/2025",
        seat: "B13",
        price: "1000000",
        classType: "ECONOMY"
    }]);

    return (
        <div>
            {/* 2. Thêm Navbar */}
            <NavbarBooking />

            <div className="confirmation-message">
                <h2>Đặt vé thành công!</h2>
                <p>Cảm ơn bạn đã đặt vé với QAIRLINE. Chúc bạn có một chuyến đi vui vẻ!</p>
            </div>

            {ticketsInfo.map((ticketInfo, index)=>(<TicketB
                name={ticketInfo.name}
                ticketCode={ticketInfo.ticketCode}
                departure={ticketInfo.departure}
                destination={ticketInfo.destination}
                departureTime={ticketInfo.departureTime}
                arrivalTime={ticketInfo.arrivalTime}
                seat={ticketInfo.seat}
                price={ticketInfo.price}
                classType={ticketInfo.classType}
            />))}
            

            <button type="button" className="submit-btn" style={{width:"200px", marginBottom: "20px"}}>VỀ TRANG CHỦ</button>
        </div >
    );
};

export default ConfirmPayment;
