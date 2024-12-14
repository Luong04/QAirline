import { React, useState } from "react";
import "../../styles/adminpage/AddFlights.css";
import { isBefore } from "date-fns";
import DatePicker from "react-datepicker";

const AddFlights = () => {
  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedArrival, setSelectedArrival] = useState(null);

  const handlePositiveNumber = (e) => {
    if (e.target.value < 0) {
      e.target.value = 0;
    }
  };

  const checkFlightStatus = () => {
    const now = new Date();

    if (!selectedDeparture || !selectedArrival) {
      return "";
    }

    if (
      isBefore(now, selectedDeparture) &&
      isBefore(now, selectedArrival) &&
      isBefore(selectedDeparture, selectedArrival)
    ) {
      return "Có thể lên lịch";
    }

    return "Vui lòng chọn lại ngày khởi hành và ngày đến";
  };

  return (
    <div class="add-flights">
      <h2 style={{ textAlign: "center", marginTop: "0" }}>Thêm chuyến bay</h2>
      <form class="add-flights-form">
        <div className="flights-input">
          <label htmlFor="flight-id">Mã chuyến bay </label>
          <input
            type="text"
            id="flight-id"
            name="flight-id"
            placeholder="Nhập mã chuyến bay"
            required
          />
        </div>
        <div className="flights-input">
          <label htmlFor="plane-id">Mã máy bay </label>
          <input
            type="text"
            id="plane-id"
            name="plane-id"
            placeholder="Nhập mã máy bay"
            required
          />
        </div>
        <div className="flights-input">
          <label htmlFor="from">Nơi khởi hành </label>
          <input
            type="text"
            id="from"
            name="from"
            placeholder="Nhập nơi khởi hành"
            required
          />
        </div>
        <div className="flights-input">
          <label htmlFor="to">Nơi đến </label>
          <input
            type="text"
            id="to"
            name="to"
            placeholder="Nhập nơi đến"
            required
          />
        </div>
        <div className="flights-input">
          <label htmlFor="departure">Ngày khởi hành </label>
          <DatePicker
            id="departure"
            selected={selectedDeparture}
            onChange={(date) => setSelectedDeparture(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="yyyy/MM/dd HH:mm:ss"
            placeholderText="Nhập ngày khởi hành"
            required
          />
        </div>
        <div className="flights-input">
          <label htmlFor="arrival">Ngày đến </label>
          <DatePicker
            id="arrival"
            selected={selectedArrival}
            onChange={(date) => setSelectedArrival(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="yyyy/MM/dd HH:mm:ss"
            placeholderText="Nhập ngày đến"
            required
          />
        </div>
        <div className="flights-input">
          <label htmlFor="price-eco">Giá vé phổ thông (VND) </label>
          <input
            type="number"
            id="price-eco"
            name="price-economy"
            placeholder="Nhập giá vé phổ thông"
            onChange={handlePositiveNumber}
            required
          />
        </div>
        <div className="flights-input">
          <label htmlFor="price-bus">Giá vé thương gia (VND) </label>
          <input
            type="number"
            id="price-bus"
            name="price-business"
            placeholder="Nhập giá vé thương gia"
            onChange={handlePositiveNumber}
            required
          />
        </div>
        <div className="flights-input">
          <span>Trạng thái: {checkFlightStatus()}</span>
        </div>
        <div className="flights-input">
          <button type="submit" className="button">
            Thêm chuyến bay
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFlights;
