import { React, useState, useEffect } from "react";
import "../../styles/adminpage/PlanesBoard.css";
import EditPlane from "./EditPlane";
import axios from "axios";

const PlanesBoard = ({ planes, setPlanes }) => {

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const token = localStorage.getItem("role"); // Lấy token từ localStorage
        const res = await axios.get("http://localhost:8081/api/admin/getPlane", {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token qua headers
          },
        });
        if (res.data.planes) {
          setPlanes(res.data.planes);
        }
      } catch (err) {
        console.error("Error fetching planes:", err);
      }
    };
    fetchPlanes();
  }, [setPlanes]);

  const [isEditingPlane, setIsEditingPlane] = useState(null);

  const handleCancel = () => {
    setIsEditingPlane(null);
  };

  const handleDelete = async (plane_id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa máy bay này?")) {
      
      const token = localStorage.getItem("role");
      const res = await axios.post(
        "http://localhost:8081/api/admin/removePlane",
        {
          plane_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setPlanes(planes.filter((plane) => plane.plane_id !== plane_id));
        alert("Xóa máy bay thành công");
      } else {
        alert("Xóa máy bay thất bại");
      }
    }
  };

  return (
    <div className="planes-board">
      <h2 style={{ marginTop: "0" }}>Danh sách máy bay</h2>
      <table className="planes-table">
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
            <tr key={plane.plane_id}>
              <td>{plane.plane_id}</td>
              <td>{plane.model}</td>
              <td>{plane.seat_economy}</td>
              <td>{plane.seat_business}</td>
              <td>{plane.total_seat}</td>
              <td>
                <button onClick={() => setIsEditingPlane(plane)}>
                  Chỉnh sửa
                </button>
                <button onClick={() => handleDelete(plane.plane_id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditingPlane && (
        <EditPlane plane={isEditingPlane} onCancel={handleCancel} setPlanes={setPlanes} />
      )}
    </div>
  );
};

export default PlanesBoard;
