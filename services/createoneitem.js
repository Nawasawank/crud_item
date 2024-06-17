const db = require('../database');

const createOneItemService = (newItemData) => {
  return db.Stock.create(newItemData);
};

module.exports = { createOneItemService };

