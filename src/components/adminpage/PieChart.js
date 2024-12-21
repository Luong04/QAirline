import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(ArcElement, Legend, Tooltip);

const PieChart = () => {
  // Dữ liệu cho biểu đồ
  const data = {
    labels: ["Số vé hoàn thành", "Số vé bị huỷ"], // Các nhãn
    datasets: [
      {
        label: "Số vé",
        data: [70, 30], // Số vé đã bán và chưa bán
        backgroundColor: ["#36A2EB", "#FF6384"], // Màu của các phần
        borderWidth: 1, // Độ rộng của đường viền
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
  };

  return (
    <div className="pie-chart">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
