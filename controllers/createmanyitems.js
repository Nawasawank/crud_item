const { createManyItemsService } = require('../services/createmanyitems');
const db = require('../database');

const createManyItems = async (req, res) => {
    const createdBy = req.user.id;

    try {
        const stockItems = await Promise.all(req.body.map(async item => {
            const normalizedProductName = item.product_name.toLowerCase();
            const product = await db.Product.findOne({
                where: { product_name: normalizedProductName }
            });

            if (!product) {
                throw new Error(`Product not found for name: ${item.product_name}`);
            }

            return {
                product_code: item.product_code,
                asset: item.asset,
                product_name: item.product_name,
                product_details: item.product_details,
                department: item.department,
                price: item.price,
                document: item.document,
                document_ref: item.document_ref,
                pr_creator: item.pr_creator,
                importer: item.importer,
                name_list: item.name_list,
                status: item.status,
                product_id: product.id,
                created_by: createdBy
            };
        }));
        const stocks = await createManyItemsService(stockItems);
        res.status(201).send(stocks);
    } catch (error) {
        console.error("Error creating stock items:", error);
        if (error.message.includes("Product not found")) {
            return res.status(404).send({ message: error.message });
        }
        res.status(500).send({ message: "Error creating new stock items" });
    }
};

module.exports = { createManyItems };

