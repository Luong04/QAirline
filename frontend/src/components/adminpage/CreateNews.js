import { React, useState } from "react";
import "../../styles/adminpage/CreateNews.css";

const CreateNews = ({ onUpdate }) => {
  const [header, setheader] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("role");
      const res = await fetch(
        "http://localhost:8081/api/admin/createNotification",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" ,Authorization: `Bearer ${token}`},
          body: JSON.stringify({ header: header, content: content }),
        }
      );
      if (res.ok) {
        const newNews = { header: header, content: content };
        onUpdate(newNews);
        alert("Đăng tin tức thành công");
        setheader("");
        setContent("");
      } else {
        alert("Đăng tin tức thất bại");
      }
    } catch (error) {
      console.error(error);
      alert("Đăng tin tức thất bại");
    }
  };

  return (
    <div className="create-news">
      <h2 style={{ textAlign: "center" }}>Đăng tin tức</h2>
      <form className="create-news-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="header">Tiêu đề</label>
          <input
            type="text"
            id="header"
            name="header"
            placeholder="Nhập tiêu đề"
            required
            onChange={(e) => setheader(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Nội dung</label>
          <textarea
            id="content"
            name="content"
            placeholder="Nhập nội dung"
            rows={5}
            required
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <button type="submit" className="button">
            Đăng tin tức
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNews;
