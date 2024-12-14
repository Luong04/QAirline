import React from "react";
import './HotPlace.css';
import DaNangPlace from '../../../assets/image/Da_Nang.jpg';
import HoiAnPlace from '../../../assets/image/Hoi_An.jpg';
import HaNoiPlace from '../../../assets/image/Ha_Noi.jpg';
import HuePlace from '../../../assets/image/Hue.jpg';
import SapaPlace from '../../../assets/image/Sapa.jpg';

const HotPlace = () => {
    return (
        <div className="destination-card">
            <div className="destination-header">
                <h2 style={{ textAlign: "left", marginLeft: "10px" }}>ĐIỂM ĐẾN PHỔ BIẾN</h2>
            </div>
            <div className="destination-content">
                <div className="image-container">
                    <img src={DaNangPlace} alt="Da_Nang" />
                    <div className="overlay">
                            <h3>Đà Nẵng</h3>
                            <p>Việt Nam | Nhiệt độ: 28°C</p>
                            <p>Đến với Đà Nẵng để chiêm ngưỡng vẻ đẹp</p>
                             <p>của biển xanh và nắng vàng.</p>
                            <a href="/danang">Xem Chi Tiết →</a>
                    </div>
                </div>
                <div className="image-container">
                    <img src={HuePlace} alt="Hue" />
                    <div className="overlay">
                            <h3>Huế</h3>
                            <p>Việt Nam | Nhiệt độ: 27°C</p>
                            <p>Khám phá di sản và cố đô Huế cổ kính, đầy chất thơ.</p>
                            <a href="/hue">Xem Chi Tiết →</a>
      
                    </div>
                </div>
                <div className="image-container">
                    <img src={HoiAnPlace} alt="Hoi_An" />
                    <div className="overlay">
                            <h3>Hội An</h3>
                            <p>Việt Nam | Nhiệt độ: 29°C</p>
                            <p>Vẻ đẹp cổ kính của phố cổ với đèn lồng và di sản văn hóa.</p>
                            <a href="/hoian">Xem Chi Tiết →</a>
                  
                    </div>
                </div>
                <div className="image-container">
                    <img src={HaNoiPlace} alt="Ha_Noi" />
                    <div className="overlay">
                            <h3>Hà Nội</h3>
                            <p>Việt Nam | Nhiệt độ: 26°C</p>
                            <p>Thủ đô nghìn năm văn hiến với nhiều nét văn hóa độc đáo.</p>
                            <a href="/hanoi">Xem Chi Tiết →</a>
                   
                    </div>
                </div>
                <div className="image-container">
                    <img src={SapaPlace} alt="Sa_Pa" />
                    <div className="overlay">
                            <h3>Sapa</h3>
                            <p>Việt Nam | Nhiệt độ: 15°C</p>
                            <p>Khám phá núi rừng Tây Bắc và văn hóa của các dân tộc thiểu số.</p>
                            <a href="/sapa">Xem Chi Tiết →</a>
                     
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotPlace;
