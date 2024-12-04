-- Bảng Airports (Sân bay)
INSERT INTO Airports (name, city, country, code) VALUES
('Nội Bài', 'Hà Nội', 'Việt Nam', 'HAN'),
('Tân Sơn Nhất', 'Hồ Chí Minh', 'Việt Nam', 'SGN'),
('Đà Nẵng', 'Đà Nẵng', 'Việt Nam', 'DAD'),
('Phú Quốc', 'Phú Quốc', 'Việt Nam', 'PQC'),
('Changi', 'Singapore', 'Singapore', 'SIN');

-- Bảng Airlines (Hãng hàng không)
INSERT INTO Airlines (name, country) VALUES
('Vietnam Airlines', 'Việt Nam'),
('VietJet Air', 'Việt Nam'),
('Bamboo Airways', 'Việt Nam'),
('Singapore Airlines', 'Singapore'),
('Emirates', 'UAE');

-- Bảng Flights (Chuyến bay)
INSERT INTO Flights (airline_id, departure_airport_id, arrival_airport_id, departure_time, arrival_time, duration, status) VALUES
(1, 1, 2, '2024-12-01 07:00:00', '2024-12-01 09:00:00', '2:00', 'In Flight'),
(2, 2, 3, '2024-12-01 10:00:00', '2024-12-01 12:00:00', '2:00', 'Landed'),
(3, 3, 4, '2024-12-02 08:30:00', '2024-12-02 10:30:00', '2:00', 'Cancelled'),
(4, 4, 5, '2024-12-03 11:00:00', '2024-12-03 13:00:00', '2:00', 'In flight'),
(5, 5, 1, '2024-12-04 14:00:00', '2024-12-04 16:00:00', '2:00', 'Landed');

-- Bảng Customers (Khách hàng)
INSERT INTO Customers (first_name, last_name, email, phone, date_of_birth) VALUES
('Nguyễn', 'Văn A', 'nguyenvana@gmail.com', '0912345678', '1990-01-01'),
('Trần', 'Thị B', 'tranthib@gmail.com', '0923456789', '1985-02-02'),
('Lê', 'Quang C', 'lequangc@gmail.com', '0934567890', '1980-03-03'),
('Phạm', 'Thị D', 'phamthid@gmail.com', '0945678901', '1992-04-04'),
('Hoàng', 'Văn E', 'hoangvane@gmail.com', '0956789012', '1995-05-05');

-- Bảng Bookings (Đặt vé)
INSERT INTO Bookings (customer_id, booking_date, total_price, status) VALUES
(1, '2024-11-01', 1500, 'Đã thanh toán'),
(2, '2024-11-02', 1800, 'Chưa thanh toán'),
(3, '2024-11-03', 1200, 'Đã hủy'),
(4, '2024-11-04', 2000, 'Đã thanh toán'),
(5, '2024-11-05', 1700, 'Chưa thanh toán');

-- Bảng Tickets (Vé)
INSERT INTO Tickets (booking_id, flight_id, seat_number, class, price) VALUES
(1, 1, '12A', 'Phổ thông', 1500),
(2, 2, '10B', 'Thương gia', 1800),
(3, 3, '15C', 'Phổ thông', 1200),
(4, 4, '8D', 'Thương gia', 2000),
(5, 5, '20E', 'Phổ thông', 1700);

-- Bảng Payments (Thanh toán)
INSERT INTO Payments (booking_id, amount, payment_date, payment_method) VALUES
(1, 1500, '2024-11-01', 'Thẻ tín dụng'),
(2, 1800, '2024-11-02', 'PayPal'),
(4, 2000, '2024-11-04', 'Thẻ tín dụng'),
(5, 1700, '2024-11-05', 'PayPal');

-- Bảng Admins
INSERT INTO Admins (username, password_hash, email, full_name, created_at, last_login) VALUES
('admin1', 'hashedpassword1', 'admin1@example.com', 'Nguyễn Văn A', '2024-01-01 10:00:00', '2024-11-01 09:00:00'),
('admin2', 'hashedpassword2', 'admin2@example.com', 'Trần Thị B', '2024-01-02 11:00:00', '2024-11-02 10:00:00'),
