import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../styles/FlightBooking.css';
import searchIcon from '../assets/image/search_icon.png';

const FlightBooking = () => {
  const [activeTab, setActiveTab] = useState('flight');
  const [selectedDate, setSelectedDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [tripType, setTripType] = useState('motchieu');

  return (
    <div className="booking-container">
      <div className="tabs">
        <button
          className={activeTab === 'flight' ? 'active' : ''}
          onClick={() => setActiveTab('flight')}
        >
          Đặt chuyến bay
        </button>
        <button
          className={activeTab === 'stopover' ? 'active' : ''}
          onClick={() => setActiveTab('stopover')}
        >
          Tra cứu / Hủy vé
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'flight' ? (
          <div className="flight-form">
            <div className="row">
              <div className="input-group">
                <input
                  type="text"
                  id="from"
                  name="from"
                  placeholder="Nơi đi"
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  id="to"
                  name="to"
                  placeholder="Nơi đến"
                />
              </div>
            </div>
            <div>
              <li><input type="radio" name="choice" value="motchieu" /> Một chiều </li>
              <li><input type="radio" name="choice" value="haichieu" /> Hai chiều </li>
            </div>
            <div className="row">
              <div className="input-group">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Ngày đi"
                  className="date-picker"
                />
              </div>
              <div className="input-group">
              <DatePicker
                  selected={returnDate}
                  onChange={(date) => setReturnDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Ngày về"
                  className="date-picker"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-group">
                <input
                  type="text"
                  id="num_ticket"
                  name="num_ticket"
                  placeholder="Số vé"
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  id="type_ticket"
                  name="type_ticket"
                  placeholder="Loại vé"
                />
              </div>
            </div>
            <div className="row">
              <button className="promo-button"><b>Khuyến mãi</b></button>
              <div className="search-container">
                <button className="search-button1"><b>Tìm chuyến bay</b>
                </button>
                <button className="search-button">
                <img src={searchIcon} alt="Search Icon"></img>
                </button> 
              </div>
            </div>
          </div>
        ) : (
          <div className="stopover-content">
            <p>Content for Stopover / Packages</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlightBooking;