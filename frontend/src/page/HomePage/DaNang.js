import React from "react";
import "./DaNang.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import Da_Nang from "../../assets/image/Da_Nang.jpg";
import Da_Nang2 from "../../assets/image/Da_Nang2.jpg";
import Da_Nang3 from "../../assets/image/Da_Nang3.jpg";

const DaNang = () => {
    const navigate = useNavigate(); // Sử dụng để điều hướng
    return (
        <div>
            <div className="header-checkBooking">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <h2>KHÁM PHÁ ĐỊA ĐIỂM PHỔ BIẾN</h2>
            </div>
            <div className="placediscovery"><h2>Đà Nẵng - Thành phố của những kỳ quan</h2></div>
            <div className="discovery-content">
                <img src={Da_Nang} alt="DaNang"/>
                <div className="discovery">
                    <h2> Cầu Vàng - Biểu tượng vươn lên giữa trời mây</h2>
                    <p>Cầu Vàng là một kiệt tác kiến trúc độc đáo, nằm trên đỉnh Bà Nà Hills, Đà Nẵng. Cây cầu nổi bật với thiết kế uốn lượn, được nâng đỡ bởi đôi bàn tay khổng lồ như vươn ra từ núi non. Đây không chỉ là điểm check-in lý tưởng mà còn là nơi du khách có thể tận hưởng khung cảnh hùng vĩ của rừng núi và mây trời. Mỗi bước đi trên cầu như đưa bạn vào một thế giới huyền ảo, đầy cảm hứng và thơ mộng.</p></div>
            </div>
            <div className="discovery-content">
                <img src={Da_Nang2} alt="DaNang1" />
                <div className="discovery">
                    <h2>Bà Nà Hills - Thiên đường nghỉ dưỡng trên cao</h2>
                    <p>Bà Nà Hills được mệnh danh là "Đà Lạt của miền Trung" với khí hậu mát mẻ quanh năm và cảnh quan tuyệt đẹp. Du khách sẽ được trải nghiệm cáp treo đạt nhiều kỷ lục thế giới, chiêm ngưỡng làng Pháp cổ kính và các khu vui chơi giải trí đẳng cấp quốc tế. Không chỉ vậy, nơi đây còn là sự kết hợp hoàn hảo giữa vẻ đẹp thiên nhiên và kiến trúc, mang lại cho du khách những khoảnh khắc thư giãn và đầy hứng khởi.</p></div>
            </div>
            <div className="discovery-content">
                <img src={Da_Nang3} alt="DaNang"/>
                <div className="discovery" >
                    <h2>Cầu Rồng - Sức sống hiện đại của Đà Nẵng</h2>
                    <p>Cầu Rồng, biểu tượng năng động của Đà Nẵng, là một trong những cây cầu độc đáo nhất Việt Nam. Với thiết kế hình rồng vàng uốn lượn, cây cầu biểu trưng cho sự phát triển mạnh mẽ và thịnh vượng của thành phố. Vào cuối tuần, màn trình diễn phun lửa và phun nước từ rồng thu hút hàng ngàn người dân và du khách đến chiêm ngưỡng. Cầu Rồng không chỉ là công trình kiến trúc ấn tượng mà còn là niềm tự hào của người dân Đà Nẵng.</p></div>
            </div>
            <button type="submit" className="submit-btn" style={{width: "20%", padding: "2% 0", marginBottom: "2%", marginTop: "0"}} onClick={()=>{navigate('/')}}>VỀ TRANG CHỦ</button>
        </div>
    );
}

export default DaNang;