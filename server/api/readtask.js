let pool = require("../db.config");

module.exports = (req, res) => {
  pool.getConnection(function (err, connection) {
    connection.query(`select * from uptask`, function (error, results, fields) {
      if (error) throw error;
      res.json({
        taskData: results,
      });
      connection.end();
    });
  });
};
