const bcrypt = require('bcryptjs');
const db = require('../database');
const User = db.User;

async function registerUser(username, password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
        username,
        password: hashedPassword
    });
    return newUser;
}

module.exports = {
    registerUser
};
