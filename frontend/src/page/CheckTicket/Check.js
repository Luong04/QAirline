import React, { useState } from "react";
import "./Check.css";
import TicketB from "../../components/BookingPage/Tickets/TicketB.js";
import Navbar from '../../components/HomePage/Header/Navbar.js';


const Check = () => {
  const [ticketCode, setTicketCode] = useState('');
  const [ticketFound, setTicketFound] = useState(false); // Trạng thái để hiển thị TicketB
  const [ticketInfo, setTicketInfo] = useState({
    name: "Nguyen Dam Kien",
    ticketCode: "A26537",
    departure: "Vinh",
    destination: "Hồ Chí Minh",
    departureTime: "12h00 15/12/2024",
    arrivalTime: "14h30 15/12/2024",
    seat: "B13",
    price: "2.000.000",
    classType: "ECONOMY"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Giả lập tra cứu vé
    if (ticketCode.trim() === "VALID_CODE") { // Thay VALID_CODE bằng mã kiểm tra thực tế
      setTicketFound(true);
    } else {
      alert("Không tìm thấy vé với mã này!");
      setTicketFound(false);
    }
  };

  return (
    <div className="check">
      <header>
        <Navbar />
        <h1 style={{ marginBottom: "20px" }}>TRA CỨU VÉ</h1>
      </header>
      <div>
        <form onSubmit={handleSubmit} style={{width: "500px"}}>
          <div className="form-check">
            <label htmlFor="ticketCode" className="form-label">Nhập mã vé</label>
            <input
              type="text"
              className="form-control"
              id="ticketCode"
              value={ticketCode}
              onChange={(e) => setTicketCode(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn" style={{ width: "150px", marginTop: "10px" }}>Tra cứu</button>
        </form>

        {/* Hiển thị TicketB khi tìm thấy vé */}
        {ticketFound && (
          <div className="ticket-info">
            <TicketB
              name={ticketInfo.name}
              ticketCode={ticketInfo.ticketCode}
              departure={ticketInfo.departure}
              destination={ticketInfo.destination}
              departureTime={ticketInfo.departureTime}
              arrivalTime={ticketInfo.arrivalTime}
              seat={ticketInfo.seat}
              price={ticketInfo.price}
              classType={ticketInfo.classType}
            />
            <button type="submit" className="submit-btn" style={{ width: "150px", marginTop: "10px" }}>Về trang chủ</button>
          </div>

        )}
      </div>
    </div>
  );
};

export default Check;
