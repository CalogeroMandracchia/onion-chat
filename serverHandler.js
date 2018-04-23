'use strict';

const { encrypt, decrypt } = require('./encryptText');

const readline = require('readline');
const rl = readline.createInterface({input: process.stdin, output: process.stdout, prompt: "you: "});

const onData = data =>
{
    rl.setPrompt("client: ");
    rl.write('\n');
    
    process.stdout.write(decrypt(data.toString().replace(/\r?\n|\r/g, "")));
    rl.setPrompt("you: ");
    rl.write('\n');
}

const serverHandler = socket => 
{
    console.log('client connected:', socket.remoteAddress);
    rl.prompt();

    process.stdin.resume();
    
    
    //socket.setEncoding('utf8');

    //receive
    socket.on('data', onData);
    
    //send
    const onLine = input =>
    {
        if(input.match(/^\s*$/))
        {
            readline.clearLine(process.stdout, 0);  // clear current text
            readline.cursorTo(process.stdout, 0);  // move cursor to beginning of line
        }
        rl.prompt();
        if(input.trim() != "")
            socket.write(encrypt(input));
    }
    rl.on('line', onLine);
    
    socket.on('error', error => { console.log(error.code); });
}

module.exports = serverHandler;