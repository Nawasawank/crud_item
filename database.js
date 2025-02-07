const Sequelize = require('sequelize');
const stockModel = require('./model/stock.js');
const userModel = require('./model/user.js'); 
const productModel = require('./model/product.js')

const sequelize = new Sequelize("crud_item", "root", "snsdforever9", {
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
    logging: false
});

sequelize.authenticate()
    .then(async () => {
        console.log("Connection has been established successfully.");
        await sequelize.sync({alter: true , drop:false});
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

let db = {};
db.sequelize = sequelize;
db.Stock = stockModel(sequelize, Sequelize); 
db.User = userModel(sequelize, Sequelize);
db.Product = productModel(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;


