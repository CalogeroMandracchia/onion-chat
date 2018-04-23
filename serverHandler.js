'use strict';

const { zip, unzip, decrypt, encrypt } = require('./cryptography');

const serverHandler = socket => 
{
    console.log('client connected:', socket.remoteAddress);

    socket.on('error', error => { console.log(error.code); });
    
    //socket.setEncoding('utf8');

    //receive
    //socket.pipe(decrypt).pipe(unzip).pipe(process.stdout);
    socket.pipe(process.stdout);

    //send
    //process.stdin.pipe(zip).pipe(encrypt).pipe(socket);
    process.stdin.pipe(socket);
    process.stdin.resume();

}

module.exports = serverHandler;