const db = require('../database');

const addproductservice = (items) => {
    return db.Product.bulkCreate(items);
  };

module.exports = { addproductservice };