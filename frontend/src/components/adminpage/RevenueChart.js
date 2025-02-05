import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const RevenueChart = () => {
  // Dữ liệu cho biểu đồ
  const data = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"], // Các tháng
    datasets: [
      {
        label: "Doanh thu (triệu VND)",
        data: [120, 150, 200, 180, 220, 300], // Doanh thu mỗi tháng
        borderColor: "rgba(75, 192, 192, 1)", // Màu đường
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Màu nền dưới đường
        borderWidth: 2, // Độ rộng của đường
        pointBackgroundColor: "rgba(75, 192, 192, 1)", // Màu các điểm trên đường
        pointBorderColor: "#fff",
        tension: 0.3, // Độ cong của đường (0 là đường thẳng)
      },
    ],
  };

  // Tùy chỉnh biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Vị trí chú thích
      },
      tooltip: {
        enabled: true, // Hiển thị tooltip khi trỏ chuột
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tháng",
        },
      },
      y: {
        beginAtZero: true, // Trục Y bắt đầu từ 0
        title: {
          display: true,
          text: "Doanh thu (triệu VND)",
        },
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
      <h2>Biểu đồ doanh thu theo tháng</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default RevenueChart;
