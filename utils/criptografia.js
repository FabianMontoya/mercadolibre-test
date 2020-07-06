var crypto = require('crypto');

//Función que genera un token aleatorio
function createToken(){
    var token = crypto.randomBytes(64).toString("base64");
    return encodeSHA256(token);
}

//Encripta una cadena en Base64
function encodeBase64(text){
    return Buffer.from(text).toString('base64');
}

//Decodifica una cadena encriptada en Base64 a texto normal
function decodeBase64(encodeText){
    return Buffer.from(encodeText, "base64").toString('utf8')
}

//Encripta una cadena en SHA 256 (32 bytes)
function encodeSHA256(text){
    return crypto.createHash('sha256').update(text).digest('hex');
}

//Encripta una cadena en SHA 512 (64 bytes)
function encodeSHA512(text){
    return crypto.createHash('sha512').update(text).digest('hex');
}

//----------------------------------------------------------------
//----------------------------------------------------------------
//Preparamos el modulo para exportar
const cripto = {};
cripto.encodeBase64 = encodeBase64;
cripto.decodeBase64 = decodeBase64;
cripto.encodeSHA256 = encodeSHA256;
cripto.encodeSHA512 = encodeSHA512;
cripto.createToken = createToken;

//Exportamos el objeto para exportar multiples funciones
module.exports = cripto;