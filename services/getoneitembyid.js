const db = require('../database');

const getItemByIdService = (id) => {
    return db.Stock.findByPk(id); 
};

module.exports = { getItemByIdService };
