import React from "react";
import "./Contact.css";
import Facebookicon from "../../../assets/image/facebook_icon.jpg"
import ZLicon from "../../../assets/image/zalo_icon.jpg"
import Callicon from "../../../assets/image/phone-icon.png"
import Emailicon from "../../../assets/image/email_icon.jpg"

const Contact = () => {
    return (
        <div className="container">
            <h2>THÔNG TIN LIÊN HỆ</h2>
            <div className="contact-info">
                {/* Hotline */}
                <div className="info-item">
                    <h3>Hotline (24/7)</h3>
                    <p><img src={Callicon}/><a href="tel:+84123456789">+84 973 735 235</a></p>
                    <p><img src={Callicon}/><a href="tel:+84123456789">+84 364 937 234</a></p>
                </div>
                
                {/* Email hỗ trợ */}
                <div className="info-item">
                    <h3>Email hỗ trợ</h3>
                    <p><img src={Emailicon}/><a href="mailto:support@vemaybay.com">qAirlinesupport@gmail.com</a></p>
                    <p><img src={Emailicon}/><a href="mailto:booking@vemaybay.com">qAirlinebooking@gmail.com</a></p>
                </div>

                {/* Mạng xã hội */}
                <div className="info-item">
                    <h3>Mạng xã hội</h3>
                    <p><img src={Facebookicon}/><a href="https://facebook.com/vemaybay" target="_blank" rel="noopener noreferrer">QAIRLINE</a></p>
                    <p><img src={ZLicon}/><a href="https://zalo.me/vemaybay" target="_blank" rel="noopener noreferrer">QAIRLINE</a></p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
