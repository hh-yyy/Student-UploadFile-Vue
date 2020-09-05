let fs = require("fs");
var JSZip = require("jszip");
var zip = new JSZip();
module.exports = (req, res) => {
  fs.readdir(`./taskUpload/${req.query.title}/`, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.map((s) => {
        let data = fs.readFileSync(`./taskUpload/${req.query.title}/${s}`);
        zip.file(s, data, { base64: true });
      });
      zip
        .generateNodeStream({ type: "nodebuffer", streamFiles: true })
        .pipe(
          fs.createWriteStream(
            `./taskUpload/${req.query.title}/${req.query.title}.zip`
          )
        ) //打包后的包名可以自己根据需求定义，路径可以根据需求更改
        .on("finish", function () {
          // JSZip generates a readable stream with a "end" event,
          // but is piped here in a writable stream which emits a "finish" event.
          res.download(
            `./taskUpload/${req.query.title}/${req.query.title}.zip`,
            function (err) {
              if (err) {
                console.log(err);
              } else {
                fs.unlink(
                  `${__dirname}/../taskUpload/${req.query.title}/${req.query.title}.zip`,
                  (err) => {
                    console.log(err);
                  }
                );
              }
            }
          );
        });
    }
  });
};
