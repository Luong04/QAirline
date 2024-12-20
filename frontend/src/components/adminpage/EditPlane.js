import { React, useState } from "react";
import "../../styles/adminpage/EditPlane.css";
import axios from "axios";

const EditPlane = ({ plane, onCancel, setPlanes }) => {
  const [planeID, setPlaneID] = useState(plane.plane_id);
  const [planeModel, setPlaneModel] = useState(plane.model);
  const [seatEconomy, setSeatEconomy] = useState(plane.seat_economy);
  const [seatBusiness, setSeatBusiness] = useState(plane.seat_business);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("Bạn có chắc chắn muốn cập nhật máy bay này?")) {
      try {
        const token = localStorage.getItem("role");
        const res = await axios.post(
          "http://localhost:8081/api/admin/updatePlane",
          {
            plane_id: planeID,
            model: planeModel,
            total_seat: parseInt(seatEconomy) + parseInt(seatBusiness),
            seat_economy: seatEconomy,
            seat_business: seatBusiness,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          alert("Cập nhật máy bay thành công");
          // Gọi lại API để lấy danh sách máy bay mới
          const updatedPlanesRes = await axios.get(
            "http://localhost:8081/api/admin/getPlane",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (updatedPlanesRes.data.planes) {
            setPlanes(updatedPlanesRes.data.planes); // Cập nhật danh sách máy bay
          }
          onCancel();
        } else {
          alert("Cập nhật máy bay thất bại");
        }
      } catch (error) {
        console.error(error);
        alert("Cập nhật máy bay thất bại");
      }
    }
  };

  return (
    <div className="overlay">
      <div className="edit-plane">
        <h2 style={{ marginTop: "0", textAlign: "center" }}>
          Chỉnh sửa máy bay
        </h2>
        <form className="edit-plane-form" onSubmit={handleSubmit}>
          <div className="planes-input">
            <label htmlFor="id">Mã máy bay </label>
            <input
              type="text"
              id="id"
              name="id"
              placeholder="Nhập mã máy bay"
              required
              value={planeID}
              onChange={(e) => setPlaneID(e.target.value)}
            />
          </div>

          <div className="planes-input">
            <label htmlFor="model">Mẫu máy bay </label>
            <input
              type="text"
              id="model"
              name="model"
              placeholder="Nhập mẫu máy bay"
              required
              value={planeModel}
              onChange={(e) => setPlaneModel(e.target.value)}
            />
          </div>

          <div className="planes-input">
            <label htmlFor="seatEconomy">Số ghế hạng thương gia </label>
            <input
              type="number"
              id="seat-economy"
              name="seat-economy"
              placeholder="Nhập số ghế thương gia"
              min="0"
              required
              value={seatEconomy}
              onChange={(e) => setSeatEconomy(e.target.value)}
            />
          </div>

          <div className="planes-input">
            <label htmlFor="seatBusiness">Số ghế hạng phổ thông </label>
            <input
              type="number"
              id="seat-business"
              name="seat-business"
              placeholder="Nhập số ghế phổ thông"
              min="0"
              required
              value={seatBusiness}
              onChange={(e) => setSeatBusiness(e.target.value)}
            />
          </div>
          <div className="planes-input">
            <label htmlFor="total-seat">Tổng số ghế: </label>
            <span>{parseInt(seatEconomy) + parseInt(seatBusiness)}</span>
          </div>

          <div className="edit-plane-buttons">
            <button type="submit" className="edit-plane-button">
              Lưu
            </button>
            <button
              type="button"
              className="cancel-plane-button"
              onClick={onCancel}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlane;
