//Importo el response para poder tener el autocompletado
const {request, response} = require('express');
const axios = require('axios');

const { mocks } = require('../config/mockConfig');
const getCurrency = require('../services/currencies');

const meliUrlBase = 'https://api.mercadolibre.com/'

const itemGet = async (req, res = response) => {
    try {
        if(!req.mock){
            const idUrl = req.params.id;

            //Chequeamos que sea un id alfanumerico.
            if((/^[a-zA-Z0-9\.]*$/i).test(idUrl)){
                //traigo la informacion del item
                const urlItem = `${meliUrlBase}items/${idUrl}`;
                const salidaItem = await axios.get(urlItem);

                //me quedo solo con la info que preciso.
                const {id, title, seller_id, price, currency_id, thumbnail, condition, shipping, sold_quantity} = salidaItem.data;
                const {free_shipping} = shipping;        

                //Traigo la descripcion del item
                const urlItemDescription = `${meliUrlBase}items/${idUrl}/description`;
                const salidaDescripcion = await axios.get(urlItemDescription);
                //me quedo solo con la descripcion.
                const {plain_text} =  salidaDescripcion.data;
                
                //Traigo la informacion de la moneda.
                const salidaCurrency = await getCurrency(currency_id);  
                //me quedo solo con la info que necesito.
                const {description, decimal_places} =  salidaCurrency;     

                //Traigo la informacion del usuario
                const urlUser = `${meliUrlBase}users/${seller_id}`;
                const salidaUser = await axios.get(urlUser);
                //me quedo solo con el nick
                const {nickname} = salidaUser.data;

                //respondo satisfactoriamente.
                
                res.status(200).json({
                    author:{
                        nickname,
                    },
                    item:{
                        id,
                        title,
                        price:{
                            currency: description,
                            amount: price,
                            decimals: decimal_places,
                        },
                        picture: thumbnail,
                        condition,
                        free_shipping,
                        sold_quantity,
                        description: plain_text,
                    }
                });            
            }else{
                //El id del item no es alfanumerico o esta mal formado.
                res.status(400).json({
                    error: 'Bad request',                    
                    message: 'The item id string is not allowed.'
                });
            }
        }else{
            res.status(200).json(
                mocks.item
            );
        }
    } catch (error) {
        //ver el error
        //console.log(error)
        res.status(error.response.data.status).json({
            code: error.response.data.error,
            msg: error.response.data.message,
        });
    }        
    
}

const itemPost = (req, res) => {
    //Lo dejo por si hiciera falta a futuro armar el POST.
    res.status(200).json({
        msg:'Estas buscando un item!!! pero en POST',
    });
}

const itemNulo = (req, res = response) => {
    res.status(404).send('NO se puede usar este metodo HTTP en esta API.');
}

module.exports = {
    itemGet,
    itemPost,
    itemNulo,
};
