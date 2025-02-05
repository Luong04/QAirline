import React from "react";
import "../../styles/adminpage/RankTable.css";

const RankTable = () => {
  return (
    <div className="rank-table">
      <h2 style={{ margin: "0" }}>
        Bảng xếp hạng địa điểm được đến nhiều nhất
      </h2>
      <table className="rank-table-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Địa điểm</th>
            <th>Số vé bán được</th>
            <th>Doanh thu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Hà Nội</td>
            <td>100,000 vé</td>
            <td>100,000,000 VND</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Đà Nẵng</td>
            <td>80,000 vé</td>
            <td>80,000,000 VND</td>
          </tr>
          <tr>
            <td>3</td>
            <td>TP.Hồ Chí Minh</td>
            <td>70,000 vé</td>
            <td>70,000,000 VND</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Hạ Long</td>
            <td>60,000 vé</td>
            <td>60,000,000 VND</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Đà Lạt</td>
            <td>50,000 vé</td>
            <td>50,000,000 VND</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RankTable;
