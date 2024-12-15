import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './FlightBooking.css';
import searchIcon from '../../../assets/image/search_icon.png';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from 'moment-timezone';
import Autosuggest from 'react-autosuggest'; // Import thư viện Autosuggest

const FlightBooking = () => {
  const [activeTab, setActiveTab] = useState('flight');
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [suggestionsFrom, setSuggestionsFrom] = useState([]); // Để lưu gợi ý cho "Nơi đi"
  const [suggestionsTo, setSuggestionsTo] = useState([]); // Để lưu gợi ý cho "Nơi đến"

  const getSuggestionValue = (suggestion) => suggestion;
  // Hàm lấy gợi ý từ backend cho "Nơi đi" và "Nơi đến"
  const getSuggestions = async (value, type) => {
    if (!value) {
        if (type === 'from') {
            setSuggestionsFrom([]);
        } else {
          setSuggestionsTo([]);
        }
        return;
    }

    try {
        const response = await axios.get(`http://localhost:8081/api/getPlaces`, {
            params: { query: value }
        });

        if (type === 'from') {
            setSuggestionsFrom(response.data); // Cập nhật gợi ý cho "Nơi đi"
        } else {
            setSuggestionsTo(response.data); // Cập nhật gợi ý cho "Nơi đến"
        }
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
  };

  // Hàm xử lý khi người dùng nhập liệu
  const onChange = (event, { newValue }, type) => {
    if (type === 'from') {
        setFrom(newValue); // Cập nhật giá trị "Nơi đi"
    } else {
        setTo(newValue); // Cập nhật giá trị "Nơi đến"
    }
  };

  // Hàm render suggestion item
  const renderSuggestion = (suggestion) => (
    <div>{suggestion}</div> // Hiển thị mỗi gợi ý
  );

  // Hàm xử lý khi lấy gợi ý từ API
  const onSuggestionsFetchRequested = ({ value }, type) => {
    getSuggestions(value, type); // Gọi API để lấy gợi ý
  };


  const handleSearchFlight = async () => {
    if (!from || !to || !selectedDate) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      const localDate = moment(selectedDate).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD');
      const response = await axios.post('http://localhost:8081/api/findFlight', {
        departure_place: from,
        arrival_place: to,
        departure_date: localDate,
        is_one_way: "true"
      });
      navigate('/booking', { state: { flights: response.data, from, to, selectedDate } });
    } catch (error) {
      console.error('Error fetching flights:', error.response?.data || error.message);
      alert('Không tìm thấy chuyến bay phù hợp!');
    }
  };

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
          Thông tin đặt vé
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'flight' ? (
          <div className="flight-form">
            <div className="input-group" style={{ position: "relative" }}>
              <label>Nơi đi</label>
              <Autosuggest
                suggestions={suggestionsFrom}
                onSuggestionsFetchRequested={({ value }) => onSuggestionsFetchRequested({ value }, 'from')}
                onSuggestionsClearRequested={() => setSuggestionsFrom([])}
                getSuggestionValue={(suggestion) => suggestion} // Lấy giá trị của gợi ý
                renderSuggestion={renderSuggestion} // Render gợi ý
                inputProps={{
                    placeholder: 'Nơi đi',
                    value: from,
                    onChange: (e, { newValue }) => onChange(e, { newValue }, 'from')
                }}
              />
            </div>
            <div className="input-group" style={{ position: "relative" }}>
              <label>Nơi đến</label>
              <Autosuggest
                suggestions={suggestionsTo}
                onSuggestionsFetchRequested={({ value }) => onSuggestionsFetchRequested({ value }, 'to')}
                onSuggestionsClearRequested={() => setSuggestionsTo([])}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                  placeholder: 'Nơi đến',
                  value: to,
                  onChange: (e, { newValue }) => onChange(e, { newValue }, 'to')
                }}
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
              <div className="search-container">
                <button className="search-button1" onClick={handleSearchFlight}><b>Tìm chuyến bay</b></button>
                <button className="search-button" onClick={handleSearchFlight}>
                  <img src={searchIcon} alt="Search Icon" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="stopover-content">
            <div className="input-group">
              <label>Họ tên</label>
              <input type="text" id="fullname" name="fullname" placeholder="Nhập họ tên" />
            </div>
            <div className="input-group">
              <label>CCCD</label>
              <input type="text" id="CCCD" name="CCCD" placeholder="Nhập CCCD" />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input type="text" id="email" name="email" placeholder="Nhập email" />
            </div>
            <div>
              <Link to="/checkBooking" className="promo-button">Tra cứu</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightBooking;
