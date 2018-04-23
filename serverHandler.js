'use strict';

const { zip, unzip, decrypt, encrypt } = require('./cryptography');

const readline = require('readline');
const rl = readline.createInterface({input: process.stdin, output: process.stdout, prompt: "you: "});

const onData = data =>
{
    rl.setPrompt("client: ");
    //rl.write('\n');
    rl.write(data);
    rl.setPrompt("you: ");
    //rl.write('\n');
}

const serverHandler = socket => 
{
    console.log('client connected:', socket.remoteAddress);
    rl.prompt();
    socket.on('error', error => { console.log(error.code); });
    
    //socket.setEncoding('utf8');

    //receive
    socket.on('data', onData);
    //send

    const onLine = input =>
    {
        rl.prompt();
        socket.write(input + "\n");
    }
    rl.on('line', onLine);
    //process.stdin.pipe(zip).pipe(encrypt).pipe(socket);
    //process.stdin.pipe(socket);
    process.stdin.resume();

}

module.exports = serverHandler;