const { createOneItemService } = require('../services/createoneitem');

const createOneItem = async (req, res) => {
    const { product_code, asset, product_name, product_details, department, price, document, document_ref, pr_creator, importer, name_list, status } = req.body;
    
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
      status
    };

    try {
        let stock = await createOneItemService(newItemData);
        res.status(201).send(stock);
    } catch (error) {
        console.error("Error creating stock item:", error);
        res.status(500).send({ message: "Error creating new stock item" });
    }
};

module.exports = { createOneItem };

