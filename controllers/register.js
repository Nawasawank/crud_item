const { registerUser } = require('../services/register');

const register = async (req, res) => {
    const { username, password } = req.body;
    const result = await registerUser(username, password);
    if (result.error) {
        return res.status(500).send(result.error);
    }
    res.status(201).send(result.message);
};

module.exports = { register }
