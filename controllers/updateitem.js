const { updateItemService } = require('../services/updateitem');

const updateItem = async (req, res) => {
    const { id } = req.query;
    const {
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
    } = req.body;

    const updateData = {
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
        const [updatedCount, updatedRows] = await updateItemService(id, updateData);
        if (updatedCount === 0) {
            return res.status(404).send({ message: "Item not found or no update needed" });
        }
        res.send({
            message: "Item updated successfully",
            item: updatedRows[0]
        });
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).send({ message: "Error updating the item" });
    }
};

module.exports = { updateItem };

