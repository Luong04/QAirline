import React from "react";
import './HotPlace.css';
import DaNangPlace from '../../../assets/image/Da_Nang.jpg';
import HoiAnPlace from '../../../assets/image/Hoi_An.jpg';
import HaLongPlace from '../../../assets/image/Ha_Long.jpg';
import NhaTrangPlace from '../../../assets/image/Nha_Trang.jpg';
import SapaPlace from '../../../assets/image/Sapa.jpg';

const HotPlace = () => {
    return (
        <div className="destination-card">
            <div className="destination-header">
                <h2>ĐIỂM ĐẾN PHỔ BIẾN</h2>
            </div>
            <div className="destination-content">
                <div className="image-container">
                    <img src={DaNangPlace} alt="Da_Nang" />
                    <div className="overlay1">
                            <h3>Đà Nẵng</h3>
                            <p>Việt Nam | Nhiệt độ: 28°C</p>
                            <p>Đến với Đà Nẵng để chiêm ngưỡng vẻ đẹp</p>
                             <p>của biển xanh và nắng vàng.</p>
                            <a href="/danang">Xem Chi Tiết →</a>
                    </div>
                </div>
                <div className="image-container">
                    <img src={NhaTrangPlace} alt="NhaTrang" />
                    <div className="overlay1">
                            <h3>Huế</h3>
                            <p>Việt Nam | Nhiệt độ: 28°C</p>
                            <p>Khám phá thành phố biển Nha Trang với bãi biển tuyệt đẹp và những hòn đảo kỳ thú.</p>
                            <a href="/nhatrang">Xem Chi Tiết →</a>
      
                    </div>
                </div>
                <div className="image-container">
                    <img src={HoiAnPlace} alt="Hoi_An" />
                    <div className="overlay1">
                            <h3>Hội An</h3>
                            <p>Việt Nam | Nhiệt độ: 29°C</p>
                            <p>Vẻ đẹp cổ kính của phố cổ với đèn lồng và di sản văn hóa.</p>
                            <a href="/hoian">Xem Chi Tiết →</a>
                  
                    </div>
                </div>
                <div className="image-container">
                    <img src={HaLongPlace} alt="Ha_Long" />
                    <div className="overlay1">
                            <h3>Vịnh Hạ Long</h3>
                            <p>Việt Nam | Nhiệt độ: 26°C</p>
                            <p>Kỳ quan thiên nhiên với hàng ngàn hòn đảo đá vôi và hang động kỳ bí.</p>
                            <a href="/halong">Xem Chi Tiết →</a>
                   
                    </div>
                </div>
                <div className="image-container">
                    <img src={SapaPlace} alt="Sa_Pa" />
                    <div className="overlay1">
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
