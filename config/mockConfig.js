const mocks = {
  producto: {
    paging: {
      total: 987,
      offset: 1000,
      limit: 1
    },
    categories: [
      "MLX1714",
      "MLX447782",
      "MLX30994"
    ],
    items: [
      {
        id: "MLX917568158",
        title: "Mouse De Chocolate",
        price: {
            currency: "Peso argentino",
            amount: 4569,
            decimals: 2
        },
        picture: "http://http2.mlstatic.com/D_812768-MLC32146214450_092019-I.jpg",
        condition: "new",
        free_shipping: true
      },
      {
        id: "MLX1121239849",
        title: "Silla De Escritorio Good Game",
        price: {
            currency: "Peso argentino",
            amount: 399,
            decimals: 2
        },
        picture: "http://http2.mlstatic.com/D_858597-MLA45295107919_032021-I.jpg",
        condition: "new",
        free_shipping: true
      },
      {
        id: "MLX929398622",
        title: "Cornalitos Marplatenses",
        price: {
            currency: "Peso argentino",
            amount: 9,
            decimals: 2
        },
        picture: "http://http2.mlstatic.com/D_976958-MLA461341232487_072021-I.jpg",
        condition: "new",
        free_shipping: false
      }
    ]
  },
  item: {
    author: {
      nickname: "UNJOHNDOECUALQUIERA"
    },
    item: {
      id: "MLX857412337",
      title: "Pecera Inalabrica de lujo",
      price: {
        currency: "Peso argentino",
        amount: 4899,
        decimals: 2
      },
      picture: "http://http2.mlstatic.com/D_637684-MLX32112335810_092019-I.jpg",
      condition: "new",
      free_shipping: true,
      sold_quantity: 500,
      description: "Pecera inalammbrica para peces selectos."
    }
  },
}


module.exports = { mocks };