require('dotenv').config();
const Airport = require('../entity/airports');
const Plane = require('../entity/planes');
const Customer = require('../entity/customers');
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const Flight = require('../entity/flights');


// Route gửi email
const createEmailforBooking = async ( to, subject, text, dataTickets, new_customer, new_booking) => {
    const font = "./src/utils/font";
    const pdfName = "Thông tin đặt vé máy bay.pdf";
    const booking_code = new_booking.booking_id;
    const booking_date = new_booking.booking_date;
    const fullname = new_customer.first_name +" " + new_customer.last_name;
    const date_of_birth = new_customer.date_of_birth;
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(pdfName);
    doc.pipe(writeStream);

    // Thêm nội dung vào PDF
    doc.font(`${font}/Roboto-Bold.ttf`).fontSize(25).text("VÉ MÁY BAY", { align: "center" });
    doc.moveDown();
    doc.font(`${font}/Roboto-Light.ttf`).fontSize(14).text("Kính gửi quý khách hàng, \n Xin trân trọng cảm ơn quý khách đã lựa chọn sử dụng dụng dịch vụ vận tải hành khách của Công ty LKT. Quý khách đã thực hiện mua vé thành công với thông tin như sau:", { align: "left" });
    doc.moveDown();
    doc.font(`${font}/Roboto-Black.ttf`).fontSize(14).text(" Thông tin người đặt vé:\n", { align: "left" });
    doc.font(`${font}/Roboto-Light.ttf`).fontSize(14).text(`     Họ tên: ${fullname}\n`, { align: "left" });
    doc.font(`${font}/Roboto-Light.ttf`).fontSize(14).text(`     Ngày sinh: ${date_of_birth}\n`, { align: "left" });
    for(let i = 0 ; i < dataTickets.length; i++) {
        // Tạo đường thẳng
        const flight = await Flight.findByPk(dataTickets[i].flight_id);
        const plane = await Plane.findByPk(flight.plane_id);
        const dairport = await Airport.findByPk(flight.departure_airport_id);
        const aairport = await Airport.findByPk(flight.arrival_airport_id);
        const plane_model = plane.model;
        const dairport_name = dairport.name;
        const aairport_name = aairport.name;
        const departure_time = flight.departure_time;
        const seat = dataTickets[i].seat_number;
        const type = dataTickets[i].class;
        const price = dataTickets[i].price;
        const code = dataTickets[i].ticket_id;
        const passenger_id = dataTickets[i].customer_id;
        const passenger = await Customer.findByPk(passenger_id);
        const passenger_name = passenger.first_name + " " + passenger.last_name;
        // Lấy phần ngày
        const datePart = departure_time.toISOString().split("T")[0]; // YYYY-MM-DD
        // Lấy phần giờ
        const timePart = departure_time.toTimeString().split(" ")[0]; // HH:MM:SS
        doc.font(`${font}/Roboto-Black.ttf`).fontSize(13).text(" Thông tin hành trình:\n", { align: "left" });
        doc.font(`${font}/Roboto-Light.ttf`).fontSize(14).text(`     Sân bay đi - Sân bay đến: ${dairport_name} - ${aairport_name}\n`, { align: "left" });
        doc.font(`${font}/Roboto-Light.ttf`).fontSize(14).text(`     Hãng bay: ${plane_model}\n`, { align: "left" });
        doc.font(`${font}/Roboto-Light.ttf`).fontSize(14).text(`     Ngày đi: ${datePart}\n`, { align: "left" });
        doc.font(`${font}/Roboto-Light.ttf`).fontSize(14).text(`     Giờ khởi hành: ${timePart}\n`, { align: "left" });
        doc.font(`${font}/Roboto-Light.ttf`).fontSize(14).text(`     Ghế: ${seat}\n`, { align: "left" });
        doc.font(`${font}/Roboto-Light.ttf`).fontSize(14).text(`     Loại vé: ${type}\n`, { align: "left" });
        doc.font(`${font}/Roboto-Light.ttf`).fontSize(14).text(`     Giá vé: ${price}\n VNĐ`, { align: "left" });
        doc.font(`${font}/Roboto-Light.ttf`).fontSize(14).text(`     Mã vé: ${code}\n`, { align: "left" });
        doc.font(`${font}/Roboto-Black.ttf`).fontSize(13).text("Thông tin hành trình:\n", { align: "left" });
        doc.font(`${font}/Roboto-Light.ttf`).fontSize(14).text(`     Tên hành khách : ${passenger_name}\n`, { align: "left" });
        doc.font(`${font}/Roboto-Light.ttf`).fontSize(14).text(`     Căn cước công dân : ${passenger_id}\n`, { align: "left" });
        doc.moveDown(2);
    }
    doc.font(`${font}/Roboto-Light.ttf`).fontSize(14).text(` Mã đặt chỗ: ${booking_code}\n`, { align: "left" });
    doc.font(`${font}/Roboto-Light.ttf`).fontSize(14).text(` Ngày đặt: ${booking_date}\n`, { align: "left" });
    doc.moveDown();
    doc.font(`${font}/Roboto-BoldItalic.ttf`)
        .fontSize(14) 
        .text("LƯU Ý: Bạn chỉ có thể trả vé trước 72 giờ máy bay khởi hành",{ align: "left" });
    doc.moveDown();
    doc.font(`${font}/Roboto-MediumItalic.ttf`)
        .fontSize(18) 
        .text("QAirline - Vui từng chuyến bay",{ align: "center" });
    doc.end();

    // Cấu hình tài khoản email
    writeStream.on("finish", async () => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
            user: process.env.EMAIL_USERNAME, // Thay bằng email của bạn
            pass: process.env.EMAIL_PASSWORD, // Thay bằng mật khẩu ứng dụng
            },
        });
    
        // Cấu hình email
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: to, // Email người nhận
            subject: subject, // Tiêu đề email
            text: text, // Nội dung email
            attachments: [
                {
                  filename: pdfName,
                  path: `./${pdfName}`, // Đường dẫn đến file PDF
                },
            ],
        };
    
        try {
            const info = await transporter.sendMail(mailOptions);
            fs.unlinkSync(pdfName);
            console.log("Email sent: " + info.response);
        } catch (error) {
            fs.unlinkSync(pdfName);
            console.error("Error sending email:", error);
        }
    });
}

module.exports = {
    createEmailforBooking
}