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

const TicketChart = () => {
  const data = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
    ], // Months
    datasets: [
      {
        label: "Vé phổ thông",
        data: [120, 150, 180, 200, 220, 250, 300], // Replace with actual data
        backgroundColor: "rgba(37, 99, 235, 0.6)", // Tailwind Blue 500
        borderColor: "rgba(37, 99, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Vé thương gia",
        data: [80, 100, 90, 120, 140, 160, 180], // Replace with actual data
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
        stacked: true, // Enable stacking on the x-axis
        title: {
          display: true,
          text: "Tháng",
        },
      },
      y: {
        stacked: true, // Enable stacking on the y-axis
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
