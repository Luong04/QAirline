import React from "react";
import "./HoiAn.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import Hoi_An from "../../assets/image/Hoi_An.jpg";
import Hoi_An2 from "../../assets/image/Hoi_an2.jpg";
import Hoi_An3 from "../../assets/image/Hoi_An3.jpg";

const HoiAn = () => {
    const navigate = useNavigate(); // Sử dụng để điều hướng
    return (
        <div>
            <div className="header-checkBooking">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <h2>KHÁM PHÁ ĐỊA ĐIỂM PHỔ BIẾN</h2>
            </div>
            <div className="placediscovery"><h2>Hội An - Di sản văn hóa thế giới</h2></div>
            <div className="discovery-content">
                <img src={Hoi_An} alt="HoiAn"/>
                <div className="discovery">
                    <h2> Vẻ đẹp cổ kính của phố cổ Hội An</h2>
                    <p>
                    Hội An là một thành phố nhỏ nằm ở tỉnh Quảng Nam, Việt Nam, nổi tiếng với phố cổ được UNESCO công nhận là Di sản Văn hóa Thế giới. Những con đường nhỏ lát gạch, những ngôi nhà cổ mái ngói nhuốm màu thời gian, và những chiếc đèn lồng rực rỡ sắc màu tạo nên một không gian vừa thơ mộng, vừa trầm mặc. Mỗi góc phố đều lưu giữ nét kiến trúc độc đáo, pha trộn giữa văn hóa Việt Nam, Trung Hoa và Nhật Bản, mang lại cho du khách cảm giác như đang lạc vào một thế giới xưa cũ.</p>
                </div>
            </div>
            <div className="discovery-content">
                <img src={Hoi_An3}  alt="HoiAn3" />
                <div className="discovery">
                    <h2>Hội An – Nơi giao thoa văn hóa ẩm thực</h2>
                    <p>Không chỉ hấp dẫn bởi cảnh đẹp, Hội An còn là thiên đường của ẩm thực đường phố. Từ món cao lầu đặc trưng với sợi mì dai ngon, thịt xá xíu đậm đà, đến những chiếc bánh mì Hội An thơm phức, tất cả đều khiến thực khách mê mẩn. Hương vị món ăn tại đây mang đậm nét giao thoa văn hóa, kết hợp hài hòa giữa truyền thống Việt và ảnh hưởng quốc tế từ thời kỳ thương cảng sầm uất.</p>
                </div>
            </div>
            <div className="discovery-content">
                <img src={Hoi_An2}  alt="HoiAn2"/>
                <div className="discovery">
                    <h2>Hội An - Điểm đến của những trải nghiệm đáng nhớ</h2>
                    <p>Khi đêm xuống, phố cổ Hội An trở nên lung linh với hàng nghìn chiếc đèn lồng thắp sáng, tạo nên khung cảnh huyền ảo khó quên. Du khách có thể thả hoa đăng trên sông Hoài, ngắm nhìn dòng nước phản chiếu ánh sáng rực rỡ. Hội An cũng nổi tiếng với các hoạt động như dệt vải, làm gốm và học nấu ăn, mang lại cho du khách cơ hội tìm hiểu sâu sắc hơn về văn hóa và đời sống người dân địa phương.</p>
                </div>
            </div>
            <button type="submit" className="submit-btn" style={{width: "20%", padding: "2% 0", marginBottom: "2%", marginTop: "0"}} onClick={()=>{navigate('/')}}>VỀ TRANG CHỦ</button>
        </div>
    );
}

export default HoiAn;