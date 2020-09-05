let pool = require("../db.config");

module.exports = (req, res) => {
  pool.getConnection(function (err, connection) {
    connection.query(`select * from stutask`, function (
      error,
      results,
      fields
    ) {
      if (error) throw error;
      res.json({
        stuTaskData: results,
      });
      connection.end();
    });
  });
};
