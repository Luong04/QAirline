import React, { useState, useEffect } from "react"; // Đảm bảo import useState từ React
import "./ConfirmPayment.css";
import NavbarBooking from '../../components/BookingPage/Header/NavbarBooking.js';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
const ConfirmPayment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [booking_id, setBookingId] = useState(null);
    const [booker, setBooker] = useState(null);
    useEffect(() => {
        // Kiểm tra nếu state có tồn tại và lấy dữ liệu
        if (location.state) {
            setBookingId(location.state.booking_id);
            setBooker(location.state.booker);
        }
    }, [location]);
    const handleCheckBooking = async () => {
        const response = await axios.post('http://localhost:8081/api/getBookingByForm', {
            booking_id,
            cccd: booker?.cccd,
            email: booker?.email
        });
        console.log("kettquuaaabookiinnggg: ", response.data);
        navigate('/checkBooking', { state: {bookingInfo: response.data}});
    }
    return (
        <div>
            {/* 2. Thêm Navbar */}
            <NavbarBooking />

            <div className="confirmation-message">
                <h2>Đặt vé thành công!</h2>
                <p>Cảm ơn bạn đã đặt vé với QAIRLINE. Chúc bạn có một chuyến đi vui vẻ!</p>
                <h3>Mã đặt chỗ: {booking_id}</h3>
            </div>


            {/* 3. Thêm TicketB và truyền các thông tin vé */}
            <button type="submit" className="submit-btn" style={{ width: "200px" }} onClick={handleCheckBooking}>XEM VÉ</button>
            <button type="submit" className="submit-btn" style={{ width: "200px" }} onClick={()=>{navigate('/')}}>VỀ TRANG CHỦ</button>
        </div >
    );
};

export default ConfirmPayment;
