const Sequelize = require('sequelize');
const userModel = require('./model/stock.js');
const userModule = require('./model/user.js'); 

const sequelize = new Sequelize("crud_item", "root", "snsdforever9", {
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
    logging: false
});

sequelize.authenticate()
    .then(async () => {
        console.log("Connection has been established successfully.");
        await sequelize.sync();
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

let db = {};
db.sequelize = sequelize;
db.Stock = userModel(sequelize, Sequelize); 
db.User = userModule(sequelize, Sequelize);

module.exports = db;

