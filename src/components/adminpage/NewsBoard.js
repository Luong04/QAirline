import { React, useState } from "react";
import News from "./News";
import "../../styles/adminpage/NewsBoard.css";

const NewsBoard = () => {
  const [newsList, setNewsList] = useState([
    {
      title: "News 1",
      content:
        "Em rất thích ngắm nhìn những cơn mưa mùa xuân. Mưa xuân không vội vã, ồn ào như mưa hạ. Mưa xuân dịu dàng, chầm chậm, mang đến cảm giác bình yên và thư thái trong tâm hồn. Những hạt mưa bắt đầu rơi, hạt mưa nhỏ, lất phất trong gió, vương những giọt long lanh trên cánh đào mỏng manh, trên những chồi non cây lá.Mưa phảng phất trong không gian ấm áp của mùa xuân, nhè nhẹ, nhè nhẹ. Mưa dần buông những hạt cuối cùng, vạn vật được mưa tắm mắt trở nên căng tràn sức sống. Cánh mai vàng nhờ thưởng thức hạt ngọc tinh túy của bầu trời mà tươi tắn hơn. Chồi non mơn mởn, xanh biếc. Nương lúa, bãi ngô của người nông dân cũng mướt xanh. Mưa xuân diệu kỳ còn mang đến cho lòng người niềm vui khoan khoái, yêu biết bao nhiêu những cơn mưa xuân tuyệt vời như thế.",
    },
    {
      title: "News 2",
      content:
        "This is the second news. Em rất thích ngắm nhìn những cơn mưa mùa xuân. Mưa xuân không vội vã, ồn ào như mưa hạ. Mưa xuân dịu dàng, chầm chậm, mang đến cảm giác bình yên và thư thái trong tâm hồn. Những hạt mưa bắt đầu rơi, hạt mưa nhỏ, lất phất trong gió, vương những giọt long lanh trên cánh đào mỏng manh, trên những chồi non cây lá.Mưa phảng phất trong không gian ấm áp của mùa xuân, nhè nhẹ, nhè nhẹ. Mưa dần buông những hạt cuối cùng, vạn vật được mưa tắm mắt trở nên căng tràn sức sống. Cánh mai vàng nhờ thưởng thức hạt ngọc tinh túy của bầu trời mà tươi tắn hơn. Chồi non mơn mởn, xanh biếc. Nương lúa, bãi ngô của người nông dân cũng mướt xanh. Mưa xuân diệu kỳ còn mang đến cho lòng người niềm vui khoan khoái, yêu biết bao nhiêu những cơn mưa xuân tuyệt vời như thế.",
    },
    {
      title: "News 3",
      content:
        "This is the third news. Em rất thích ngắm nhìn những cơn mưa mùa xuân. Mưa xuân không vội vã, ồn ào như mưa hạ. Mưa xuân dịu dàng, chầm chậm, mang đến cảm giác",
    },
  ]);

  const handleDeleteNews = (news) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tin tức này?")) {
      setNewsList(newsList.filter((n) => n !== news));
    }
  };

  return (
    <div className="news-board">
      <h2>Tin tức đã đăng</h2>
      {newsList.map((news) => (
        <News news={news} onDelete={handleDeleteNews} />
      ))}
    </div>
  );
};

export default NewsBoard;
