import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Dùng để chuyển hướng
import "./CheckBooking.css";
import logo from "../../assets/image/logo.png";
import TicketB from "../../components/BookingPage/Tickets/TicketB.js";
import axios from 'axios';

const CheckBooking = () => {
    const navigate = useNavigate(); // Sử dụng để điều hướng
    const location = useLocation();
    const [bookingInfo, setBookingInfo] = useState();
    const [ticketsInfo, setTicketsInfo] = useState([]);
    useEffect(() => {
        // Kiểm tra nếu state có tồn tại và lấy dữ liệu
        if (location.state) {
            setBookingInfo(location.state.bookingInfo);
        }
    }, [location]);

    useEffect(() => {
        console.log("Updated Booking Info:", bookingInfo);
        if (bookingInfo?.ticketsInfo) {
            setTicketsInfo(bookingInfo.ticketsInfo);
        }
    }, [bookingInfo]);
    
    // Xử lý logic khi nhấn vào checkbox
    const handleCheckboxChange = (index) => {
        setTicketsInfo((prevTickets) =>
            prevTickets.map((ticket, i) =>
                i === index ? { ...ticket, checked: !ticket.checked } : ticket
            )
        );
    };

    const handleCancelTickets = async () => {
        const remainingTickets = ticketsInfo.filter(ticket => !ticket.checked);
        const checkedTickets = ticketsInfo.filter(ticket => ticket.checked);
        if (checkedTickets.length === 0) {
            alert("Yêu cầu không hợp lệ!");
        } else {
            const ticketIds = checkedTickets.map(ticket => ticket.ticketCode);
            console.log("TicketIDS: ", ticketIds);
    
            // Gửi request kèm ticketIds trong body
            try {
                const response = await axios.post('http://localhost:8081/api/cancelTicketById',  ticketIds );
                console.log("ve nay:  ",response);
                if (response) {
                    alert("Hủy vé thành công!");
                    setTicketsInfo(remainingTickets); // Cập nhật danh sách vé
                }
            } catch (error) {
                console.error("Error canceling tickets: ", error);
                alert("Không thể hủy vé. Vui lòng thử lại!");
            }
        }
    };
    

    return (
        <div>
            <div className="header-checkBooking">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <h2>TRA CỨU THÔNG TIN ĐẶT VÉ / HỦY VÉ</h2>
            </div>
            <h2>XIN CHÀO {bookingInfo?.customer_name}</h2>
            <div className="container-checkBooking">
                <section className="left-checkBooking">
                    <h3>THÔNG TIN ĐẶT VÉ</h3>
                    <div className="info-checkBooking"> <span>Họ Tên: </span>{bookingInfo?.customer_name}</div>
                    <div className="info-checkBooking"> <span>Email: </span>{bookingInfo?.email}</div>
                    <div className="info-checkBooking"> <span>Số điện thoại: </span>{bookingInfo?.phone}</div>
                    <div className="info-checkBooking"> <span>Số CCCD: </span>{bookingInfo?.customer_id}</div>
                    <div className="info-checkBooking"> <span>Ngày đặt vé: </span>{bookingInfo?.booking_date}</div>
                    <div className="info-checkBooking"> <span>Tổng số vé: </span>{ticketsInfo?.length}</div>
                </section>
                <section className="right-checkBooking">
                    {ticketsInfo?.map((ticket, index) => (
                        <div className="checkbox-ticket-row" key={ticket.ticketCode}>
                            <input
                                type="checkbox"
                                checked={ticket.checked}
                                onChange={() => handleCheckboxChange(index)}
                            />
                            <TicketB
                                name={ticket.name}
                                ticketCode={ticket.ticketCode}
                                departure={ticket.departure}
                                destination={ticket.destination}
                                departureTime={ticket.departureTime}
                                arrivalTime={ticket.arrivalTime}
                                seat={ticket.seat}
                                price={ticket.price}
                                classType={ticket.classType}
                            />
                        </div>
                    ))}

                    <button type="button" className="cancel-btn" onClick={handleCancelTickets}>
                        HỦY VÉ
                    </button>
                    <button type="button" className="submit-btn" onClick={() => navigate("/")}>
                        VỀ TRANG CHỦ
                    </button>
                </section>
            </div>
        </div>
    );
};

export default CheckBooking;
