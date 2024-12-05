
const Admin = require('../entity/admins')
const {hashPassword} = require('../utils/hash')

const validateLogin = async (account, password) => {
    const admin = await Admin.findOne({ where: {username : account}});
    const hashedPassword = hashPassword(password);
    console.log(hashedPassword);
    if(!admin) {
        console.log('username not found');
        return { status: 'username_not_found' };
    }
    if(admin.password_hash === hashedPassword) {
        console.log('login success');
        return { status: 'success' };
    }
    console.log('wrong password');
    return { status: 'wrong_password' };
}

module.exports = validateLogin;