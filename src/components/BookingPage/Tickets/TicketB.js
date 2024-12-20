import React from "react";
import "./TicketB.css"; // Sửa đường dẫn

const TicketB = ({ 
  name, 
  ticketCode, 
  departure, 
  destination, 
  departureTime, 
  arrivalTime, 
  seat, 
  price,
  classType
}) => {
  return (
    <div className="ticket-container">
      <section className="left-ticket">
        <div className="header-ticket">
          <p style={{ margin: "0 0 0 30px", flex: "1" }}>BOARDING PASS</p>
          <span style={{ marginRight: "20px" }}>{classType}</span>
        </div>
        <div className="body-ticket">
          <div className="row-ticket">
            <div className="content-ticket" style={{ flex: 2.5 }}><span>Họ tên</span>{name}</div>
            <div className="content-ticket"><span>Mã vé</span>{ticketCode}</div>
          </div>
          <div className="row-ticket">
            <div className="content-ticket" style={{ flex: 2.5 }}><span>Nơi đi</span>{departure}<span style={{color: "black", fontSize: "13px"}}>{departureTime}</span></div>
            <div className="content-ticket"><span>Nơi đến</span>{destination}<span style={{color: "black", fontSize: "13px"}}>{arrivalTime}</span></div>
          </div>
          <div className="row-ticket">
            <div className="content-ticket" style={{ flex: 2.5 }}><span>Mã ghế</span>{seat}</div>
            <div className="content-ticket"><span>Giá vé</span>{price} $</div>
          </div>
        </div>
      </section>
      <section className="right-ticket">
        <div className="header-ticket">
          <p style={{ margin: "0 auto" }}>QAIRLINE</p>
        </div>
        <div className="body-ticket">
          <div className="content-ticket1"><span style={{ display: "block" }}>Họ tên</span>{name}</div>
          <div className="content-ticket1"><span>Mã vé</span>{ticketCode}</div>
          <div className="content-ticket1"><span>Mã ghế</span>{seat}</div>
          <div className="content-ticket1"><span>Giá vé</span>{price} $</div>
        </div>
      </section>
    </div>
  );
};

export default TicketB;