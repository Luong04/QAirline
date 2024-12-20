import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios để gọi API
import "./InfoFlight.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Autosuggest from 'react-autosuggest';
import { useNavigate } from "react-router-dom";
import moment from 'moment-timezone';

const InfoFlight = ({setFlights, setGoFlights, setReturnFlights}) => {
    const [isRoundTrip, setIsRoundTrip] = useState(false); // State để theo dõi chế độ Một chiều/Khứ hồi
    const [returnDate, setReturnDate] = useState(null);
    const location = useLocation(); 
    const navigate = useNavigate();
    // Khởi tạo state cho chuyến bay
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const [suggestions, setSuggestions] = useState([]);
    //const [flightResults, setFlightResults] = useState([]); // State để lưu kết quả chuyến bay

    // Hàm lấy gợi ý từ API
    const getSuggestions = async (value) => {
        if (!value.trim()) return []; // Nếu không có giá trị, không lấy gợi ý

        try {
            const response = await axios.get('http://localhost:8081/api/getPlaces', {
                params: { query: value } // Truyền giá trị tìm kiếm vào query
            });
            return response.data || [];
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            return [];
        }
    };

    // Hàm xử lý lấy gợi ý khi người dùng nhập liệu
    const onSuggestionsFetchRequested = async ({ value }) => {
        const newSuggestions = await getSuggestions(value); // Gọi API để lấy gợi ý
        setSuggestions(newSuggestions);
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]); // Xóa gợi ý khi không có dữ liệu
    };

    const onSuggestionSelected = (event, { suggestionValue }) => {
        // Cập nhật giá trị của điểm đi hoặc điểm đến
        if (event.target.id === 'departure') {
            setFrom(suggestionValue);
        } else if (event.target.id === 'destination') {
            setTo(suggestionValue);
        }
    };

    const inputProps = (id) => ({
        placeholder: id === 'departure' ? from : to,
        value: id === 'departure' ? from : to,
        onChange: (event, { newValue }) => {
            if (id === 'departure') {
                setFrom(newValue);
            } else if (id === 'destination') {
                setTo(newValue);
            }
        }
    });

    const handleSearchFlights = async () => {
        // Gửi yêu cầu đến API để tìm chuyến bay
        setFlights([]);
        setGoFlights([]);
        setReturnFlights([]);

        const departureDate = moment(selectedDate).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD');
        const returnDateFormatted = moment(returnDate).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD');
        const payload = {
            departure_place: from,
            arrival_place: to,
            is_one_way: !isRoundTrip ? "true" : "false",
            departure_date: departureDate,
            return_date: returnDateFormatted,
        };

        try {
            console.log(payload);
            const response = await axios.post('http://localhost:8081/api/findFlight', payload);
            const flightResults = response.data; // Cập nhật kết quả chuyến bay
            console.log("FLight Result: ",flightResults);
            if(!isRoundTrip) navigate('/booking', { state: { flights: response.data, from, to, selectedDate, returnDate, isRoundTrip } });
            else{
                navigate('/booking', { state: { goFlights: flightResults.foundFlights, returnFlights: flightResults.returnFlights, from, to, selectedDate, returnDate, isRoundTrip } });
            }
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    };

    useEffect(() => {
        // Kiểm tra nếu state có tồn tại và lấy dữ liệu
        if (location.state && location.state.from && location.state.to && location.state.selectedDate) {
            setFrom(location.state.from);
            setTo(location.state.to);
            const date = new Date(location.state.selectedDate);
            if (!isNaN(date)) { // Kiểm tra xem giá trị có phải là một đối tượng Date hợp lệ không
                setSelectedDate(date);
            }
        }
    }, [location]);  // Hook này sẽ chạy lại khi location thay đổi

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
                        <Autosuggest
                          id="departure"
                          suggestions={suggestions}
                          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                          onSuggestionsClearRequested={onSuggestionsClearRequested}
                          onSuggestionSelected={onSuggestionSelected}
                          getSuggestionValue={(suggestion) => suggestion}
                          renderSuggestion={(suggestion) => <div>{suggestion}</div>}
                          inputProps={inputProps('departure')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="destination">Điểm đến</label>
                        <Autosuggest
                          id="destination"
                          suggestions={suggestions}
                          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                          onSuggestionsClearRequested={onSuggestionsClearRequested}
                          onSuggestionSelected={onSuggestionSelected}
                          getSuggestionValue={(suggestion) => suggestion}
                          renderSuggestion={(suggestion) => <div>{suggestion}</div>}
                          inputProps={inputProps('destination')}
                        />
                    </div>
                </div>
                <div className="infor-right">
                    <div className="form-group">
                        <label htmlFor="date">Ngày đi</label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText={selectedDate}
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
                    <button className="btn-search" onClick={handleSearchFlights}><p>Tìm kiếm</p></button>
                </div>
            </div>
        </div>
    );
};

export default InfoFlight;
