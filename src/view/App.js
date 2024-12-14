import React, {useState} from 'react';
import './App.css';
import MainSection from "../components/MainSection.js";
import HotPlace from "../components/HotPlace.js";
import Login from "../components/Login.js";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  }


  return (
    <div className="App">
      <header className="Body">
        <MainSection toggleLogin={toggleLogin}/>
        <HotPlace />
        
      </header>
      {showLogin && (
        <>
          <div className="overlay" onClick={toggleLogin}></div>
          <Login onClose={toggleLogin} />
        </>
      )}
    </div>
  );
}

export default App;
