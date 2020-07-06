const express = require('express');
const router = express.Router();
const axios = require('axios');

// Buscar un usuario especifico (email)
// api/users/find/fabianmontoya97@gmail.com(encriptado en base64)
router.post('/', async (req, res) => {  
    try{
        var data = req.body;
        if(data.item_ids && data.amount){
            let items = [];
            //Leemos los items que llegaron y se valida contra el API de mercadolibre que sea un item valido y su precio
            for(var i in data.item_ids){
                let json = {item_id: data.item_ids[i], precio: 0}
                json.precio = await consultPrice(data.item_ids[i]);
                console.log(json);
                items.push(json);
            }
            //Llamamos la función que nos valida si el item puede entrar en el cupon
            let itemsCoupon = calculate(items, parseFloat(data.amount));
            if(itemsCoupon.length > 0){      
                let result = {item_ids: [], total: 0};
                //creamos la matriz para responder con los datos calculados
                for(var i in itemsCoupon){
                    let infoItem = items.filter(item => item.item_id == itemsCoupon[i]);
                    result.item_ids.push(itemsCoupon[i]);
                    result.total += infoItem[0].precio;
                }       
                res.status(200).json(result);
            }else{
                res.status(404).json({code: 'coupon/no-enough-amount', message: 'El valor del cupón no es suficiente para incluir alguno de los items recibidos.'});
            }
        }else{
            res.status(400).json({code: 'coupon/no-valid-data', message: 'No se recibió la data requerida para verificar el cupón.'});
        }
    }catch(error){
        res.status(500).json({code: 'coupon/internal-server-error', message: "Error al procesar la solicitud: " + error.toString()})
    }
});

//Función que calcula los items que pueden ser redimidos para el cupón
function calculate(items, amount){
    let acumulado = 0;
    let result = [];
    //recorremos todos los items que nos envian
    for(var i in items){
        let item = items[i];
        //Verificamos que el item no haya sido ya ingresado entre los descontados, si ya existe, lo omitimos
        if((result.filter(a => a == item.item_id).length == 0) && item.precio > 0){
            let acumuladoPlus = acumulado + item.precio;
            //Verificamos si sumando el precio de este item se supera el monto máximo
            if(acumuladoPlus <= amount){
                result.push(item.item_id);
                acumulado = acumuladoPlus;
            }
        }        
    }
    return result;
}

//función que consume el API de mercadolibre para consultar el precio del item que se recibe
async function consultPrice(item_id){
    let price = 0;
    await axios.get('https://api.mercadolibre.com/items/'+item_id)
    .then(function (response) {        
        if(response.data.price){
            price = parseFloat(response.data.price);
        }
    })
    .catch(function (error) {
        // handle error
        if(error.status != 404){
            console.log("• Error consultado item en mercadolibre: ", error);
        }else{            
            console.log("• El item "+item_id+" no fue encontrado en mercadolibre.");
        }
    });
    return price;
}

module.exports = router;
