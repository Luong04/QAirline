import React, { useState } from "react";
import "./ChoosingSeat.css";
import NavbarBooking from "../../components/BookingPage/Header/NavbarBooking.js";
import { Link } from 'react-router-dom'

const ChoosingSeat = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const seatPrice = { business: 1000000, economy: 800000 }; // Giá ghế theo hạng

  // Dữ liệu chỗ ngồi, phân chia theo khoang
  const businessSeats = [...Array(50)].map((_, index) => ({
    id: `B${index + 1}`,
    type: "business",
  }));

  const economySeats = [...Array(130)].map((_, index) => ({
    id: `E${index + 1}`,
    type: "economy",
  }));

  // Gộp toàn bộ ghế
  const seats = [...businessSeats, ...economySeats];

  const toggleSeatSelection = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const calculateTotal = () =>
    selectedSeats.reduce((total, seatId) => {
      const seat = seats.find((s) => s.id === seatId);
      return total + (seat?.type === "business" ? seatPrice.business : seatPrice.economy);
    }, 0);

  return (
    <div>
      <NavbarBooking />
      <div className="header-choosing">
        <Link to="/booking" style={{textDecoration: "none"}}> <button className="circle-button"> 
          <span className="arrow">&lt;</span> 
        </button> </Link>
        <span style={{display: "inline", margin: "auto"}}>
        <p style={{ fontSize: "24px" }}>CHỌN CHỖ</p>
        <p style={{ color: "black" }}>06:45 11/12/2024 · Hà Nội - Đà Nẵng</p>
        </span>
        
      </div>

      <div className="choosing-container">
        <main className="main-content">
          <section className="seat-map">

            <div className="legend">
              <span style={{ padding: "10px" }}><b>Business</b></span>
              <span style={{}}>
                <div className="box businessEmpty"></div> <p style={{ margin: "0", padding: "10px" }}> Ghế trống</p>
              </span>
              <span>
                <div className="box businessSelected"></div> <p style={{ margin: "0", padding: "10px" }}> Đang chọn</p>
              </span>
              <span style={{}}>
                <div className="box booked"></div> <p style={{ margin: "0", padding: "10px" }}>Đã đặt</p>
              </span>
            </div>
            <div className="legend">
              <span style={{ padding: "10px" }}><b>Economy</b></span>
              <span style={{}}>
                <div className="box economyEmpty"></div> <p style={{ margin: "0", padding: "10px" }}> Ghế trống</p>
              </span>
              <span>
                <div className="box economySelected"></div> <p style={{ margin: "0", padding: "10px" }}> Đang chọn</p>
              </span>
              <span style={{}}>
                <div className="box booked"></div> <p style={{ margin: "0", padding: "10px" }}>Đã đặt</p>
              </span>
            </div>



            <div className="plane-body">
              <h3>Business Class</h3>
              {Array.from({ length: Math.ceil(businessSeats.length / 10) }).map((_, rowIndex) => (
                <div key={rowIndex} className="plane-row">
                  <div className="seat-group left">
                    {businessSeats
                      .slice(rowIndex * 10, rowIndex * 10 + 5) // 5 ghế bên trái
                      .map((seat) => (
                        <div
                          key={seat.id}
                          className={`seat ${selectedSeats.includes(seat.id) ? "selected" : ""
                            } business`}
                          onClick={() => toggleSeatSelection(seat.id)}
                        >
                          {seat.id}
                        </div>
                      ))}
                  </div>
                  <div className="aisle"></div> {/* Lối đi giữa */}
                  <div className="seat-group right">
                    {businessSeats
                      .slice(rowIndex * 10 + 5, rowIndex * 10 + 10) // 5 ghế bên phải
                      .map((seat) => (
                        <div
                          key={seat.id}
                          className={`seat ${selectedSeats.includes(seat.id) ? "selected" : ""
                            } business`}
                          onClick={() => toggleSeatSelection(seat.id)}
                        >
                          {seat.id}
                        </div>
                      ))}
                  </div>
                </div>
              ))}

              <h3>Economy Class</h3>
              {Array.from({ length: Math.ceil(economySeats.length / 10) }).map((_, rowIndex) => (
                <div key={rowIndex} className="plane-row">
                  <div className="seat-group left">
                    {economySeats
                      .slice(rowIndex * 10, rowIndex * 10 + 5)
                      .map((seat) => (
                        <div
                          key={seat.id}
                          className={`seat ${selectedSeats.includes(seat.id) ? "selected" : ""
                            } economy`}
                          onClick={() => toggleSeatSelection(seat.id)}
                        >
                          {seat.id}
                        </div>
                      ))}
                  </div>
                  <div className="aisle"></div>
                  <div className="seat-group right">
                    {economySeats
                      .slice(rowIndex * 10 + 5, rowIndex * 10 + 10)
                      .map((seat) => (
                        <div
                          key={seat.id}
                          className={`seat ${selectedSeats.includes(seat.id) ? "selected" : ""
                            } economy`}
                          onClick={() => toggleSeatSelection(seat.id)}
                        >
                          {seat.id}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="info">
            <div className="container-price">
              <p>Phổ thông</p>
              <p style={{ fontSize: "20px" }}>800.000 VND</p>
            </div>
            <div className="container-price">
              <p>Thương gia</p>
              <p style={{ fontSize: "20px" }}>1.000.000 VND</p>
            </div>
            <h2>
              Mã ghế:{" "}
              <span id="selected-seats">
                {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
              </span>
            </h2>
            <h3>
    Số lượng ghế:{" "}
    <span id="seat-count">
      {selectedSeats.length}
    </span>
  </h3>
            <h3>
              Tổng tiền:{" "}
              <span id="total-price">
                {calculateTotal()} VND
              </span>
            </h3>
            <Link to="/booking/thong-tin" style={{textDecoration: "none"}}><button id="confirm">Tiếp tục</button></Link>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ChoosingSeat;
