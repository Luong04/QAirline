const validateLogin = require('../services/authServices');

const getLoginRequire = async (req, res) => {
    //tat ca cac response deu phai tra ve json, khong dieu huong trong back_end, front end se  xu lý nhung cai day
    const { username, password } = req.body;
    const data = await validateLogin(username, password);
    if(data.status === 'username_not_found') {
        return res.status(404).json({ error: 'Username not found' });
        //return res.redirect('/login')
    }
    if(data.status === 'wrong_password') {
        //return res.redirect('/login')
        return res.status(404).json({ error: 'Wrong password' });
    }
    if(data.status === 'success') {
        req.session.authenticated = true;
        req.session.user = { username, role: "admin" }; // Lưu thông tin người dùng trong session
        //gọi getAdminPage chỉ để test, sau này sẽ thay dòng trên thành dòng dưới
        //res.redirect('/admin')
        return res.status(200).json({ message: 'Login successful', role: "admin"});
    }    
}

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('An error occurred');
        }
        return res.status(200).json({ message: 'Logout successful'});
    });
};

module.exports = {
    getLoginRequire, logout
}