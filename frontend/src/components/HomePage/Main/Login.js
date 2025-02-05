import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = ({ onClose }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/login', {
        username,
        password,
      });
      const { role } = response.data;
      localStorage.setItem('role', role); // Lưu role để kiểm tra sau này
      console.log('Login successful');
      if (role === 'admin') {
        // Chuyển hướng đến trang admin
        window.location.href = '/admin';
      }
    } catch (err) {
      alert("Thông tin đăng nhập không chính xác");
      console.error('Login failed:', err.response.data.error);
    }
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2 className="login-title">ĐĂNG NHẬP</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">
            Đăng nhập
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <a href="#forget-password" className="forget-password">
          Quên mật khẩu?
        </a>
      </div>
    </div>
  );
};

export default Login;
