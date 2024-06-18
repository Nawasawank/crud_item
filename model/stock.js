module.exports = (sequelize, Sequelize) => {
  const Stock = sequelize.define('Stock', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    asset: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    product_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    product_details: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    department: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    document: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    document_ref: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pr_creator: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    importer: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    datetime_import: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    name_list: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    datetime: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    deletedAt: { 
      type: Sequelize.DATE,
      allowNull: true
    },
    created_by: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'User', 
        key: 'id', 
      },
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Product',
        key: 'id',
      }
    }
  }, {
    timestamps: true,  
    paranoid: true      
  });

  Stock.associate = (models) => {
    Stock.belongsTo(models.User, {
      foreignKey: 'created_by',
      as: 'creator',
    });
    Stock.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product'
    });
  };

  return Stock;
};




