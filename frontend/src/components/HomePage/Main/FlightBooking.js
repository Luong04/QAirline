import React, { useState } from "react";
import { Link } from "react-router-dom"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './FlightBooking.css';
import searchIcon from '../../../assets/image/search_icon.png';

const FlightBooking = () => {
  const [activeTab, setActiveTab] = useState('flight');
  const [selectedDate, setSelectedDate] = useState(null);

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
              
              <div className="input-group">
              <label>Nơi đi</label>
              <input
                type="text"
                id="from"
                name="from"
                placeholder="Nơi đi"
              /></div>
              <div className="input-group">
              <label>Nơi đến</label>
                <input
                  type="text"
                  id="to"
                  name="to"
                  placeholder="Nơi đến"
                />
              </div>
              <div className="input-group">
              <label>Ngày đi</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Ngày đi"
                  className="date-picker"
                />
            </div>
            <div className="row">
              <div><Link to="/booking" className="search-container">
                <button className="search-button1"><b>Tìm chuyến bay</b>
                </button>
                <button className="search-button">
                  <img src={searchIcon} alt="Search Icon"></img>
                </button></Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="stopover-content">
            <div className="input-group">
              <label>Mã vé</label>
              <input
                type="text"
                id="ticketCode"
                name="ticketcode"
                placeholder="Nhập mã vé"
              /></div>
            <div className="input-group">
              <label>Số điện thoại</label><input
                type="text"
                id="phone"
                name="phone"
                placeholder="Nhập số điện thoại"
              /></div>
            <div className="input-group">
              <label>Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Nhập email"
              /></div>
            <div>
              <Link to="/checkticket" className="promo-button">Tra cứu</Link>
            </div>


          </div>
        )}
      </div>
    </div>
  );
}

export default FlightBooking;