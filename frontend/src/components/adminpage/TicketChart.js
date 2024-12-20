import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required modules for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TicketChart = ({ ticketBookedData, ticketCancelledData }) => {
  const data = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Số vé được đặt",
        data: ticketBookedData, // Data from props
        backgroundColor: "rgba(37, 99, 235, 0.6)", // Tailwind Blue 500
        borderColor: "rgba(37, 99, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Số vé bị hủy",
        data: ticketCancelledData, // Data from props
        backgroundColor: "rgba(249, 115, 22, 0.6)", // Tailwind Orange 500
        borderColor: "rgba(249, 115, 22, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Tháng",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Số vé bán",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      style={{
        boxSizing: "border-box",
        padding: "1rem",
        backgroundColor: "white",
        width: "49%",
        borderRadius: "1rem",
      }}
    >
      <h2>Biểu đồ tổng số vé bán theo tháng</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TicketChart;
