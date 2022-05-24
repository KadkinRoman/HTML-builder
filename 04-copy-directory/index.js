const fs = require('fs');
const path = require("path");
let input, output;


fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    if (err) throw err;
    console.log('Папка была создана');
});

fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    if (err) throw err;

    for (let index in files) {
        fs.stat(path.join(__dirname, 'files', files[index]), function(err, stat) {
            if (err) console.log(err);

            if (stat.isFile(path.join(__dirname, 'files', files[index]))) {
                console.log(path.basename(path.join(__dirname, 'files', files[index])));
                input = fs.createReadStream(path.join(__dirname, 'files', path.basename(path.join(__dirname, 'files', files[index]))), 'utf-8');
                output = fs.createWriteStream(path.join(__dirname, 'files-copy', path.basename(path.join(__dirname, 'files', files[index]))));
                input.pipe(output);
            }
        });
    }
});