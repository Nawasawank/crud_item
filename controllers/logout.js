const jwt = require('jsonwebtoken');
const { addTokenToBlacklist } = require('../services/logout');
const { isTokenBlacklisted } = require('../services/logout');


const logout = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; 
    try {

        await addTokenToBlacklist(token);
        res.send({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).send({ message: 'Error logging out' });
    }
};

const checkLogout = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (await isTokenBlacklisted(token)) {
        return res.status(401).send({ message: 'User is not log in' });
    }
    next();
};

module.exports = { logout, checkLogout};
