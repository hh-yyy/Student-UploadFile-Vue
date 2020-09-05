let pool = require("../db.config");
let fs = require("fs");

module.exports = (req, res) => {
  pool.getConnection(function (err, connection) {
    fs.mkdir("./taskUpload/" + req.query.title, function (err) {
      if (err) {
        if (err.errno == -4075) {
          res.json({
            result: "repetition",
          });
        } else {
          res.json({
            result: err.errno,
          });
        }
      } else {
        connection.query(
          `INSERT INTO uptask SET title = '${req.query.title}',principal ='${req.query.principal}',sid_md5 ='${req.query.sid_md5}',overtime ='${req.query.taskData} ${req.query.taskTime}',remark ='${req.query.remark}'`,
          function (error, results, fields) {
            if (error) throw error;
            connection.query(
              `ALTER TABLE stutask ADD ${req.query.title} varchar(255) default null`,
              function (error1, results1, fields1) {
                if (error1) throw error1;
                res.json({
                  result: "accomplish",
                });
                connection.end();
              }
            );
          }
        );
      }
    });
  });
};
