import React from "react";
import "../../styles/adminpage/AddPlanes.css";

const AddPlanes = () => {
  const handlePositiveNumber = (e) => {
    if (e.target.value < 0) {
      e.target.value = 0;
    }
  };

  const handleTotalSeat = () => {
    const seatEconomy = document.getElementById("seat-economy").value;
    const seatBusiness = document.getElementById("seat-business").value;
    const totalSeat = document.getElementById("total-seat");
    totalSeat.textContent = Number(seatEconomy) + Number(seatBusiness);
  };

  const handleChange = (e) => {
    handlePositiveNumber(e);
    handleTotalSeat();
  };

  return (
    <div class="add-planes">
      <h2 style={{ textAlign: "center", marginTop: "0" }}>Thêm máy bay</h2>
      <form class="add-planes-form">
        <div className="planes-input">
          <label htmlFor="id">Mã định danh </label>
          <input type="text" id="id" name="id" placeholder="Nhập ID" required />
        </div>

        <div className="planes-input">
          <label htmlFor="model">Mẫu máy bay </label>
          <input
            type="text"
            id="model"
            name="model"
            placeholder="Nhập mẫu máy bay"
            required
          />
        </div>

        <div className="planes-input">
          <label htmlFor="seat-economy">Số ghế hạng phổ thông </label>
          <input
            type="number"
            id="seat-economy"
            name="seat-economy"
            placeholder="Nhập số ghế phổ thông"
            onChange={handleChange}
            required
          />
        </div>

        <div className="planes-input">
          <label htmlFor="seat-business">Số ghế hạng thương gia </label>
          <input
            type="number"
            id="seat-business"
            name="seat-business"
            placeholder="Nhập số ghế thương gia"
            onChange={handleChange}
            required
          />
        </div>

        <div className="planes-input">
          <label htmlFor="total-seat">Tổng số ghế: </label>
          <span id="total-seat"></span>
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
