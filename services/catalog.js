const { Op } = require('sequelize');
const db = require('../database');
const Stock = db.Stock;
const Product = db.Product;

const getCatalogItemsService = async (category, page, pageSize) => {
    const limit = pageSize;
    const offset = (page - 1) * pageSize;

    const productWhereClause = category ? { 
        category: {
            [Op.like]: `%${category}%`
        }
    } : {};

    try {
        const { count, rows } = await Stock.findAndCountAll({
            include: [{
                model: Product,
                as: 'product',
                where: productWhereClause,
                attributes: [ 'category'] 
            }],
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']],
            logging: console.log
        });

        return { count, rows, page, totalPages: Math.ceil(count / limit) };
    } catch (error) {
        throw new Error('Error fetching catalog items: ' + error.message);
    }
};

module.exports = { getCatalogItemsService };

