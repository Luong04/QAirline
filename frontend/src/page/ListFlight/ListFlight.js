import React, { useState, useEffect } from "react";
import "./ListFlight.css";
import Navbar from '../../components/HomePage/Header/Navbar.js';
import Login from "../../components/HomePage/Main/Login.js";
import axios from 'axios';

const ListFlight = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [flights, setFlights] = useState([]); // State để lưu dữ liệu từ API
    const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading
    const [error, setError] = useState(null); // State để lưu lỗi

    const toggleLogin = () => {
        setShowLogin(!showLogin);
    };

    // Gọi API khi component được mount
    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/flights'); // Thay URL bằng API thực tế
                console.log(response.data);
                if (!response) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.data;
                setFlights(data); // Giả sử `data` là danh sách các chuyến bay
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFlights();
    }, []);

    return (
        <div className="ListFlight">
            <header>
                <Navbar toggleLogin={toggleLogin} />
                <h1>THÔNG TIN HÀNH TRÌNH</h1>
            </header>
            <body>
                <div className="table-container">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <table id="flight-table">
                            <thead>
                                <tr>
                                    <th>Flight ID</th>
                                    <th>Plane</th>
                                    <th>Departure Airport</th>
                                    <th>Arrival Airport</th>
                                    <th>Departure Time</th>
                                    <th>Arrival Time</th>
                                    <th>Duration</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {flights.map((flight, index) => (
                                    <tr key={index}>
                                        <th>{flight.flight_id}</th>
                                        <th>{flight.plane}</th>
                                        <th>{flight.departure_code}</th>
                                        <th>{flight.arrival_code}</th>
                                        <th>{flight.departure_time}</th>
                                        <th>{flight.arrival_time}</th>
                                        <th>{flight.duration}</th>
                                        <th>{flight.status}</th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </body>
            {showLogin && (
                <>
                    <div className="overlay2" onClick={toggleLogin}></div>
                    <Login onClose={toggleLogin} />
                </>
            )}
        </div>
    );
};

export default ListFlight;
