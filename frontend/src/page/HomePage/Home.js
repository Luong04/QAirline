import React, {useState} from 'react';
import './Home.css';
import Navbar from '../../components/HomePage/Header/Navbar.js';
import FlightBooking from '../../components/HomePage/Main/FlightBooking.js'
import HotPlace from '../../components/HomePage/Main/HotPlace.js';
import Notification from '../../components/HomePage/Main/Notification.js'
import Login from '../../components/HomePage/Main/Login.js';
import Contact from '../../components/HomePage/Footer/Contact.js';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  }


  return (
    <div className="home-container">
      <div className="Home">
      <Navbar toggleLogin={toggleLogin}/>
      <FlightBooking/>  
      </div>
      <Notification/>
      <HotPlace />
      <Contact />
      {showLogin && (
        <>
          <div className="overlay2" onClick={toggleLogin}></div>
          <Login onClose={toggleLogin} />
        </>
      )}
    </div>
  );
}

export default Home;
