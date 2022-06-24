//Solo traigo el router de express.
const { Router } = require('express');

//Importo los controladores
const {itemGet, itemNulo} =require('../controllers/item.controller');

//Instancio el router
const routerItem = Router();

//GET productos
routerItem.get('/:id', itemGet)

//Resto productos
routerItem.all('/', itemNulo)


module.exports = routerItem;