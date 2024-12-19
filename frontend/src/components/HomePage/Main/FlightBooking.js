import React, { useState, useEffect } from "react";
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
  const [booking_id, setBookingId] = useState('');
  const [cccd, setCccd] = useState('');
  const [email, setEmail] = useState('');
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

  const isValidCCCD = (cccd) => /^\d{12}$/.test(cccd); // CCCD phải là 12 chữ số
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Hàm xử lý khi người dùng nhập liệu
  const onChange = (event, { newValue }, type) => {
    if (type === 'from') {
      setFrom(newValue); // Cập nhật giá trị "Nơi đi"
    } else if (type === 'to') {
      setTo(newValue); // Cập nhật giá trị "Nơi đến"
    } else if (type === 'cccd') {
      setCccd(newValue); // Cập nhật giá trị "CCCD"
    } else if (type === 'email') {
      setEmail(newValue); // Cập nhật giá trị "Email"
    } else if (type === 'booking_id') {
      setBookingId(newValue); // Cập nhật giá trị "Mã đặt chỗ"
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

  const handleSearchBooking = async () => {
    if (!booking_id || !email || !cccd) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (!isValidCCCD(cccd)) {
      alert("CCCD phải bao gồm đúng 12 chữ số!");
      return;
  }

  if (!isValidEmail(email)) {
      alert("Email không đúng định dạng!");
      return;
  }
  
    try {
      const response = await axios.post('http://localhost:8081/api/getBookingByForm', {
        booking_id,
        cccd,
        email
      });
  
      // Kiểm tra phản hồi từ API
      if (response.status === 200) {
        if (response.data && !response.data.error) {
          // Nếu không có lỗi, điều hướng sang trang checkBooking
          navigate('/checkBooking', { state: { bookingInfo: response.data } });
        } else {
          // Nếu API trả về thông báo lỗi
          alert("Không tìm thấy thông tin đặt vé!");
        }
      } else {
        // Trường hợp status khác 200 nhưng không bị catch
        alert("Thông tin cung cấp không chính xác!");
      }
    } catch (error) {
      // Trường hợp có lỗi từ API (ví dụ: 404, 500) hoặc lỗi kết nối
      console.error("Error:", error.response?.data || error.message);
      alert("Thông tin cung cấp không chính xác hoặc có lỗi xảy ra!");
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
            <div className="input-group">
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
            <div className="input-group">
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
              <label>Mã đặt chỗ</label>
              <input
                type="text"
                id="booking_id"
                name="booking_id"
                placeholder="Nhập mã đặt chỗ"
                value={booking_id}
                onChange={(e) => onChange(e, { newValue: e.target.value }, 'booking_id')} // Gọi onChange cho booking_id
              />
            </div>
            <div className="input-group">
              <label>CCCD</label>
              <input
                type="text"
                id="CCCD"
                name="CCCD"
                placeholder="Nhập CCCD"
                value={cccd}
                onChange={(e) => onChange(e, { newValue: e.target.value }, 'cccd')} // Gọi onChange cho CCCD
              />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => onChange(e, { newValue: e.target.value }, 'email')} // Gọi onChange cho Email
              />
            </div>
            <button className="promo-button" onClick={handleSearchBooking}>
              Tra cứu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightBooking;
