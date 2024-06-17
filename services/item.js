const { Op } = require('sequelize');
const db = require('../database');

const Stock = db.Stock;
const User = db.User;

const getAllItemsService = async (page, pageSize, search, startDate, endDate, minPrice, maxPrice, userId, username) => {
    const limit = pageSize;
    const offset = (page - 1) * pageSize;

    try {
        const stockWhereClause = {
            deletedAt: null,
        };

        if (search) {
            stockWhereClause.product_name = {
                [Op.like]: `%${search}%`,
            };
        }

        if (startDate && endDate) {
            stockWhereClause.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        if (minPrice && maxPrice) {
            stockWhereClause.price = {
                [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)]
            };
        } else if (minPrice) {
            stockWhereClause.price = {
                [Op.gte]: parseFloat(minPrice)
            };
        } else if (maxPrice) {
            stockWhereClause.price = {
                [Op.lte]: parseFloat(maxPrice)
            };
        }

        if (userId) {
            stockWhereClause.created_by = userId;
        }

        const userWhereClause = {};
        if (username) {
            userWhereClause.username = {
                [Op.like]: `%${username}%`
            };
        }

        const { count, rows } = await Stock.findAndCountAll({
            where: stockWhereClause,
            include: [{
                model: User,
                as: 'creator',
                attributes: ['username'],
                where: userWhereClause
            }],
            limit: limit,
            offset: offset,
            logging: console.log
        });

        return {
            count: count,
            rows: rows,
            page: page,
            totalPages: Math.ceil(count / limit),
        };
    } catch (error) {
        throw new Error('Error fetching paginated items: ' + error.message);
    }
};

module.exports = { getAllItemsService };

















