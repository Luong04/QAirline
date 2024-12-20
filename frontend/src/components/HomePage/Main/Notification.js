import React, { useState, useEffect } from "react";
import "./Notification.css";
import image1 from "../../../assets/image/background2.avif";
import image2 from "../../../assets/image/Image2.jpg";
import image3 from "../../../assets/image/Image3.jpg";
import image4 from "../../../assets/image/Image4.jpg";
import image5 from "../../../assets/image/Image5.jpg";

const Notification = () => {
    const notifications = [
        { title: "Làm thủ tục trực tuyến", description: "Chủ động làm thủ tục trên website hoặc ứng dụng di động của Vietnam Airlines.Chủ động làm thủ tục trên website hoặc ứng dụng di động của Vietnam Airlines.Chủ động làm thủ tục trên website hoặc ứng dụng di động của Vietnam Airlines.Chủ động làm thủ tục trên website hoặc ứng dụng di động của Vietnam Airlines.", img: image1 },
        { title: "Phòng khách Thương gia", description: "Trải nghiệm phòng chờ sang trọng, yên tĩnh và đầy đủ tiện nghi trước giờ khởi hành.", img: image3 },
        { title: "Ẩm thực hạng Thương gia", description: "Trải nghiệm 'ẩm thực trên mây' tiêu chuẩn 4 sao.", img: image4 },
        { title: "Hạng vé ưu đãi", description: "Mua vé giá ưu đãi cho chuyến bay của bạn ngay hôm nay.", img: image2 },
        { title: "Dịch vụ xe đưa đón", description: "Dịch vụ xe đưa đón tiện lợi, nhanh chóng.", img: image5 },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % notifications.length);
        }, 3000); // Tự động chuyển sau mỗi 3 giây

        return () => clearInterval(interval);
    }, [notifications.length]);

    return (
        <div className="notification-container">
            <div className="header-notification">
                <h2>THÔNG TIN NỔI BẬT</h2>
            </div>
            <div className="notification-slide">
                {notifications.map((notification, index) => (
                    <div
                        key={index}
                        className={`notification-item ${index === currentIndex ? "active" : ""}`}
                    >
                        <img src={notification.img} alt={notification.title} className="notification-image" />
                        <div className="notification-content">
                            <h3>{notification.title}</h3>
                            <p>{notification.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notification;
