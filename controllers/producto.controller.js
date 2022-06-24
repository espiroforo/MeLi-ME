//Importo el response para poder tener el autocompletado
const {request, response} = require('express');
const axios = require('axios');

const { mocks } = require('../config/mockConfig');
const getCurrency = require('../services/currencies');
const sitesAllowed = require('../config/sitesConfig');
const filterAllowed = require('../config/filterConfig');

const meliUrlBase = 'https://api.mercadolibre.com/sites/'


const productoGet = async (req = request, res = response ) => {
    try {
        if(!req.mock){
            const {search, limit, offset, sort, site} = req.query;
            
            //Chequeo que la variable a buscar tenga un valor y no sea indefinida.
            //Habria que hablar con seguridad para ver si antes o despues se escapan caracteres peligrosos para una inyeccion.
            if( search && search.trim() !== ''){
                
                //Chequeo que exista "site" y sea uno de los 3 posible. (Podria hacerse con RexExp, pero son solo 3)
                //De todas maneras el endpoint hace validacion
                if( site && sitesAllowed.includes(site.toUpperCase())){

                    //setear la url a consultar
                    const limite = limit && Number.isInteger(Number.parseInt(limit)) ? '&limit='+limit : '';
                    const off = offset && Number.isInteger(Number.parseInt(offset)) ? '&offset='+offset : '';
                    
                    //SI existe sort y esta en los filtros permitidos se incluye, sino ordena por default (Podria restringirse tambien a que sea obligatorio.)
                    const orden = sort && filterAllowed.includes(sort.toLowerCase()) ? '&sort='+sort : '';

                    //Armo la URL a consultar
                    const urlRequested = `${meliUrlBase}${site.toUpperCase()}/search?q=${search}${orden}${limite}${off}`;

                    //realizo la busqueda en el endpoint
                    const salidaBusqueda = await axios.get(urlRequested);
                    
                    //gestiono los datos para obtener la salida de meli.
                    const paging = salidaBusqueda.data.paging;
                    delete paging.primary_results;

                    let categorias = [];

                    const items = await Promise.all(
                        salidaBusqueda.data.results.map( async x => {
                            const {id, title, price, thumbnail, condition, shipping, currency_id, category_id} = x    
                            const {free_shipping} = shipping;
                        
                            //Traigo la informacion de la moneda.
                            const salidaCurrency = await getCurrency(currency_id);  
                            const {description, decimal_places} =  salidaCurrency;  
                            categorias.push(category_id);
                            return await {id, title, price:{currency:description, amount:price, decimals:decimal_places}, picture:thumbnail, condition, free_shipping};
                    }));
                    
                    //quito los duplicados. (podria buscarse el detalle de la categoria en otra API "products")
                    var uniqueCat = [...new Set(categorias)]
                    
                    //Envio la respuesta satisfactoria.
                    res.status(200).json({
                        paging,
                        categories: uniqueCat,
                        items,
                    });

                }else{
                    //El site no es permitido
                    res.status(400).json({
                        error: 'Bad request',                    
                        message: 'This host is not serving this site.'
                    });
                }
            }else{
                //El search no es permitido o esta vacio
                res.status(400).json({
                    error: 'Bad request',                    
                    message: 'The search string is not allowed.'
                });
            }
        }else{
            res.status(200).json(
                mocks.producto
            );
        }
    } catch (error) {
        //ver el error
        res.status(error.response.data.status).json({
            code: error.response.data.error,
            msg: error.response.data.message,
        });
    }      
}

const productoPost = (req, res = response) => {
    //Lo dejo por si hiciera falta a futuro armar el POST.
    const body = req.body;

    res.status(200).json({
        msg:'Estas buscando un producto!!! pero en POST',
    });
}

const productoNulo = (req, res = response) => {
    res.status(404).send('NO se puede usar este metodo HTTP en esta API.');
}

module.exports = {
    productoGet,
    productoPost,
    productoNulo,
};
