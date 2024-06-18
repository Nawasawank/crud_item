module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('Product', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {
      tableName: 'Product', 
      freezeTableName: true
    });
  
    return Product;
};

  