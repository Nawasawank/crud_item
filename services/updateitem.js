const db = require('../database'); 


const updateItemService = (id, updateData) => {
    return db.Stock.update(updateData, {
        where: { id: id },
        returning: true,
    });
};

module.exports = { updateItemService };
