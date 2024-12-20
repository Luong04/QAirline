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
  const [selectedSeats, setSelectedSeats] = useState([]);


  const seatGoPrice = {
    business: goFlight?.true_price_business || 0,
    economy: goFlight?.true_price_economy || 0,
  };

  const seatReturnPrice = {
    business: returnFlight?.true_price_business || 0,
    economy: returnFlight?.true_price_economy || 0,
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

  const businessReturnSeats = seatReservation?.seatsReturnBusiness?.map((seat) => ({
    id: seat.seat_reservation_id,
    code: seat.seat_number,
    type: seat.seat_class,
    flight_id: seat.flight_id,
    status: seat.status,
    price: seatReturnPrice.business
  })) || [];

  const economyReturnSeats = seatReservation?.seatsReturnEconomy?.map((seat) => ({
    id: seat.seat_reservation_id,
    code: seat.seat_number,
    type: seat.seat_class,
    flight_id: seat.flight_id,
    status: seat.status,
    price: seatReturnPrice.economy
  })) || [];

  const seats = [...businessGoSeats, ...economyGoSeats, ...businessReturnSeats, ...economyReturnSeats];

  const toggleSeatSelection = (seatId) => {
    const seat = seats.find((s) => s.id === seatId);
    if (seat.status === "reserved") return; // Không làm gì nếu ghế đã được đặt

    setSelectedSeats((prev) => {
      const isSelected = prev.some((s) => s.id === seatId);
      if (isSelected) {
        // Loại bỏ ghế nếu đã được chọn trước đó
        return prev.filter((s) => s.id !== seatId);
      } else {
        // Thêm ghế vào danh sách đã chọn
        return [...prev, { id: seatId, code: seat.code, flight_id: seat.flight_id, type: seat.type, price: seat.price }];
      }
    });
  };

  const calculateTotal = () =>
    selectedSeats.reduce((total, selectedSeat) => {
      const seat = seats.find((s) => s.id === selectedSeat.id);
      return total + (seat?.type === "Business" ? (seat?.flight_id === goFlight?.flight_id ? seatGoPrice.business : seatReturnPrice.business) : (seat?.flight_id === goFlight?.flight_id ? seatGoPrice.economy : seatReturnPrice.economy));
    }, 0);

  const getSeatClass = (seat) => {
    if (seat.status === "reserved") return "booked";
    if (selectedSeats.some((s) => s.id === seat.id)) return "selected";
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
        </span>
      </div>

      <div className="choosing-container">
        <main className="main-content">
          <section className="seat-map">
            <span style={{ display: "inline" }}>
              <h3 style={{color: "#046262"}}>CHIỀU ĐI</h3>
              <p style={{ color: "black", fontWeight:"bold" }}>   {goFlight?.departure_code}-{goFlight?.arrival_code}      ~        {goFlight?.departure_time}</p>
            </span>
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
              <h3>HẠNG THƯƠNG GIA</h3>
              {Array.from({ length: Math.ceil(businessGoSeats.length / 10) }).map((_, rowIndex) => (
                <div key={rowIndex} className="plane-row">
                  <div className="seat-group left">
                    {businessGoSeats
                      .slice(rowIndex * 10, rowIndex * 10 + 5)
                      .map((seat) => (
                        <div
                          key={seat.id}
                          className={`seat ${getSeatClass(seat)}`}
                          onClick={() => toggleSeatSelection(seat.id)}
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
                          key={seat.id}
                          className={`seat ${getSeatClass(seat)}`}
                          onClick={() => toggleSeatSelection(seat.id)}
                        >
                          {seat.code}
                        </div>
                      ))}
                  </div>
                </div>
              ))}

              <h3>HẠNG PHỔ THÔNG</h3>
              {Array.from({ length: Math.ceil(economyGoSeats.length / 10) }).map((_, rowIndex) => (
                <div key={rowIndex} className="plane-row">
                  <div className="seat-group left">
                    {economyGoSeats
                      .slice(rowIndex * 10, rowIndex * 10 + 5)
                      .map((seat) => (
                        <div
                          key={seat.id}
                          className={`seat ${getSeatClass(seat)}`}
                          onClick={() => toggleSeatSelection(seat.id)}
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
                          key={seat.id}
                          className={`seat ${getSeatClass(seat)}`}
                          onClick={() => toggleSeatSelection(seat.id)}
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
            <div className="info-goFlight">
              <h2> CHIỀU ĐI </h2>
              <div className="row-price"><div className="container-price">
                <p>Phổ thông</p>
                <p>{goFlight?.true_price_economy} $</p>
              </div>
                <div className="container-price">
                  <p>Thương gia</p>
                  <p>{goFlight?.true_price_business} $</p>
                </div></div>
              <h2>
                Mã ghế:{" "}
                <span id="selected-seats">
                  {(Object.values(selectedSeats).length > 0)
                    ? Object.values(selectedSeats)
                      .filter(seat => seat.flight_id === goFlight.flight_id) // Lọc theo `flight_id`
                      .map(seat => seat.code) // Trích xuất `code`
                      .join(", ") // Ghép các mã lại thành chuỗi
                    : "None"}
                </span>


              </h2>
            </div>
            <div>
              {returnFlight && (
                <div className="info-goFlight">
                  <h2> CHIỀU VỀ </h2>
                  <div className="row-price"><div className="container-price">
                    <p>Phổ thông</p>
                    <p>{returnFlight?.true_price_economy} $</p>
                  </div>
                    <div className="container-price">
                      <p>Thương gia</p>
                      <p>{returnFlight?.true_price_business} $</p>
                    </div></div>
                  <h2>
                    Mã ghế:{" "}
                    <span id="selected-seats">
                      {(Object.values(selectedSeats).length > 0)
                        ? Object.values(selectedSeats)
                          .filter(seat => seat.flight_id === returnFlight.flight_id) // Lọc theo `flight_id`
                          .map(seat => seat.code) // Trích xuất `code`
                          .join(", ") // Ghép các mã lại thành chuỗi
                        : "None"}
                    </span>


                  </h2>
                </div>
              )}
            </div>

            <div className="total">
              <h3>
                Số lượng ghế:{" "}
                <span id="seat-count">
                  {selectedSeats.length}
                </span>
              </h3>
              <h3>Tổng cộng: {calculateTotal().toFixed(3)} $</h3>
            </div>
            <button onClick={() => navigate("/booking/infoClient", { state: { selectedSeats, total: calculateTotal().toFixed(3), goFlight, returnFlight } })} className="submit-button">
              Tiếp tục
            </button>
          </section>
        </main>
      </div>
      {//phần khứ hồi
      }
      <div>
        {returnFlight && (
          <div className="choosing-container">
            <main className="main-content">

              <section className="seat-map">
                <span style={{ display: "inline" }}>
                  <h3 style={{color: "#046262"}}>CHIỀU VỀ</h3>
                  <p style={{ color: "black", fontWeight: "bold" }}>{returnFlight?.departure_code}-{returnFlight?.arrival_code}                 ~                  {returnFlight?.departure_time}</p> </span>
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
                  <h3>HẠNG THƯƠNG GIA</h3>
                  {Array.from({ length: Math.ceil(businessReturnSeats.length / 10) }).map((_, rowIndex) => (
                    <div key={rowIndex} className="plane-row">
                      <div className="seat-group left">
                        {businessReturnSeats
                          .slice(rowIndex * 10, rowIndex * 10 + 5)
                          .map((seat) => (
                            <div
                              key={seat.id}
                              className={`seat ${getSeatClass(seat)}`}
                              onClick={() => toggleSeatSelection(seat.id)}
                            >
                              {seat.code}
                            </div>
                          ))}
                      </div>
                      <div className="aisle"></div>
                      <div className="seat-group right">
                        {businessReturnSeats
                          .slice(rowIndex * 10 + 5, rowIndex * 10 + 10)
                          .map((seat) => (
                            <div
                              key={seat.id}
                              className={`seat ${getSeatClass(seat)}`}
                              onClick={() => toggleSeatSelection(seat.id)}
                            >
                              {seat.code}
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}

                  <h3>HẠNG PHỔ THÔNG</h3>
                  {Array.from({ length: Math.ceil(economyReturnSeats.length / 10) }).map((_, rowIndex) => (
                    <div key={rowIndex} className="plane-row">
                      <div className="seat-group left">
                        {economyReturnSeats
                          .slice(rowIndex * 10, rowIndex * 10 + 5)
                          .map((seat) => (
                            <div
                              key={seat.id}
                              className={`seat ${getSeatClass(seat)}`}
                              onClick={() => toggleSeatSelection(seat.id)}
                            >
                              {seat.code}
                            </div>
                          ))}
                      </div>
                      <div className="aisle"></div>
                      <div className="seat-group right">
                        {economyReturnSeats
                          .slice(rowIndex * 10 + 5, rowIndex * 10 + 10)
                          .map((seat) => (
                            <div
                              key={seat.id}
                              className={`seat ${getSeatClass(seat)}`}
                              onClick={() => toggleSeatSelection(seat.id)}
                            >
                              {seat.code}
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </main>
          </div>
        )}
      </div>


    </div>
  );
};

export default ChoosingSeat;
