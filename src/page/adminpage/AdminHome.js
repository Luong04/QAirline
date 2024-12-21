import { React, useState, useEffect } from "react";
import "./AdminHome.css";
import RevenueCard from "../../components/adminpage/RevenueCard";
import TicketCard from "../../components/adminpage/TicketCard";
import RevenueChart from "../../components/adminpage/RevenueChart";
import TicketChart from "../../components/adminpage/TicketChart";
import PieCard from "../../components/adminpage/PieCard";

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
        <div className="statistics-pie">
          <PieCard successTicket={3000} cancelTicket={1000} />
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
