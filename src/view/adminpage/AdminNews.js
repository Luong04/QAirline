import { React, useEffect, useState } from "react";
import "./AdminNews.css";
import CreateNews from "../../components/adminpage/CreateNews";
import News from "../../components/adminpage/News";

const AdminNews = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch("http://localhost:8081/admin/getNotification", {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setNewsList(data);
      }
    };
    fetchNews();
  }, []);

  const handleUpdateNews = (newNews) => {
    const id = newsList.length + 1;
    newNews.notification_id = id;
    setNewsList([...newsList, newNews]);
  };

  const handleEditNews = (editedNews) => {
    setNewsList(
      newsList.map((news) =>
        news.notification_id === editedNews.notification_id ? editedNews : news
      )
    );
  };

  const handleDeleteNews = async (notification_id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tin tức này?")) {
      const res = await fetch(
        `http://localhost:8081/admin/removeNotification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notification_id: notification_id }),
        }
      );
      if (res.ok) {
        setNewsList(
          newsList.filter((news) => news.notification_id !== notification_id)
        );
        alert("Xóa tin tức thành công");
      } else {
        alert("Xóa tin tức thất bại");
      }
    }
  };

  return (
    <div className="admin-news">
      <CreateNews onUpdate={handleUpdateNews} />
      <div className="news-board">
        <h2>Tin tức đã đăng</h2>
        {newsList.map((news) => (
          <News
            news={news}
            onDelete={handleDeleteNews}
            onEdit={handleEditNews}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminNews;
