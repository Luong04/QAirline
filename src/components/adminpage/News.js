import { React, useState } from "react";
import "../../styles/adminpage/News.css";

const News = ({ news, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [header, setHeader] = useState(news.header);
  const [content, setContent] = useState(news.content);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = () => {
    onDelete(news.notification_id);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (window.confirm("Bạn có chắc chắn muốn chỉnh sửa tin tức này?")) {
      const res = await fetch(`http://localhost:8081/admin/editNotification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          notification_id: news.notification_id,
          header: header,
          content: content,
        }),
      });
      if (res.ok) {
        alert("Chỉnh sửa tin tức thành công");
        setIsEditing(false);
      } else {
        alert("Chỉnh sửa tin tức thất bại");
      }
    }
  };

  const handleCancel = async () => {
    setHeader(news.header);
    setContent(news.content);
    setIsEditing(false);
  };

  return (
    <div className="news">
      <h3 style={{ marginTop: "0", marginBottom: "0" }}>{news.header}</h3>
      <span style={{ color: "gray", fontSize: "1rem" }}>
        Ngày tạo: {news.date}
      </span>
      {news.content.length > 100 ? (
        isExpanded ? (
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
        )
      ) : (
        <p>{news.content}</p>
      )}
      <hr></hr>
      {isEditing ? (
        <form onSubmit={handleEdit}>
          <div className="form-group">
            <label htmlFor="header">Tiêu đề</label>
            <input
              type="text"
              id="header"
              placeholder="Nhập tiêu đề mới"
              onChange={(e) => setHeader(e.target.value)}
              value={header}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Nội dung</label>
            <textarea
              id="content"
              rows={5}
              placeholder="Nhập nội dung mới"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn">
              Lưu
            </button>
            <button type="button" className="btn" onClick={handleCancel}>
              Hủy
            </button>
          </div>
        </form>
      ) : (
        <div style={{ display: "flex", width: "100%", gap: "3rem" }}>
          <button className="btn" onClick={() => setIsEditing(true)}>
            Chỉnh sửa
          </button>
          <button className="btn" onClick={handleDelete}>
            Xóa
          </button>
        </div>
      )}
    </div>
  );
};

export default News;
