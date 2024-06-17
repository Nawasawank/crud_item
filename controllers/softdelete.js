const { softDeleteItemService } = require('../services/softdelete');

const deleteStockItem = async (req, res) => {
    const { id } = req.body; 

    try {
        const result = await softDeleteItemService(id);
        if (result === 0) {
            return res.status(404).send({ message: 'Stock item not found' });
        }
        res.send({ message: 'Stock item deleted successfully' });
    } catch (error) {
        console.error('Error deleting stock item:', error);
        res.status(500).send({ message: 'Error deleting stock item' });
    }
};

module.exports = { deleteStockItem };
