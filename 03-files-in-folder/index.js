const fs = require("fs");
const path = require("path");

const secretPath = path.join(__dirname, "secret-folder");

fs.readdir(secretPath, (err, files) => {
  if (err) throw err;

  for (let index in files) {
    fs.stat(path.join(secretPath, files[index]), function (err, stat) {
      if (err) console.log(err);

      if (stat.isFile(path.join(secretPath, files[index]))) {
        console.log(
          `${path.basename(
            path.join(secretPath, files[index]),
            path.extname(path.join(secretPath, files[index]))
          )} - ` +
            `${path.extname(path.join(secretPath, files[index])).slice(1)} - ` +
            `${stat.size / 1024}kb
            `
        );
      }
    });
  }
});
