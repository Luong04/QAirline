import React, { useState } from "react";
import "./InfoFlight.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";


const InfoFlight = () => {
    const [isRoundTrip, setIsRoundTrip] = useState(false); // State để theo dõi chế độ Một chiều/Khứ hồi
    const [selectedDate, setSelectedDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    return (
        <div className="container-infor">
            <div className="options">
                <label>
                    <input
                        type="radio"
                        name="trip"
                        checked={!isRoundTrip}
                        onChange={() => setIsRoundTrip(false)} // Chuyển sang "Một chiều"
                    />
                    Một chiều
                </label>
                <label>
                    <input
                        type="radio"
                        name="trip"
                        checked={isRoundTrip}
                        onChange={() => setIsRoundTrip(true)} // Chuyển sang "Khứ hồi"
                    />
                    Khứ hồi
                </label>
            </div>
            <div className="container-route">
                <div className="infor-left">
                    <div className="form-group">
                        <label htmlFor="departure">Điểm đi</label>
                        <input type="text" id="departure" placeholder="Kỳ Anh" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="destination">Điểm đến</label>
                        <input type="text" id="destination" placeholder="Hà Tĩnh" />
                    </div>
                </div>
                <div className="infor-right">
                    <div className="form-group">
                        <label htmlFor="date">Ngày đi</label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Ngày đi"
                            className="date-picker1"
                        />
                    </div>
                    <div className="form-group" style={{ visibility: isRoundTrip ? "visible" : "hidden" }}>
                        <label htmlFor="return-date">Ngày về</label>
                        <DatePicker
                            selected={returnDate}
                            onChange={(date) => setReturnDate(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Ngày về"
                            className="date-picker1"
                        />
                    </div>
                    <button className="btn-search">Tìm kiếm</button>
                </div>
            </div>
        </div>
    );
};

export default InfoFlight;
