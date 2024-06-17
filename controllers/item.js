const { getAllItemsService } = require('../services/item');

const getAllItems = async (req, res) => {
    const { page = 1, pageSize = 10, search, startDate, endDate, minPrice, maxPrice, userId, username } = req.query;

    try {
        const { count, rows } = await getAllItemsService(
            parseInt(page),
            parseInt(pageSize),
            search,
            startDate,
            endDate,
            minPrice,
            maxPrice,
            userId,
            username
        );

        res.send({
            count: count,
            rows: rows,
            totalPages: Math.ceil(count / pageSize),
            currentPage: parseInt(page)
        });
    } catch (error) {
        console.error("Error retrieving items:", error);
        res.status(500).send({ message: "Error retrieving items" });
    }
};

module.exports = { getAllItems };




