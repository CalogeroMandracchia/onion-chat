const fs = require('fs');
const { encrypt, decrypt } = require('./encryptText');

console.log(decrypt(encrypt("ciao")));