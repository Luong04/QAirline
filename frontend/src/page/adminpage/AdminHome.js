import React from "react";
import "./AdminHome.css";
import RevenueCard from "../../components/adminpage/RevenueCard";
import TicketCard from "../../components/adminpage/TicketCard";
import RankTable from "../../components/adminpage/RankTable";
import RevenueChart from "../../components/adminpage/RevenueChart";
import TicketChart from "../../components/adminpage/TicketChart";

const AdminHome = () => {
  return (
    <div className="admin-home">
      <div className="statistics">
        <div className="statistics-card">
          <RevenueCard />
          <TicketCard />
        </div>
        <div className="statistics-table">
          <RankTable />
        </div>
      </div>
      <div className="chart">
        <RevenueChart />
        <TicketChart />
      </div>
    </div>
  );
};

export default AdminHome;
