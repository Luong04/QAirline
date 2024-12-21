import React from "react";
import "../../styles/adminpage/PieCard.css";
import PieChart from "./PieChart";
import SuccessTicket from "../../assets/image/invoice.png";
import CancelTicket from "../../assets/image/delete.png";
import Percent from "../../assets/image/pie-chart.png";

const PieCard = ({ successTicket, cancelTicket }) => {
  return (
    <div className="pie-card">
      <div className="pie-card-info">
        <h3 className="pie-card-title">
          Số vé hoàn thành và vé bị huỷ tháng này
        </h3>
        <div className="pie-card-content">
          <img
            src={SuccessTicket}
            alt="SuccessTicket"
            className="ticket-logo"
          />
          <span>{successTicket} vé</span>{" "}
        </div>
        <div className="pie-card-content">
          <img src={Percent} alt="Percent" className="ticket-logo" />
          <span>
            {(successTicket / (successTicket + cancelTicket)) * 100} %
          </span>
        </div>
        <div className="pie-card-content">
          <img src={CancelTicket} alt="Cancel" className="ticket-logo" />
          <span>{cancelTicket} vé</span>
        </div>
        <div className="pie-card-content">
          <img src={Percent} alt="Percent" className="ticket-logo" />
          <span>{(cancelTicket / (successTicket + cancelTicket)) * 100} %</span>
        </div>
      </div>
      <div>
        <PieChart />
      </div>
    </div>
  );
};

export default PieCard;
