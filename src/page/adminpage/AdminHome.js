import { React, useState, useEffect } from "react";
import "./AdminHome.css";
import RevenueCard from "../../components/adminpage/RevenueCard";
import TicketCard from "../../components/adminpage/TicketCard";
import RankTable from "../../components/adminpage/RankTable";
import RevenueChart from "../../components/adminpage/RevenueChart";
import TicketChart from "../../components/adminpage/TicketChart";
import { use } from "react";

const AdminHome = () => {
  const [revenueMonth, setRevenueMonth] = useState(0);
  const [revenueLastMonth, setRevenueLastMonth] = useState(0);
  const [ticketNumber, setTicketNumber] = useState(0);
  const [ticketLastMonth, setTicketLastMonth] = useState(0);
  const [revenueGrowth, setRevenueGrowth] = useState(0);
  const [ticketGrowth, setTicketGrowth] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setRevenueGrowth(
          ((revenueMonth - revenueLastMonth) / revenueLastMonth) * 100
        );
        setTicketGrowth(
          ((ticketNumber - ticketLastMonth) / ticketLastMonth) * 100
        );
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchData();
  }, []);

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
