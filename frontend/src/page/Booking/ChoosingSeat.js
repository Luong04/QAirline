import React, { useState, useEffect } from "react";
import "./ChoosingSeat.css";
import NavbarBooking from "../../components/BookingPage/Header/NavbarBooking.js";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const ChoosingSeat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [goFlight, setGoFlight] = useState(null);
  const [returnFlight, setReturnFlight] = useState(null);
  const [seatReservation, setSeatReservation] = useState(null);
  const [departure_code, setDepartureCode] = useState(null);
  const [arrival_code, setArrivalCode] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seatGoPrice = {
    business: goFlight?.true_price_business || 0,
    economy: goFlight?.true_price_economy || 0,
  };

  const businessGoSeats = seatReservation?.seatsGoBusiness?.map((seat) => ({
    id: seat.seat_reservation_id,
    code: seat.seat_number,
    type: seat.seat_class,
    flight_id: seat.flight_id,
    status: seat.status,
    price: seatGoPrice.business
  })) || [];

  const economyGoSeats = seatReservation?.seatsGoEconomy?.map((seat) => ({
    id: seat.seat_reservation_id,
    code: seat.seat_number,
    type: seat.seat_class,
    flight_id: seat.flight_id,
    status: seat.status,
    price: seatGoPrice.economy
  })) || [];

  const seats = [...businessGoSeats, ...economyGoSeats];

  const toggleSeatSelection = (seatId) => {
    const seat = seats.find((s) => s.code === seatId);
    if (seat.status === "reserved") return; // Không làm gì nếu ghế đã được đặt
  
    setSelectedSeats((prev) => {
      const isSelected = prev.some((s) => s.code === seatId);
      if (isSelected) {
        // Loại bỏ ghế nếu đã được chọn trước đó
        return prev.filter((s) => s.code !== seatId);
      } else {
        // Thêm ghế vào danh sách đã chọn
        return [...prev, { id: seat.id ,code: seatId, flight_id: seat.flight_id, type: seat.type, price: seat.price }];
      }
    });
  };
  
  const calculateTotal = () =>
    selectedSeats.reduce((total, selectedSeat) => {
      const seat = seats.find((s) => s.code === selectedSeat.code);
      return total + (seat?.type === "Business" ? seatGoPrice.business : seatGoPrice.economy);
    }, 0);
  
  const getSeatClass = (seat) => {
    if (seat.status === "reserved") return "booked";
    if (selectedSeats.some((s) => s.code === seat.code)) return "selected";
    return seat.type; // Trả về `business` hoặc `economy`
  };

  useEffect(() => {
    const fetchFlightData = async () => {
      if (location.state) {
        console.log("State:", location.state);

        if (location.state.goFlight) {
          setGoFlight(location.state.goFlight);
        }
        if (location.state.returnFlight) {
          setReturnFlight(location.state.returnFlight);
        }
        if (location.state.seatReservation) {
          setSeatReservation(location.state.seatReservation);
        }
        setDepartureCode(location.state.departure_code);
        setArrivalCode(location.state.arrival_code);
      } else {
        setGoFlight(null);
        setReturnFlight(null);
        setSeatReservation(null);
      }
    };

    fetchFlightData();
  }, [location]);

  return (
    <div>
      <NavbarBooking />
      <div className="header-choosing">
        <Link to="/booking" style={{ textDecoration: "none" }}> <button className="circle-button">
          <span className="arrow">&lt;</span>
        </button> </Link>
        <span style={{ display: "inline", margin: "auto" }}>
          <p style={{ fontSize: "24px" }}>CHỌN CHỖ</p>
          <p style={{ color: "black" }}>{departure_code}-{arrival_code}                 ~                  {goFlight?.departure_time}</p>
        </span>
      </div>

      <div className="choosing-container">
        <main className="main-content">
          <section className="seat-map">
            <div className="legend">
              <span style={{ padding: "10px" }}><b>Business</b></span>
              <span>
                <div className="box businessEmpty"></div> <p style={{ margin: "0", padding: "10px" }}> Ghế trống</p>
              </span>
              <span>
                <div className="box businessSelected"></div> <p style={{ margin: "0", padding: "10px" }}> Đang chọn</p>
              </span>
              <span>
                <div className="box booked"></div> <p style={{ margin: "0", padding: "10px" }}> Đã đặt</p>
              </span>
            </div>
            <div className="legend">
              <span style={{ padding: "10px" }}><b>Economy</b></span>
              <span>
                <div className="box economyEmpty"></div> <p style={{ margin: "0", padding: "10px" }}> Ghế trống</p>
              </span>
              <span>
                <div className="box economySelected"></div> <p style={{ margin: "0", padding: "10px" }}> Đang chọn</p>
              </span>
              <span>
                <div className="box booked"></div> <p style={{ margin: "0", padding: "10px" }}> Đã đặt</p>
              </span>
            </div>

            <div className="plane-body">
              <h3>Business Class</h3>
              {Array.from({ length: Math.ceil(businessGoSeats.length / 10) }).map((_, rowIndex) => (
                <div key={rowIndex} className="plane-row">
                  <div className="seat-group left">
                    {businessGoSeats
                      .slice(rowIndex * 10, rowIndex * 10 + 5)
                      .map((seat) => (
                        <div
                          key={seat.code}
                          className={`seat ${getSeatClass(seat)}`}
                          onClick={() => toggleSeatSelection(seat.code)}
                        >
                          {seat.code}
                        </div>
                      ))}
                  </div>
                  <div className="aisle"></div>
                  <div className="seat-group right">
                    {businessGoSeats
                      .slice(rowIndex * 10 + 5, rowIndex * 10 + 10)
                      .map((seat) => (
                        <div
                          key={seat.code}
                          className={`seat ${getSeatClass(seat)}`}
                          onClick={() => toggleSeatSelection(seat.code)}
                        >
                          {seat.code}
                        </div>
                      ))}
                  </div>
                </div>
              ))}

              <h3>Economy Class</h3>
              {Array.from({ length: Math.ceil(economyGoSeats.length / 10) }).map((_, rowIndex) => (
                <div key={rowIndex} className="plane-row">
                  <div className="seat-group left">
                    {economyGoSeats
                      .slice(rowIndex * 10, rowIndex * 10 + 5)
                      .map((seat) => (
                        <div
                          key={seat.code}
                          className={`seat ${getSeatClass(seat)}`}
                          onClick={() => toggleSeatSelection(seat.code)}
                        >
                          {seat.code}
                        </div>
                      ))}
                  </div>
                  <div className="aisle"></div>
                  <div className="seat-group right">
                    {economyGoSeats
                      .slice(rowIndex * 10 + 5, rowIndex * 10 + 10)
                      .map((seat) => (
                        <div
                          key={seat.code}
                          className={`seat ${getSeatClass(seat)}`}
                          onClick={() => toggleSeatSelection(seat.code)}
                        >
                          {seat.code}
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
              <p style={{ fontSize: "20px" }}>{goFlight?.true_price_economy} $</p>
            </div>
            <div className="container-price">
              <p>Thương gia</p>
              <p style={{ fontSize: "20px" }}>{goFlight?.true_price_business} $</p>
            </div>
            <div className="total">
              <p>Tổng cộng:</p>
              <p style={{ fontSize: "24px" }}>{calculateTotal()} $</p>
            </div>
            <button onClick={() => navigate("/booking/infoClient", { state: { selectedSeats, total: calculateTotal() , goFlight} })} className="submit-button">
              Tiếp tục
            </button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ChoosingSeat;
