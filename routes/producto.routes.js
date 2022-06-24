//Solo traigo el router de express.
const { Router } = require('express');

//Importo los controladores
const {productoGet, productoPost, productoNulo} =require('../controllers/producto.controller');



//Instancio el router
const routerProducto = Router();


//GET productos
routerProducto.get('/', productoGet);

//Resto productos
routerProducto.all('/', productoNulo);



module.exports = routerProducto;