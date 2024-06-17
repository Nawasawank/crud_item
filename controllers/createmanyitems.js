const { createManyItemsService } = require('../services/createmanyitems');


const createManyItems = async (req, res) => {
    const items = req.body.map(item => ({
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
        status: item.status
    }));

    try {
        const stocks = await createManyItemsService(items);
        res.status(201).send(stocks);
    } catch (error) {
        console.error("Error creating stock items:", error);
        res.status(500).send({ message: "Error creating new stock items" });
    }
};

module.exports = { createManyItems };
