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
            <body style={{ padding: "0 60px 0 190px" }}>
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
                                        <td>{flight.flight_id}</td>
                                        <td>{flight.plane}</td>
                                        <td>{flight.departure_code}</td>
                                        <td>{flight.arrival_code}</td>
                                        <td>{flight.departure_time}</td>
                                        <td>{flight.arrival_time}</td>
                                        <td>{flight.duration}</td>
                                        <td>{flight.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </body>
            {showLogin && (
                <>
                    <div className="overlay" onClick={toggleLogin}></div>
                    <Login onClose={toggleLogin} />
                </>
            )}
        </div>
    );
};

export default ListFlight;
