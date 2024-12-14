import { React, useState } from "react";
import "../../styles/adminpage/News.css";

const News = ({ news, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = () => {
    onDelete(news);
  };

  return (
    <div className="news">
      <h3 style={{ marginTop: "0" }}>{news.title}</h3>
      {isExpanded ? (
        <p>
          {news.content}{" "}
          <span className="tag" onClick={handleExpand}>
            Thu gọn
          </span>
        </p>
      ) : (
        <p>
          {news.content.slice(0, 100).trimEnd()}....{" "}
          <span className="tag" onClick={handleExpand}>
            Mở rộng
          </span>
        </p>
      )}
      <hr></hr>
      <div style={{ display: "flex", width: "100%", gap: "3rem" }}>
        <button className="btn">Chỉnh sửa</button>
        <button className="btn" onClick={handleDelete}>
          Xóa
        </button>
      </div>
    </div>
  );
};

export default News;
