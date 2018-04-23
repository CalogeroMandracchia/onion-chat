'use strict';

const { createCipher, createDecipher } = require('crypto');

const algorithm = 'aes256';
const password = 'd6F3Efeq';

const cipher = createCipher(algorithm, password);
const decipher = createDecipher(algorithm, password)

const encrypt = text =>
{ 
    let crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}
 
const decrypt = text =>
{
    let dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}


module.exports = {
    encrypt,
    decrypt
}