const tls = require('tls');
const fs = require('fs');
const { zip, unzip, decrypt, encrypt } = require('./cryptography');
const hosts = require('./constants');


const options = {
    host: hosts[process.argv[2]],
    port: 8000,
    rejectUnauthorized: false
};


const socket = tls.connect(options, () => {
    console.log('server connected at', socket.remoteAddress);

    //socket.setEncoding('utf8');

    //receive
    //socket.pipe(decrypt).pipe(unzip).pipe(process.stdout);
    socket.pipe(process.stdout);

    //send
    //process.stdin.pipe(zip).pipe(encrypt).pipe(socket);
    process.stdin.pipe(socket);
    process.stdin.resume();
    
    socket.on('error', error => console.log(error.code));
    socket.on('end', (data) => { console.log('Socket end event'); process.exit(0)});
});