const blacklist = new Set(); 

const addTokenToBlacklist = async (token) => {
    blacklist.add(token);
};

const isTokenBlacklisted = async (token) => {
    return blacklist.has(token);
};

module.exports = { addTokenToBlacklist, isTokenBlacklisted };
