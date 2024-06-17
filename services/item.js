const db = require('../database');

const getAllItemsService = (page, pageSize) => {
    const limit = pageSize;
    const offset = (page - 1) * pageSize;

    return db.Stock.findAndCountAll({
        limit,
        offset
    });
};

module.exports = { getAllItemsService };

