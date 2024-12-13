import React, { useState } from "react";
import "./FormCancel.css";

const FormCancel = () => {
  // State quản lý thông tin người đặt vé
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

  // State quản lý lỗi của form
  const [errors, setErrors] = useState({});

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

   // Kiểm tra form
   const validateForm = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Họ tên không được để trống";
    if (!form.phone.trim()) newErrors.phone = "Số điện thoại không được để trống";
    else if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Số điện thoại không hợp lệ (10 chữ số)";
    if (!form.email.trim()) newErrors.email = "Email không được để trống";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email không hợp lệ";
    if (!form.cccd.trim()) newErrors.cccd = "CCCD không được để trống";
    else if (!/^\d{12}$/.test(form.cccd)) newErrors.cccd = "CCCD không hợp lệ (12 chữ số)";
    return newErrors;
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Hiển thị lỗi nếu form không hợp lệ
    } else {
      setErrors({});
      console.log("Form đã gửi:", form); // Xử lý logic khi form hợp lệ
      alert("Thông tin đã được gửi thành công!");
      setForm({ fullName: "", phone: "", email: "" }); // Reset form
    }
  };

  return (
    <div className="cancel-container">
      <h2>THÔNG TIN NGƯỜI ĐẶT VÉ</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: "30px", width: "350px" }}>
        <div className="form-group">
          <label htmlFor="fullName">
            Họ tên <span className="required">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Nhập họ tên"
            value={form.fullName}
            onChange={handleInputChange}
          />
          {errors.fullName && <p className="error-text">{errors.fullName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            Số điện thoại <span className="required">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Nhập số điện thoại"
            value={form.phone}
            onChange={handleInputChange}
          />
          {errors.phone && <p className="error-text">{errors.phone}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Nhập email"
            value={form.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="cccd">
            CCCD <span className="required">*</span>
          </label>
          <input
            type="text"
            id="cccd"
            name="cccd"
            placeholder="Nhập CCCD"
            value={form.cccd}
            onChange={handleInputChange}
          />
          {errors.cccd && <p className="error-text">{errors.cccd}</p>}
        </div>
        <button type="submit" className="submit-btn" style={{width: "200px"}}>
          Tiếp tục
        </button>
      </form>
    </div>
  );
};

export default FormCancel;
