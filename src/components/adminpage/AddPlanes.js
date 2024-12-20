import { React, useState } from "react";
import "../../styles/adminpage/AddPlanes.css";

const AddPlanes = ({ onUpdate }) => {
  const [planeID, setPlaneID] = useState("");
  const [planeModel, setPlaneModel] = useState("");
  const [seatEconomy, setSeatEconomy] = useState(0);
  const [seatBusiness, setSeatBusiness] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8081/admin/createPlane", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plane_id: planeID,
          model: planeModel,
          total_seat: parseInt(seatEconomy) + parseInt(seatBusiness),
          seat_economy: seatEconomy,
          seat_business: seatBusiness,
        }),
      });
      if (res.ok) {
        const newPlane = {
          plane_id: planeID,
          model: planeModel,
          total_seat: parseInt(seatEconomy) + parseInt(seatBusiness),
          seat_economy: seatEconomy,
          seat_business: seatBusiness,
        };
        onUpdate(newPlane);
        alert("Thêm máy bay thành công");
        setPlaneID("");
        setPlaneModel("");
        setSeatEconomy(0);
        setSeatBusiness(0);
      } else {
        alert("Thêm máy bay thất bại");
      }
    } catch (error) {
      console.error(error);
      alert("Thêm máy bay thất bại");
    }
  };

  return (
    <div class="add-planes">
      <h2 style={{ textAlign: "center", marginTop: "0" }}>Thêm máy bay</h2>
      <form class="add-planes-form" onSubmit={handleSubmit}>
        <div className="planes-input">
          <label htmlFor="id">Mã máy bay </label>
          <input
            type="text"
            id="id"
            name="id"
            placeholder="Nhập mã máy bay"
            required
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
            onChange={(e) => setPlaneModel(e.target.value)}
          />
        </div>

        <div className="planes-input">
          <label htmlFor="seat-economy">Số ghế phổ thông </label>
          <input
            type="number"
            id="seat-economy"
            name="seat-economy"
            placeholder="Nhập số ghế phổ thông"
            min="0"
            onChange={(e) => setSeatEconomy(e.target.value)}
            required
          />
        </div>

        <div className="planes-input">
          <label htmlFor="seat-business">Số ghế thương gia </label>
          <input
            type="number"
            id="seat-business"
            name="seat-business"
            placeholder="Nhập số ghế thương gia"
            min="0"
            onChange={(e) => setSeatBusiness(e.target.value)}
            required
          />
        </div>
        <div className="planes-input">
          <label htmlFor="total-seat">Tổng số ghế: </label>
          <span>{parseInt(seatEconomy) + parseInt(seatBusiness)}</span>
        </div>

        <div className="planes-input">
          <button type="submit" className="button">
            Thêm máy bay
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlanes;
