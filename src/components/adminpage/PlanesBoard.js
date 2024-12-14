import { React, useState } from "react";
import "../../styles/adminpage/PlanesBoard.css";

const PlanesBoard = () => {
  const [planes, setPlanes] = useState([
    {
      id: "1",
      model: "Airbus A320",
      seatEconomy: 180,
      seatBusiness: 20,
      totalSeat: 200,
    },
    {
      id: "2",
      model: "Boeing 777",
      seatEconomy: 300,
      seatBusiness: 30,
      totalSeat: 330,
    },
    {
      id: "3",
      model: "Airbus A350",
      seatEconomy: 250,
      seatBusiness: 30,
      totalSeat: 280,
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa máy bay này?")) {
      const updatedPlanes = planes.filter((plane) => plane.id !== id);
      setPlanes(updatedPlanes);
    }
  };

  return (
    <div class="planes-board">
      <h2 style={{ marginTop: "0" }}>Danh sách máy bay</h2>
      <table class="planes-table">
        <thead>
          <tr>
            <th>Mã máy bay</th>
            <th>Mẫu máy bay</th>
            <th>Số ghế hạng phổ thông</th>
            <th>Số ghế hạng thương gia</th>
            <th>Tổng số ghế</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {planes.map((plane) => (
            <tr>
              <td>{plane.id}</td>
              <td>{plane.model}</td>
              <td>{plane.seatEconomy}</td>
              <td>{plane.seatBusiness}</td>
              <td>{plane.totalSeat}</td>
              <td>
                <button>Chỉnh sửa</button>
                <button onClick={() => handleDelete(plane.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanesBoard;
