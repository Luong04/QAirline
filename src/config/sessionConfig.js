const session = require('express-session');

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'your_secret_key', // Đảm bảo đặt trong file .env
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Chỉ bật `true` nếu dùng HTTPS
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 24 giờ
    },
});

module.exports = sessionMiddleware;