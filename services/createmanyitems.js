const db = require('../database');

const createManyItemsService = (items) => {
    return db.Stock.bulkCreate(items);
  };

module.exports = { createManyItemsService };