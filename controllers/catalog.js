const { getCatalogItemsService } = require('../services/catalog');

const getCatalogItems = async (req, res) => {
    const { category, page = 1, pageSize = 10 } = req.query;

    try {
        const { count, rows, totalPages } = await getCatalogItemsService(category, parseInt(page), parseInt(pageSize));

        if (!category) {
            const groupedProducts = rows.reduce((acc, item) => {
                const cat = item.product.category; 
                if (!acc[cat]) {
                    acc[cat] = [];
                }
                acc[cat].push({
                    productCode: item.product_code,
                    productName: item.product.product_name,
                    price: item.price,
                    details: item.product_details,
                    status: item.status,
                    createdAt: item.createdAt.toISOString().split('T')[0],
                });
                return acc;
            }, {});

            res.send({
                categories: groupedProducts,
                count,
                totalPages,
                currentPage: parseInt(page)
            });
        } else {
            const categorizedProducts = rows.map(item => ({
                productCode: item.product_code,
                productName: item.product.product_name,
                price: item.price,
                details: item.product_details,
                status: item.status,
                createdAt: item.createdAt.toISOString().split('T')[0],
            }));

            res.send({
                categorical: category,
                products: categorizedProducts,
                count,
                totalPages,
                currentPage: parseInt(page)
            });
        }
    } catch (error) {
        console.error("Error retrieving catalog items:", error);
        res.status(500).send({ message: "Error retrieving catalog items" });
    }
};

module.exports = { getCatalogItems };



