import React, { useState, useEffect } from "react";
import "./AdminHome.css";
import RevenueCard from "../../components/adminpage/RevenueCard";
import TicketCard from "../../components/adminpage/TicketCard";
import RankTable from "../../components/adminpage/RankTable";
import RevenueChart from "../../components/adminpage/RevenueChart";
import TicketChart from "../../components/adminpage/TicketChart";
import axios from "axios";

const AdminHome = () => {
  const [monthlyData, setMonthlyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      const apiUrl = "http://localhost:8081/admin/getMonthlyTotal?date=";
      const months = [
        "2024-01-01",
        "2024-02-01",
        "2024-03-01",
        "2024-04-01",
        "2024-05-01",
        "2024-06-01",
        "2024-07-01",
        "2024-08-01",
        "2024-09-01",
        "2024-10-01",
        "2024-11-01",
        "2024-12-01",
      ];

      const allData = {
        totalNumberOfTicketBooked: [],
        totalNumberOfTicketCancelled: [],
        totalRevenueFromBooking: [],
        totalAmountPayBack: [],
        totalFinalRevenue: [],
      };

      try {
        for (const month of months) {
          const response = await axios.get(`${apiUrl}${month}`);
          const { totals } = response.data;
          allData.totalNumberOfTicketBooked.push(totals.totalNumberOfTicketBooked);
          allData.totalNumberOfTicketCancelled.push(
            totals.totalNumberOfTicketCancelled
          );
          allData.totalRevenueFromBooking.push(totals.totalRevenueFromBooking);
          allData.totalAmountPayBack.push(totals.totalAmountPayBack);
          allData.totalFinalRevenue.push(totals.totalFinalRevenue);
        }
        setMonthlyData(allData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyData();
  }, []);

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (!monthlyData) {
    return <p>Không thể tải dữ liệu.</p>;
  }

  const ticketNumber = monthlyData.totalNumberOfTicketBooked.slice(-1)[0]; // Vé bán tháng này
  const ticketLastMonth = monthlyData.totalNumberOfTicketBooked.slice(-2, -1)[0]; // Vé bán tháng trước
  const growth =
    ticketLastMonth > 0
      ? ((ticketNumber - ticketLastMonth) / ticketLastMonth) * 100
      : 0; // Tăng trưởng so với tháng trước

  const revenue = monthlyData.totalFinalRevenue.slice(-1)[0]; // Vé bán tháng này
  const revenueLastMonth = monthlyData.totalFinalRevenue.slice(-2, -1)[0]; // Vé bán tháng trước
  const revenue_growth =
    revenueLastMonth > 0
      ? ((revenue - revenueLastMonth) / revenueLastMonth) * 100
      : 0; // Tăng trưởng so với tháng trước

  const roundedGrowth = growth.toFixed(2);
  const roundedRevenueGrowth = revenue_growth.toFixed(2);

  return (
    <div className="admin-home">
      <div className="statistics">
        <div className="statistics-card">
          <RevenueCard revenue={revenue} growth={roundedRevenueGrowth} />
          <TicketCard ticketNumber={ticketNumber} growth={roundedGrowth} />
        </div>
        <div className="statistics-table">
          <RankTable />
        </div>
      </div>
      <div className="chart">
        <RevenueChart monthlyRevenueData={monthlyData.totalRevenueFromBooking} />
        <TicketChart
          ticketBookedData={monthlyData.totalNumberOfTicketBooked}
          ticketCancelledData={monthlyData.totalNumberOfTicketCancelled}
        />
      </div>
    </div>
  );
};

export default AdminHome;
