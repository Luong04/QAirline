import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Dùng để chuyển hướng
import "./Check.css";
import TicketB from "../../components/BookingPage/Tickets/TicketB.js";
import Navbar from '../../components/HomePage/Header/Navbar.js';
import axios from 'axios';
import Login from "../../components/HomePage/Main/Login.js"

const Check = () => {
  const [showLogin, setShowLogin] = useState(false);
  
    const toggleLogin = () => {
      setShowLogin(!showLogin);
    }

  const location = useLocation();
  const navigate = useNavigate(); // Sử dụng để điều hướng
  const [ticketCode, setTicketCode] = useState('');
  const [ticketFound, setTicketFound] = useState(false); // Trạng thái để hiển thị TicketB
  const [ticketInfo, setTicketInfo] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/getTicketById', { ticketCode });
      if (response.status === 200 && response.data) {
        setTicketInfo(response.data);
        console.log(response.data);
        setTicketFound(true);
      } else {
        alert("Không tìm thấy vé!");
        navigate('/checkticket');
      }
    } catch (error) {
      console.error("Lỗi khi tìm kiếm vé:", error);
      alert("Không tìm thấy vé!");
      navigate('/checkticket');
    }
  };
  
  useEffect(() => {
          // Kiểm tra nếu state có tồn tại và lấy dữ liệu
          if (location.state) {
              setTicketInfo(location.state.ticketInfo);
          }
  }, [location]);
  return (
    <div className="check">
      <header>
      <Navbar toggleLogin={toggleLogin}/>
        <h1 style={{ marginBottom: "20px" }}>TRA CỨU VÉ</h1>
      </header>
      <div>
        <form className="formcheck-container" onSubmit={handleSubmit}>
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

          <button type="submit" className="submit-btn" style={{ width: "30%", padding:"3% 0", marginTop: "5%" }}>Tra cứu</button>
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
            <button type="submit" className="submit-btn" style={{ padding :"1% 0" }} onClick={()=>{navigate('/')}}>Về trang chủ</button>
          </div>

        )}
      </div>
      {showLogin && (
        <>
          <div className="overlay2" onClick={toggleLogin}></div>
          <Login onClose={toggleLogin} />
        </>
      )}
    </div>
  );
};

export default Check;
