const fs = require('fs');
const path = require("path");
let input, output;
const filesCopyPath = path.join(__dirname, 'files-copy');


fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    if (err) throw err;
});

function listObjects(currentPath) {
    fs.readdir(currentPath, (err, files) => {
        if (err) throw err;

        for (let file in files) {

            fs.stat(path.join(__dirname, 'files-copy', files[file]), (err, stat) => {
                if (err) throw err;

                if (stat.isDirectory()) {
                    listObjects(currentPath + '/' + file); // продолжаем рекурсию
                } else {
                    let fs = require('fs');
                    fs.unlink(path.join(__dirname, 'files-copy', files[file]), 
                    err => {
                        if (err) throw err; // не удалось удалить файл
                    });
                }
            });
        }
    });
}

listObjects(filesCopyPath);

fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    if (err) throw err;

    for (let index in files) {
        fs.stat(path.join(__dirname, 'files', files[index]), function(err, stat) {
            if (err) console.log(err);

            if (stat.isFile(path.join(__dirname, 'files', files[index]))) {
                input = fs.createReadStream(path.join(__dirname, 'files', path.basename(path.join(__dirname, 'files', files[index]))), 'utf-8');
                output = fs.createWriteStream(path.join(__dirname, 'files-copy', path.basename(path.join(__dirname, 'files', files[index]))));
                input.pipe(output);
            }
        });
    }
});