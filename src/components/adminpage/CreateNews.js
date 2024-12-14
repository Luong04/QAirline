import { React, useState } from "react";
import "../../styles/adminpage/CreateNews.css";

const CreateNews = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Lưu URL hình ảnh vào state
      };
      reader.readAsDataURL(file); // Đọc file ảnh dưới dạng URL
    } else {
      setImage(null);
    }
  };

  return (
    <div className="create-news">
      <h2 style={{ textAlign: "center" }}>Đăng tin tức</h2>
      <form className="create-news-form">
        <div className="form-group">
          <label htmlFor="title">Tiêu đề</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Nhập tiêu đề"
            required
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
          ></textarea>
        </div>
        <div className="form-group">
          <label
            htmlFor="image"
            style={{
              backgroundColor: "rgb(230, 230, 230)",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              cursor: "pointer",
              border: "1px solid rgb(200, 200, 200)",
            }}
          >
            Ảnh đính kèm
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image"
            onChange={handleImageChange}
            hidden
          />
        </div>
        {image && (
          <div className="form-group">
            <img src={image} alt="News" style={{ width: "50%" }} />
          </div>
        )}
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
