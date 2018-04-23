'use strict';

const { createCipher, createDecipher} = require('crypto');
const { createGzip, createGunzip } = require('zlib');

const algorithm = 'aes256';
const password = 'd6F3Efeq';

const zip = createGzip();
const unzip = createGunzip();

const encrypt = createCipher(algorithm, password);
const decrypt = createDecipher(algorithm, password)

const encryptStream = stream => stream.pipe(zip).pipe(encrypt);
const decryptStream = stream => stream.pipe(decrypt).pipe(unzip);


module.exports = {
    zip,
    unzip,
    decrypt,
    encrypt
}