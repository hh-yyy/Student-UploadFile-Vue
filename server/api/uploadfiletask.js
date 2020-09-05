let pool = require("../db.config");
const fs = require("fs");

module.exports = (req, res) => {
  fs.readFile(req.files[0].path, function (err, data) {
    if (err) {
      console.log("Error");
    } else {
      let file_name =
        req.query.remark
          .replace("姓名", req.query.sname)
          .replace("学号", req.query.sid) +
        req.files[0].originalname.slice(
          req.files[0].originalname.lastIndexOf(".")
        );
      let dir_file =
        __dirname + "/../taskUpload/" + req.query.task_title + "/" + file_name;

      if (req.query.rname != "null") {
        fs.unlink(
          `${__dirname}/../taskUpload/${req.query.task_title}/${req.query.rname}`,
          (err) => {
            console.log(err);
          }
        );
      }

      fs.writeFile(dir_file, data, function (err) {
        pool.getConnection(function (err, connection) {
          connection.query(
            `UPDATE stutask SET ${req.query.task_title} ='${file_name}' WHERE sid = ${req.query.sid}`,
            function (error, results, fields) {
              if (error) throw error;
              res.send(
                JSON.stringify({
                  msg: "upload success",
                  filename: req.files[0].originalname,
                })
              );
              connection.end();
            }
          );
        });
      });
    }
  });
};
