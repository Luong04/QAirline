import React from "react";
import "./AdminNews.css";
import CreateNews from "../../components/adminpage/CreateNews";
import NewsBoard from "../../components/adminpage/NewsBoard";

const AdminNews = () => {
  return (
    <div className="admin-news">
      <CreateNews />
      <NewsBoard />
    </div>
  );
};

export default AdminNews;
