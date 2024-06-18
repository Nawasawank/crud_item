const { createOneItemService } = require('../services/createoneitem');
const db = require('../database');

const createOneItem = async (req, res) => {
    const { product_code, asset, department, price, document, document_ref, pr_creator, importer, name_list, status } = req.body;
    let { product_name, product_details } = req.body;
    const createdBy = req.user.id;

    product_name = product_name.toLowerCase();

    try {
        const product = await db.Product.findOne({ where: { product_name } });
    
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        const newItemData = {
            product_code,
            asset,
            product_name,
            product_details,
            department,
            price,
            document,
            document_ref,
            pr_creator,
            importer,
            name_list,
            status,
            created_by: createdBy,
            product_id: product.id
        };

        let stock = await createOneItemService(newItemData);
        res.status(201).send(stock);

    } catch (error) {
        console.error("Error creating stock item:", error);
        res.status(500).send({ message: "Error creating new stock item" });
    }
};

module.exports = { createOneItem };




