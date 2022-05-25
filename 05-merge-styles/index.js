const fs = require('fs');
const path = require("path");

fs.writeFile(
    path.join(__dirname, 'project-dist', 'bundle.css'),
    '',
    err => {
        if (err) throw err;
    }
);

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
    if (err) throw err;

    for (let index in files) {

        fs.stat(path.join(__dirname, 'styles', files[index]), function(err, stat) {
            if (err) console.log(err);

            if (stat.isFile(path.join(__dirname, 'styles', files[index])) && 
            path.extname(path.join(__dirname, 'styles', files[index])) === '.css') {
                fs.readFile(path.join(__dirname, 'styles', files[index]), 'utf8', function (error, data) {
                    if (error) throw error;

                    fs.appendFile(
                        path.join(__dirname, 'project-dist', 'bundle.css'),
                        data + '\n',
                        err => {
                            if (err) throw err;
                    });
                });
            }
        });
    }
});