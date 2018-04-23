const readline = require('readline');

const { zip, unzip, decrypt, encrypt } = require('./cryptography');


const rl = readline.createInterface({input: process.stdin, output: process.stdout, prompt: "you: "});

rl.prompt();


const onLine = input =>
{
    //rl.write("-" + input + "-");
    if(input.match(/^\s*$/))
    {
        readline.clearLine(process.stdout, 0);  // clear current text
        readline.cursorTo(process.stdout, 0);  // move cursor to beginning of line
    }
    rl.prompt();
}

const onSIGINT = () =>
{
    console.log("\n");
    //readline.clearLine(process.stdout, 0);  // clear current text
    //readline.cursorTo(process.stdout, 0);  // move cursor to beginning of line
    rl.close();
}

rl.on('line', onLine);
rl.on('SIGINT', onSIGINT);


const sleep = ms => new Promise( res => setTimeout(res, ms));

const main = async () =>
{
    try
    {
        let i = 0;
        while(true)
        {
            i++;
            await sleep(2000);
            rl.setPrompt("client: ");
            rl.write('\n');
            rl.write('message');
            rl.setPrompt("you: ");
            rl.write('\n');
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

main();