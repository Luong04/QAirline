import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Notification.css";
import HuePlace from '../../../assets/image/Hoi_An.jpg';

const Notification = () => {
    const notifications = [
        { title: "Làm thủ tục trực tuyến", description: "Chủ động làm thủ tục trên website hoặc ứng dụng di động của Vietnam Airlines.", img: HuePlace },
        { title: "Phòng khách Thương gia", description: "Trải nghiệm phòng chờ sang trọng, yên tĩnh và đầy đủ tiện nghi trước giờ khởi hành.", img: HuePlace },
        { title: "Ẩm thực hạng Thương gia", description: "Trải nghiệm 'ẩm thực trên mây' tiêu chuẩn 4 sao.", img: HuePlace },
        { title: "Hạng vé ưu đãi", description: "Mua vé giá ưu đãi cho chuyến bay của bạn ngay hôm nay.", img: HuePlace },
        { title: "Dịch vụ xe đưa đón", description: "Dịch vụ xe đưa đón tiện lợi, nhanh chóng.", img: HuePlace },
    ];

    const settings = {
        dots: true,             // Hiển thị các nút chuyển slide
        infinite: true,         // Lặp lại vô hạn
        speed: 1000,            // Tốc độ chuyển slide (ms)
        slidesToShow: 3,        // Hiển thị 3 thông báo cùng lúc
        slidesToScroll: 1,      // Trượt 1 thông báo mỗi lần
        autoplay: true,         // Tự động chuyển slide
        autoplaySpeed: 3000,    // Thời gian dừng giữa các lần chuyển slide (ms)
        pauseOnHover: true,     // Tạm dừng khi di chuột vào
    };

    return (
        <div className="notification-container">
            <div className="header-notification">
                <h2 style={{ textAlign: "left" }}>THÔNG TIN NỔI BẬT</h2>
            </div>
            <Slider {...settings}>
                {notifications.map((item, index) => (
                    <div className="notification-item" key={index}>
                        <img src={item.img} alt={item.title} />
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Notification;
