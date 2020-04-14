const crypto = require('crypto');   //biblioteca para criptografia que possui metodo de geracao randomica

module.exports = function generateUniqueId(){
    return crypto.randomBytes(4).toString('HEX');   //gera 4 bytes de caracteres hexadecimais para o id da ong
}