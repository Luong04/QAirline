import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import "../../styles/adminpage/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className={`btn-container ${isActive("/admin") ? "active" : ""}`}>
        <Link to="/admin" className="link">
          Trang chủ
        </Link>
      </div>
      <div
        className={`btn-container ${isActive("/admin/planes") ? "active" : ""}`}
      >
        <Link to="/admin/planes" className="link">
          Quản lý máy bay
        </Link>
      </div>
      <div
        className={`btn-container ${
          isActive("/admin/flights") ? "active" : ""
        }`}
      >
        <Link to="/admin/flights" className="link">
          Quản lý chuyến bay
        </Link>
      </div>
      <div
        className={`btn-container ${isActive("/admin/news") ? "active" : ""}`}
      >
        <Link to="/admin/news" className="link">
          Quản lý tin tức
        </Link>
      </div>
      <div className="btn-container">
        <Link to="/" className="link">
          Đăng xuất
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
