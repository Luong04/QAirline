import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Dùng để chuyển hướng
import "./CheckBooking.css";
import logo from "../../assets/image/logo.png";
import TicketB from "../../components/BookingPage/Tickets/TicketB.js";

const CheckBooking = () => {
    const navigate = useNavigate(); // Sử dụng để điều hướng
    const [ticketsInfo, setTicketsInfo] = useState([
        {
            name: "Nguyen Dam Kien",
            ticketCode: "A26537",
            departure: "Vinh",
            destination: "Hồ Chí Minh",
            departureTime: "12h00 21/3/2025",
            arrivalTime: "14h30 21/3/2025",
            seat: "B13",
            price: "1000000",
            classType: "ECONOMY",
            checked: false
        },
        {
            name: "Nguyen Dam Kien",
            ticketCode: "B37890",
            departure: "Hà Nội",
            destination: "Đà Nẵng",
            departureTime: "14h00 22/3/2025",
            arrivalTime: "16h30 22/3/2025",
            seat: "C21",
            price: "800000",
            classType: "BUSINESS",
            checked: false
        }
    ]);

    // Xử lý logic khi nhấn vào checkbox
    const handleCheckboxChange = (index) => {
        setTicketsInfo((prevTickets) =>
            prevTickets.map((ticket, i) =>
                i === index ? { ...ticket, checked: !ticket.checked } : ticket
            )
        );
    };

    // Xử lý logic khi nhấn nút "HỦY VÉ"
    const handleCancelTickets = () => {
        // Lọc ra các vé không được chọn
        const remainingTickets = ticketsInfo.filter(ticket => !ticket.checked);

        if (remainingTickets.length === 0) {
            alert("Hủy vé thành công! Không còn vé nào.");
            navigate("/"); // Chuyển hướng về trang chủ
        } else {
            alert("Hủy vé thành công!");
            setTicketsInfo(remainingTickets); // Cập nhật danh sách vé
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
            <h2>XIN CHÀO NGUYỄN ĐÀM KIÊN</h2>
            <div className="container-checkBooking">
                <section className="left-checkBooking">
                    <h3>THÔNG TIN ĐẶT VÉ</h3>
                    <div className="info-checkBooking"> <span>Họ Tên: </span>Nguyễn Đàm Kiên</div>
                    <div className="info-checkBooking"> <span>Email: </span>kientrungx10st@gmail.com</div>
                    <div className="info-checkBooking"> <span>Số điện thoại: </span>0364830484</div>
                    <div className="info-checkBooking"> <span>Số CCCD: </span>040103123283</div>
                    <div className="info-checkBooking"> <span>Ngày đặt vé: </span>11/12/2024</div>
                    <div className="info-checkBooking"> <span>Tổng số vé: </span>{ticketsInfo.length}</div>
                </section>
                <section className="right-checkBooking">
                    {ticketsInfo.map((ticket, index) => (
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
