# API Test Mercadolibre by Fabian Montoya

API en Node.js para el test de coupon de mercadolibre.

### Pre-requisitos 📋

```
Node.js
```

### Instalación 🔧

- Descargar el proyecto.
- Abrir el proyecto en tu editor de código favorito.
- Ejecutar el comando `npm install` para instalar las dependencias del proyecto.
- Ejecutar `npm run serve` para ejecutar el proyecto.
- El proyecto se ejcutará en la ruta `http://localhost:3000/api/coupon`.

Para consumir el API debe ser mediante el método http POST.

La estructura que el API espera recibir en el `body` de la solicitud es:

```
{
    "item_ids": ["MCO545430410", "MCO450443967", "MCO450656480", "MCO546131737", "MCO44868016"],
    "amount": 50000
}
```

En `items` deben ir los códigos de los productos que desea validar frente al API.

En `amount` debe ir el valor máximo del cupón el cual va a validar el API para indicar que productos puedne ser incluidos en este monto del cupón.

Al consumir el API el sistema puede retornar los siguientes códigos de respuesta:

| Código | Descripción | http code |
| ------------- | ------------- | ------------- |
| coupon/internal-server-error  | Error al procesar la solicitud.  | 500  |
| coupon/no-valid-data  | No se recibió la data requerida para verificar el cupón.  | 400  |
| coupon/no-enough-amount  | El valor del cupón no es suficiente para incluir alguno de los items recibidos.  | 404  |

De ser exitoso el proceso de validación del cupón el API retornará la siguiente estrucutura

```
{
    "item_ids": [
        "MCO545430410",
        "MCO450443967"
    ],
    "total": 34400
}
```

En `item_ids` se retorna la información de los productos que pueden ser redimidos con el cupón.

En `total` se retorna el monto total que ocupan los productos incluidos en el cupón.

El API puede ser consumido desde la siguiente URL: https://us-central1-api-mercadolibre-fabian.cloudfunctions.net/function-1/api/coupon

## Construido con 🛠️

_Las herramientas utilizadas para crear este proyecto_

* [Node.js](https://nodejs.org/es/) - Lenguaje usado para el back end y toda la construcción del API
* [Express](https://maven.apache.org/) - Framework para Node.js más común y usado para el desarrollo de apps web con Node.js
* [Axios](https://rometools.github.io/rome/) - Usado para consumo de API externas
* [Mercadolibre Api](https://api.mercadolibre.com/items/#options) - Usado para consulta de precios e info de items

## Versionado 📌

Uso GitHub para el versionamiento de este proyecto.

## Autores ✒️

* **Fabian Dario Montoya** - *Trabajo Inicial* - [FabianMontoya](https://github.com/FabianMontoya)
---
⌨️ con ❤️ por [Fabian Montoya](https://github.com/FabianMontoya) 😊
