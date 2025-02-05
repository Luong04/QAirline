import React from "react";
import "../../styles/adminpage/RevenueCard.css";
import Money from "../../assets/image/money.png";
import Increase from "../../assets/image/increase.png";
import Decrease from "../../assets/image/decrease.png";

const RevenueCard = () => {
  return (
    <div className="revenue-card">
      <h3 className="revenue-card-title">Doanh thu tháng này</h3>
      <div className="revenue-card-revenue">
        <img src={Money} alt="Money" className="money-logo" />
        <span>1,000,000,000 VND</span>
      </div>
      <div className="revenue-card-growth">
        <img src={Increase} alt="Increase" className="growth-logo" />
        <span>30% so với tháng trước</span>
      </div>
    </div>
  );
};

export default RevenueCard;
