const { Router } = require("express");
const { createOneItem } = require('../controllers/createoneitem');
const { createManyItems } = require('../controllers/createmanyitems');
const { getItemById } = require('../controllers/getoneitembyid');
const { getAllItems } = require('../controllers/item');
const { updateItem } = require('../controllers/updateitem');
const { deleteStockItem } = require('../controllers/softdelete')
const { authenticateToken} = require('../controllers/auth')
const { login } = require('../controllers/login')
const { register} = require('../controllers/register')

const route = Router()

route.post('/register', register);
route.post('/login', login);

route.post('/createoneitem', authenticateToken, createOneItem);
route.post('/createmanyitems', authenticateToken, createManyItems);
route.get('/getoneitembyid', authenticateToken, getItemById);
route.get('/items', authenticateToken, getAllItems);
route.put('/updateitem', authenticateToken, updateItem);
route.delete('/softdelete', authenticateToken, deleteStockItem);

module.exports = route

