import { React, useState, useEffect } from "react";
import "./AdminPlanes.css";
import AddPlanes from "../../components/adminpage/AddPlanes";
import EditPlane from "../../components/adminpage/EditPlane";

const AdminPlanes = () => {
  const [planes, setPlanes] = useState([]);
  const [isEditingPlane, setIsEditingPlane] = useState(null);

  useEffect(() => {
    const fetchPlanes = async () => {
      const res = await fetch("http://localhost:8081/admin/getPlanes", {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setPlanes(data);
      }
    };
    fetchPlanes();
  }, []);

  const handleUpdatePlane = (newPlane) => {
    setPlanes([...planes, newPlane]);
  };

  const handleEditPlane = (editedPlane) => {
    setPlanes(
      planes.map((plane) =>
        plane.plane_id === editedPlane.plane_id ? editedPlane : plane
      )
    );
    setIsEditingPlane(null);
  };

  const handleCancelEdit = () => {
    setIsEditingPlane(null);
  };

  const handleDeletePlane = async (plane_id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa máy bay này?")) {
      const res = await fetch(`http://localhost:8081/admin/removePlane`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plane_id: plane_id }),
      });
      if (res.ok) {
        setPlanes(planes.filter((plane) => plane.plane_id !== plane_id));
        alert("Xóa máy bay thành công");
      } else {
        alert("Xóa máy bay thất bại");
      }
    }
  };

  return (
    <div className="admin-planes">
      <AddPlanes onUpdate={handleUpdatePlane} />
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
                <td>{plane.plane_id}</td>
                <td>{plane.model}</td>
                <td>{plane.seat_economy}</td>
                <td>{plane.seat_business}</td>
                <td>{plane.total_seat}</td>
                <td>
                  <button onClick={() => setIsEditingPlane(plane)}>
                    Chỉnh sửa
                  </button>
                  <button onClick={() => handleDeletePlane(plane.plane_id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isEditingPlane && (
          <EditPlane
            plane={isEditingPlane}
            onCancel={handleCancelEdit}
            onEdit={handleEditPlane}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPlanes;
