import React from "react";
import "./Contact.css";

const Contact = () => {
    return (
            <div className="container">
                <h2>Thông tin liên hệ</h2>
                <div className="contact-info">
                    <div className="info-item">
                        <h3>Hotline</h3>
                        <p><a href="tel:+84123456789">+84 123 456 789</a></p>
                    </div>
                    <div className="info-item">
                        <h3>Email hỗ trợ</h3>
                        <p><a href="mailto:support@vemaybay.com">support@vemaybay.com</a></p>
                    </div>
                    <div className="info-item">
                        <h3>Địa chỉ văn phòng</h3>
                        <p>123 Đường ABC, Quận 1, TP. Hồ Chí Minh</p>
                    </div>
                </div>       
            </div>
    );
};

export default Contact;
