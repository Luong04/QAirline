import React from "react";
import "../../styles/adminpage/TicketCard.css";
import Ticket from "../../assets/image/airplane-ticket.png";
import Increase from "../../assets/image/increase.png";
import Decrease from "../../assets/image/decrease.png";

const TicketCard = ({ ticketNumber, growth }) => {
  return (
    <div className="ticket-card">
      <h3 className="ticket-card-title">Tổng số vé bán được tháng này</h3>
      <div className="ticket-card-number">
        <img src={Ticket} alt="Ticket" className="ticket-logo" />
        <span>{ticketNumber} vé</span>
      </div>
      <div className="ticket-card-growth">
        <img src={growth > 0 ? Increase : Decrease} className="growth-logo" />
        <span>{Math.abs(growth)}% so với tháng trước</span>
      </div>
    </div>
  );
};

export default TicketCard;
