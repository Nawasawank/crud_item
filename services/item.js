const { Op } = require('sequelize');
const db = require('../database');

const Stock = db.Stock;
const User = db.User;

const getAllItemsService = async (page, pageSize, search, startDate, endDate, minPrice, maxPrice, userId, username) => {
    const limit = pageSize;
    const offset = (page - 1) * pageSize;

    try {
        const stockConditions = [];

        if (search) {
            stockConditions.push({
                product_name: {
                    [Op.substring]: `%${search}%`,
                }
            });
        }

        if (startDate && endDate) {
            stockConditions.push({
                createdAt: {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                }
            });
        } else if (startDate) {
            stockConditions.push({
                createdAt: {
                    [Op.gte]: new Date(startDate)
                }
            });
        } else if (endDate) {
            stockConditions.push({
                createdAt: {
                    [Op.lte]: new Date(endDate)
                }
            });
        }

        if (minPrice && maxPrice) {
            stockConditions.push({
                price: {
                    [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)]
                }
            });
        } else if (minPrice) {
            stockConditions.push({
                price: {
                    [Op.gte]: parseFloat(minPrice)
                }
            });
        } else if (maxPrice) {
            stockConditions.push({
                price: {
                    [Op.lte]: parseFloat(maxPrice)
                }
            });
        }

        if (userId) {
            stockConditions.push({
                created_by: userId
            });
        }

        const userConditions = [];
        if (username) {
            userConditions.push({
                username: {
                    [Op.like]: `%${username}%`
                }
            });
        }

        const whereClause = {
            [Op.and]: [
                { deletedAt: null },
                ...stockConditions 
            ]
        };

        const includeClause = {
            model: User,
            as: 'creator',
            attributes: ['username'],
            where: userConditions.length > 0 ? { [Op.or]: userConditions } : undefined
        };

        const { count, rows } = await Stock.findAndCountAll({
            where: whereClause,
            include: [includeClause],
            limit: limit,
            offset: offset,
            distinct: true,
            logging: console.log
        });

        return {
            count,
            rows,
            page,
            totalPages: Math.ceil(count / limit),
        };
    } catch (error) {
        throw new Error('Error fetching paginated items: ' + error.message);
    }
};

module.exports = { getAllItemsService };




















