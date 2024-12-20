import React, { useState, useEffect } from "react";
import "../../styles/adminpage/RankTable.css";
import travel from "../../assets/image/travel.jpg";
import travel2 from "../../assets/image/travel2.jpg";
import travel3 from "../../assets/image/travel3.jpg";
import travel4 from "../../assets/image/travel4.jpg";
import travel5 from "../../assets/image/travel5.jpg";

const RankTable = () => {
  const images = [travel, travel2, travel3, travel4, travel5];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update image index every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  return (
    <div className="rank-table">
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
    </div>
  );
};

export default RankTable;
