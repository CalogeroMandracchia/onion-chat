const tls = require('tls');
const fs = require('fs');
const { encrypt, decrypt } = require('./encryptText');
const hosts = require('./constants');

const readline = require('readline');
const rl = readline.createInterface({input: process.stdin, output: process.stdout, prompt: "you: "});


const options = {
    host: hosts[process.argv[2]],
    port: 8000,
    rejectUnauthorized: false
};

const onData = data =>
{
    rl.setPrompt("server: ");
    rl.write('\n');
    process.stdout.write(decrypt(data.toString().replace(/\r?\n|\r/g, "")));
    rl.setPrompt("you: ");
    rl.write('\n');
}

const socket = tls.connect(options, () => {
    console.log('server connected at', socket.remoteAddress);
    rl.prompt();

    process.stdin.resume();

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
    
    socket.on('error', error => console.log(error.code));
    socket.on('end', (data) => { console.log('Socket end event'); process.exit(0)});
});