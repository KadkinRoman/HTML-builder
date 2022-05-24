const fs = require('fs');
const path = require('path');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

fs.open(path.join(__dirname, 'text.txt'), 'w', (err) => {
    if (err) throw err;
    readline.output.write('Файл создан. Сделайте запись.\n');
});

readline.on('SIGINT', () => {
    readline.output.write('Спасибо, удачи!');
    readline.close();
});

readline.on('line', (data) => {
    if (data === 'exit') {
        readline.output.write('Спасибо, удачи!\n');
        readline.close();
    } else {
        fs.appendFile(path.join(__dirname, 'text.txt'), `${data}\n`, (err) => { if (err) throw err });
    }
});