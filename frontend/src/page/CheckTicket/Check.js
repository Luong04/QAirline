import React from "react"; 
import "./Check.css";

const Check = () => {
    return (
        <div class="ticket-details-container">
  <div class="ticket-details-header">Thông tin vé</div>
  <div class="ticket-details-item">
    <strong>Mã vé:</strong> A12345
  </div>
  <div class="ticket-details-item">
    <strong>Tên người đặt:</strong> Nguyễn Văn A
  </div>
  <div class="ticket-details-item">
    <strong>Email đặt vé:</strong> email@example.com
  </div>
  <div class="ticket-details-item">
    <strong>Ngày đặt vé:</strong> 26-11-2024
  </div>
  <div class="ticket-details-item">
    <strong>Giá:</strong> 1,500,000 VND
  </div>
  <div class="ticket-details-footer">
    <a href="/" class="ticket-details-button cancel">Hủy vé</a>
    <a href="/" class="ticket-details-button">Trở về</a>
  </div>
  
</div>

    );
} 

export default Check;
