const { loginUser } = require('../services/login');

const login = async (req, res) => {
    const { username, password } = req.body;
    const result = await loginUser(username, password);
    if (result.error) {
        const status = result.error === 'User not found' || result.error === 'Invalid credentials' ? 401 : 500;
        return res.status(status).send(result.error);
    }
    res.json({ token: result.token });
};

module.exports = { login }