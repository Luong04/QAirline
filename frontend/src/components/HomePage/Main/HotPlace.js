import React from "react";
import './HotPlace.css';
import DaNangPlace from '../../../assets/image/Da_Nang.jpg';
import HoiAnPlace from '../../../assets/image/Hoi_An.jpg';
import HaNoiPlace from '../../../assets/image/Ha_Noi.jpg';
import HuePlace from '../../../assets/image/Hue.jpg';
import SapaPlace from '../../../assets/image/Sapa.jpg';

const HotPlace = () => {
    return (
        <div class="destination-card">
            <div class="destination-header">
                <h2>✈️ Gợi ý </h2>
            </div>
            <div class="destination-content">
                <div class="image-container">
                    <img src={DaNangPlace} alt="Da_Nang" />
                </div>
                <div class="image-container">
                    <img src={HuePlace} alt="Hue" />
                </div>
                <div class="image-container">
                    <img src={HoiAnPlace} alt="Hoi_An" />
                </div>
                <div class="image-container">
                    <img src={HaNoiPlace} alt="Da_Noi" />
                </div>
                <div class="image-container">
                    <img src={SapaPlace} alt="Sa_Pa" />
                </div>
            </div>
        </div>

    );
}

export default HotPlace;