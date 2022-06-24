![Mercadolibre Logo](/public/images/mercadolibre.png)

  MiddleEnd creado para evaluacion tecnica de Mercado Libre, para [node](http://nodejs.org).




## Características

  * Alta performance
  * Escalabilidad
  * Resiliencia



## Instalación

Este es un server hecho en [Node.js](https://nodejs.org/en/) disponible a traves de [npm registry](https://www.npmjs.com/).

Antes de la instalación, [descargar e instalar Node.js](https://nodejs.org/en/download/).
Node.js 0.10 o superior es requerido.

Además, clonar el repositorio desde github.

```console
$ mkdir meli-me
$ cd meli-me
$ git clone https://github.com/espiroforo/MeLi-ME.git
```

La instalación se realiza usando el [comando `npm install`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ cd meli-me
$ npm install
```

Encender el server

```console
$ npm start
```
Es posible acceder al server desde el localhost en: http://localhost:8080
Tambien hay una version disponible del servidor en: https://meli-me.herokuapp.com/



## Customizaciones

El puerto y los token de seguridad se encuentran en las variables de entorno dentro del archivo [.env]

```console
PORT=8080
TOKEN=xxxxxxxxxxxxxxx
MOCK=xxxxxxxxxxxxxxxx
```

Dentro de la carpeta **config** se encuentran varios archivos de configuración que se pueden modificar:

 * **corsConfig.js**, contiene una whitelist para que se pueda acceder desde determinados orígenes (por defecto estan configurados todos con el '*' y localhost)
 * **filterConfig.js**, contiene los filtros permitidos, pudiendo agregarse otros.
 * **mockConfig.js**, contiene un mock por API, ambos pueden ser customizados. También pueden agregarse futuros mocks.
 * **sitesConfig.js**, contiene los sites a los que la API de búsqueda puede ingresar.





### Ejemplos

Ejemplos para poder ejecutar en el endpoint:

```console
 http://localhost:8080/api/producto?search=**silla gamer redragon metis**&limit=**2**&sort=**PriCe_desc**&offset=**8**&site=**mla**
 
 http://localhost:8080/api/item/MLA857409237
```

#### Atributos API búsqueda
* *search* = (string) (**obligatorio**), cadena de texto con la búsqueda a realizar
* *site* = (string) (**obligatorio**), cadena con los sitios permitidos, MLA, MLB y MLM (pueden agregarse mas de ser necesario)
* *sort* = (string), cadena para definir el orden de los resultados, puede ser "price_asc" o "price_desc". En caso de no ponerse el atributo o definirse mal, el orden por default es relevancia.
* *limit* = (number), determina el número de resultados que se devolverán como máximo.
* *offset* = (number), determina el offset de la búsqueda.

#### Atributos API item
* *id* = (string) (**obligatorio**), cadena de texto con el **id** del producto a buscar.
