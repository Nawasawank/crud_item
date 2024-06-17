const { getItemByIdService } = require('../services/getoneitembyid');

const getItemById = async (req, res) => {
    const { id } = req.body; 

    try {
        const item = await getItemByIdService(id);
        if (!item) {
            return res.status(404).send({ message: "Item not found" });
        }
        res.send(item);
    } catch (error) {
        console.error("Error retrieving stock item:", error);
        res.status(500).send({ message: "Error retrieving stock item" });
    }
};

module.exports = { getItemById };
