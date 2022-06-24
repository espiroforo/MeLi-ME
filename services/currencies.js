const axios = require('axios');

const getCurrency = async (currency_id) => {
    const meliUrlBase = 'https://api.mercadolibre.com/'
    const urlCurrency = `${meliUrlBase}currencies/${currency_id}`;

    try {
      const response = await axios.get(urlCurrency);
      return response.data;
      
    } catch (error) {
      console.error(error);
    }
}






module.exports = getCurrency;