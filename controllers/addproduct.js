const { addproductservice } = require('../services/addproduct');


const addproduct = async (req, res) => {
    const items = req.body.map(item => ({
        product_name: item.product_name,
        category : item.category
    }));

    try {
        const product = await addproductservice(items);
        res.status(201).send(product);
    } catch (error) {
        console.error("Error creating stock items:", error);
        res.status(500).send({ message: "Error creating new stock items" });
    }
};

module.exports = { addproduct };