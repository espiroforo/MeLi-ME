![Mercadolibre Logo](/public/images/mercadolibre.png)

  MiddleEnd creado para evaluacion tecnica de Mercado Libre, para [node](http://nodejs.org).




## Caracteristicas

  * Alta performance
  * Escalabilidad
  * Resilencia



## Instalación

Este es un server hecho en [Node.js](https://nodejs.org/en/) disponible a traves de [npm registry](https://www.npmjs.com/).

Antes de la instalación, [descargar e instalar Node.js](https://nodejs.org/en/download/).
Node.js 0.10 o superior es requerido.

Además, clonar el repositorio en github:

La instalación se realiza usando el [comando `npm install`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ git clone https://github.com/espiroforo/MeLi-ME.git
$ cd meli-me
$ npm install
```

Arrancar el server
```console
$ npm start
```
Es posible acceder al server desde el localhost en: http://localhost:8080



## Customizaciones

El puerto y los token de seguridad se encuentran en las variables de entorno dentro del archivo [.env]

```console
PORT=8080
TOKEN=xxxxxxxxxxxxxxx
MOCK=xxxxxxxxxxxxxxxx
```

Dentro de la carpeta **config** se encuentran varios archivos de configuracion que pueden variarse.

 * **corsConfig.js**, contiene una whitelist para que se pueda acceder desde determinados origenes (Por defecto estan configurados todos con el '*' y localhost)
 * **filterConfig.js**, contiene los filtros permitidos, se pueden agregar filtros en la misma.
 * **mockConfig.js**, contiene un mock por API, ambos son por default, que pueden ser customizados. Tambien pueden agregarse futuros mocks.
 * **sitesConfig.js**, contiene los sites a los que la API de busqueda puede ingresar.





### Ejemplos

Ejemplos para podes ejecutar en el endpoint :

```console
 http://localhost:8080/api/producto?search=**silla gamer redragon metis**&limit=**2**&sort=**PriCe_desc**&offset=**8**&site=**mla**
 
 http://localhost:8080/api/item/MLA857409237
```

#### Atributos API busqueda
* *search* = (string) (**obligatorio**), cadena de texto con la busqueda a realizar
* *site* = (string) (**obligatorio**), cadena con los sitios permitidos, MLA, MLB y MLM. (Pueden agregarse mas de ser necesario)
* *sort* = (string), cadena para definir el orden de los resultados, puede ser "price_asc" o "price_desc", de no ponerse el atributo o definirse mal, el orden es relevancia.
* *limit* = (number), determina el numero de resultados que se van a devolver como maximo.
* *offset* = (number), determina el offset de la busqueda.

#### Atributos API item
* *id* = (string) (**obligatorio**), cadena de texto con el **id** del producto a buscar.
