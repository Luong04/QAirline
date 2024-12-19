import React from "react";
import "./Contact.css";

const Contact = () => {
    return (
        <div className="container">
            <h2>Thông tin liên hệ</h2>
            <div className="contact-info">
                {/* Hotline */}
                <div className="info-item">
                    <h3>Hotline (24/7)</h3>
                    <p><a href="tel:+84123456789">+84 342 456 789</a></p>
                    <p><a href="tel:+84123456789">+84 973 735 235</a></p>
                    <p><a href="tel:+84123456789">+84 364 937 234</a></p>
                </div>
                
                {/* Email hỗ trợ */}
                <div className="info-item">
                    <h3>Email hỗ trợ</h3>
                    <p><a href="mailto:support@vemaybay.com">qAirlinesupport@gmail.com</a></p>
                    <p><a href="mailto:booking@vemaybay.com">qAirlinebooking@gmail.com</a></p>
                </div>

                {/* Mạng xã hội */}
                <div className="info-item">
                    <h3>Liên hệ qua mạng xã hội</h3>
                    <p><a href="https://facebook.com/vemaybay" target="_blank" rel="noopener noreferrer">Facebook</a></p>
                    <p><a href="https://zalo.me/vemaybay" target="_blank" rel="noopener noreferrer">Zalo</a></p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
