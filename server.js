const tls = require('tls');
const { readFileSync } = require('fs');
const serverHandler = require('./serverHandler');

const options = {
    key: readFileSync('.keys/server-key.pem'), 
    cert: readFileSync('.keys/server-csr.pem'),
    rejectUnauthorized: false
};

const server = tls.createServer(options, serverHandler);

server.listen(8000, () => console.log('server online') );