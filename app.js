//import de terceros
require('dotenv').config();

//import codigo propio
const Server = require('./models/server');


//Creamos una instancia del server.
const server = new Server();

//Arrancamos el server
server.start();


