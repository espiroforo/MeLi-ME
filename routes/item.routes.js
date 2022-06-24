//Solo traigo el router de express.
const { Router } = require('express');

//Importo los controladores
const {itemGet, itemNulo} =require('../controllers/item.controller');

//Instancio el router
const routerItem = Router();

//GET productos
routerItem.get('/:id', itemGet)

//evito el resto de los metodos HTTP
routerItem.all('/:id', itemNulo)

//Resto productos
routerItem.all('/', itemNulo)


module.exports = routerItem;