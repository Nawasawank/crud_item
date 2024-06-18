const { Router } = require("express");
const { createOneItem } = require('../controllers/createoneitem');
const { createManyItems } = require('../controllers/createmanyitems');
const { getItemById } = require('../controllers/getoneitembyid');
const { getAllItems } = require('../controllers/item');
const { updateItem } = require('../controllers/updateitem');
const { deleteStockItem } = require('../controllers/softdelete');
const { authenticateToken } = require('../controllers/auth');
const { login } = require('../controllers/login');
const { register } = require('../controllers/register');
const { logout, checkLogout } = require('../controllers/logout');
const { addproduct } = require('../controllers/addproduct');
const { getCatalogItems } = require('../controllers/catalog')

const route = Router();

route.post('/register', register);
route.post('/login', login);
route.post('/logout', authenticateToken, logout);

route.post('/createoneitem', authenticateToken, checkLogout, createOneItem);
route.post('/createmanyitems', authenticateToken, checkLogout, createManyItems);
route.get('/getoneitembyid', authenticateToken, checkLogout, getItemById);
route.get('/items', authenticateToken, checkLogout, getAllItems);
route.put('/updateitem', authenticateToken, checkLogout, updateItem);
route.delete('/softdelete', authenticateToken, checkLogout, deleteStockItem);
route.post('/addproduct', addproduct);
route.get('/catalog',getCatalogItems)

module.exports = route;


