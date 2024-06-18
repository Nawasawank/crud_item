const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../database');
const User = db.User;

async function loginUser(username, password) {
    const user = await User.findOne({ where: { username } });
    if (!user) {
        return { error: 'User not found' };
    }

    const isMatch = await (password = user.password)
    if (!isMatch) {
        return { error: 'Invalid credentials' };
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '3d' });
    return { token };
}

module.exports = {
    loginUser
};



