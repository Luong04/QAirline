import React, {useState} from 'react';
import './Home.css';
import MainSection from '../../components/HomePage/Main/MainSection.js';
import HotPlace from '../../components/HomePage/Main/HotPlace.js';
import Login from '../../components/HomePage/Main/Login.js';
import Contact from '../../components/HomePage/Footer/Contact.js';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  }


  return (
    <div className="Home">
      <header className="Body">
        <MainSection toggleLogin={toggleLogin}/>
      </header>
      <footer className="Body">
      <HotPlace />
      <Contact />
      </footer>
      {showLogin && (
        <>
          <div className="overlay" onClick={toggleLogin}></div>
          <Login onClose={toggleLogin} />
        </>
      )}
    </div>
  );
}

export default Home;
