import React, {useState} from "react";
import "./ListFlight.css";
import Navbar from '../../components/HomePage/Header/Navbar.js';
import Login from "../../components/HomePage/Main/Login.js"

const ListFlight = () => {
    const [showLogin, setShowLogin] = useState(false);
    
      const toggleLogin = () => {
        setShowLogin(!showLogin);
      }
    return (
        <div className="ListFlight">
      <header>
      <Navbar toggleLogin={toggleLogin}/>  
        <h1>THÔNG TIN HÀNH TRÌNH</h1>
      </header>
      <body >
            <div className="table-container"><table id="flight-table">
                <thead>
                    <tr>
                        <th>Flight ID</th>
                        <th>Airline</th>
                        <th>Departure Airport</th>
                        <th>Arrival Airport</th>
                        <th>Departure Time</th>
                        <th>Arrival Time</th>
                        <th>Duration</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody><tr>
                    <th>1</th>
                    <th>Vietnam Airline</th>
                    <th>Nội Bài</th>
                    <th>Tân Sơn Nhất</th>
                    <th>23-12-2024</th>
                    <th>23-12-2024</th>
                    <th>2:0:0</th>
                    <th>in Flight</th>
                </tr>
                    <tr>
                        <th>2</th>
                        <th>Vietnam Airline</th>
                        <th>Nội Bài</th>
                        <th>Tân Sơn Nhất</th>
                        <th>23-12-2024</th>
                        <th>23-12-2024</th>
                        <th>2:0:0</th>
                        <th>in Flight</th>
                    </tr>
                    <tr>
                        <th>3</th>
                        <th>Vietnam Airline</th>
                        <th>Nội Bài</th>
                        <th>Tân Sơn Nhất</th>
                        <th>23-12-2024</th>
                        <th>23-12-2024</th>
                        <th>2:0:0</th>
                        <th>in Flight</th>
                    </tr>
                    <tr>
                        <th>4</th>
                        <th>Vietnam Airline</th>
                        <th>Nội Bài</th>
                        <th>Tân Sơn Nhất</th>
                        <th>23-12-2024</th>
                        <th>23-12-2024</th>
                        <th>2:0:0</th>
                        <th>in Flight</th>
                    </tr>
                    <tr>
                    <th>1</th>
                    <th>Vietnam Airline</th>
                    <th>Nội Bài</th>
                    <th>Tân Sơn Nhất</th>
                    <th>23-12-2024</th>
                    <th>23-12-2024</th>
                    <th>2:0:0</th>
                    <th>in Flight</th>
                </tr>
                <tr>
                    <th>1</th>
                    <th>Vietnam Airline</th>
                    <th>Nội Bài</th>
                    <th>Tân Sơn Nhất</th>
                    <th>23-12-2024</th>
                    <th>23-12-2024</th>
                    <th>2:0:0</th>
                    <th>in Flight</th>
                </tr>
                <tr>
                    <th>1</th>
                    <th>Vietnam Airline</th>
                    <th>Nội Bài</th>
                    <th>Tân Sơn Nhất</th>
                    <th>23-12-2024</th>
                    <th>23-12-2024</th>
                    <th>2:0:0</th>
                    <th>in Flight</th>
                </tr>
                <tr>
                    <th>1</th>
                    <th>Vietnam Airline</th>
                    <th>Nội Bài</th>
                    <th>Tân Sơn Nhất</th>
                    <th>23-12-2024</th>
                    <th>23-12-2024</th>
                    <th>2:0:0</th>
                    <th>in Flight</th>
                </tr>
                <tr>
                    <th>1</th>
                    <th>Vietnam Airline</th>
                    <th>Nội Bài</th>
                    <th>Tân Sơn Nhất</th>
                    <th>23-12-2024</th>
                    <th>23-12-2024</th>
                    <th>2:0:0</th>
                    <th>in Flight</th>
                </tr>
                <tr>
                    <th>1</th>
                    <th>Vietnam Airline</th>
                    <th>Nội Bài</th>
                    <th>Tân Sơn Nhất</th>
                    <th>23-12-2024</th>
                    <th>23-12-2024</th>
                    <th>2:0:0</th>
                    <th>in Flight</th>
                </tr>
                <tr>
                    <th>1</th>
                    <th>Vietnam Airline</th>
                    <th>Nội Bài</th>
                    <th>Tân Sơn Nhất</th>
                    <th>23-12-2024</th>
                    <th>23-12-2024</th>
                    <th>2:0:0</th>
                    <th>in Flight</th>
                </tr>
                <tr>
                    <th>1</th>
                    <th>Vietnam Airline</th>
                    <th>Nội Bài</th>
                    <th>Tân Sơn Nhất</th>
                    <th>23-12-2024</th>
                    <th>23-12-2024</th>
                    <th>2:0:0</th>
                    <th>in Flight</th>
                </tr>
                <tr>
                    <th>1</th>
                    <th>Vietnam Airline</th>
                    <th>Nội Bài</th>
                    <th>Tân Sơn Nhất</th>
                    <th>23-12-2024</th>
                    <th>23-12-2024</th>
                    <th>2:0:0</th>
                    <th>in Flight</th>
                </tr>
                <tr>
                    <th>1</th>
                    <th>Vietnam Airline</th>
                    <th>Nội Bài</th>
                    <th>Tân Sơn Nhất</th>
                    <th>23-12-2024</th>
                    <th>23-12-2024</th>
                    <th>2:0:0</th>
                    <th>in Flight</th>
                </tr>
                <tr>
                    <th>1</th>
                    <th>Vietnam Airline</th>
                    <th>Nội Bài</th>
                    <th>Tân Sơn Nhất</th>
                    <th>23-12-2024</th>
                    <th>23-12-2024</th>
                    <th>2:0:0</th>
                    <th>in Flight</th>
                </tr>
                <tr>
                    <th>1</th>
                    <th>Vietnam Airline</th>
                    <th>Nội Bài</th>
                    <th>Tân Sơn Nhất</th>
                    <th>23-12-2024</th>
                    <th>23-12-2024</th>
                    <th>2:0:0</th>
                    <th>in Flight</th>
                </tr></tbody>
            </table>
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
}

export default ListFlight;