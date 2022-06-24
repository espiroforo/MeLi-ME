const express = require('express');
const cors = require('cors');

const corsOptions = require('../config/corsConfig');
const routesProducto = require('../routes/producto.routes');
const routesItem = require('../routes/item.routes');
const { verifyToken } = require('../services/verifyToken');
const { logger } = require('../tools/logger');
const { endMiddleware } = require('../tools/logout');

class Server{
    
    constructor(){
        //Seteo del server express
        this.app = express();
        this.port = process.env.PORT;
        this.productoPath = '/api/producto/';
        this.itemPath = '/api/item/';

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
        
    };

    middlewares(){
        //Verify token
        this.app.use(verifyToken);


        //Logger
        this.app.use(logger);
        this.app.use(endMiddleware);
        
        //CORS
        this.app.use(cors(corsOptions));
        
        //lectura y parseo de JSON
        this.app.use(express.json());

        //Directorio publico
        this.app.use( express.static('public'));
    };

    routes(){
        this.app.use(this.productoPath, routesProducto);
        this.app.use(this.itemPath, routesItem);
    };
    
    start(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        });
    
    };
};

module.exports = Server;