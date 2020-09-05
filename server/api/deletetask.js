let pool = require("../db.config");
let fs = require("fs");
module.exports = (req, res) => {
  pool.getConnection(function (err, connection) {
    let now = new Date() * 1;
    fs.rename(
      "./taskUpload/" + req.query.title,
      "./taskUpload/" + req.query.title + now,
      (err) => {
        if (err) {
          console.log(err);
          res.json({ result: err });
        } else {
          connection.query(
            `DELETE FROM uptask WHERE title ='${req.query.title}'`,
            function (error, results, fields) {
              if (error) throw error;
              connection.query(
                `ALTER TABLE stutask DROP ${req.query.title}`,
                function (error1, results1, fields1) {
                  if (error1) throw error1;
                  res.json({ result: "accomplish" });
                  connection.end();
                }
              );
            }
          );
        }
      }
    );
  });
};
