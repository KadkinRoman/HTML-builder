var fs = require('fs');
var path = require('path');

// var getFiles = function (dir, files_){

//   files_ = files_ || [];
//     var files = fs.readdirSync(dir);
//     for (var i in files){
//         var name = dir + '/' + files[i];
//         if (fs.statSync(name).isDirectory()){
//             getFiles(name, files_);
//         } else {
//             files_.push(name);
//         }
//     }
//     return files_;
// };

// console.log(getFiles(path.join(__dirname, 'secret-folder')));

var files = fs.readdirSync(path.join(__dirname, 'secret-folder'));
console.log(files);

for (let file in files) {
    console.log('G');
    fs.stat(file, function(err, stat) {

        if (err) return err;
        console.log('Проверка', stat.isDirectory(path.join(__dirname, 'secret-folder', files[file])));
        console.log('G');
        if (stat.isDirectory(path.join(__dirname, 'secret-folder', files[file]))) {
            console.log('Не папка');
        } else {
            console.log(file);
        }
    });

}