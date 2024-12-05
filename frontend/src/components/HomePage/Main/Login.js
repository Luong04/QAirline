import React from "react";
import "./Login.css";

const Login = ({onClose}) => {
  return (
    <div className="login-container">
      <div className="login-box">
      <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2 className="login-title">Đăng nhập</h2>
        <form className="login-form">
          <input
            type="text"
            placeholder="Tên đăng nhập"
            className="login-input"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="login-input"
          />
          <button type="submit" className="login-button">
            Đăng nhập
          </button>
        </form>
        <a href="#forget-password" className="forget-password">
          Quên mật khẩu?
        </a>
      </div>
    </div>
  );
};

export default Login;