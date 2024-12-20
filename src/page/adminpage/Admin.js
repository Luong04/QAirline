import React from "react";
import { Outlet } from "react-router-dom";
import "./Admin.css";
import Sidebar from "../../components/adminpage/Sidebar";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Admin;
