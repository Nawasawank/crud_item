const db = require('../database');

const softDeleteItemService = (id) => {
  return db.Stock.destroy({
    where: { id }
  });
};

module.exports = { softDeleteItemService };
