let pool = require("../db.config");

module.exports = (req, res) => {
  pool.getConnection(function (err, connection) {
    let resdata = {
      sname: "",
      adm: -1,
      sid_md5: "",
    };
    let queryStr = req.url.split("?")[1];
    let keyValueArr = queryStr.split("&");
    let sid = keyValueArr[0];
    sid = sid.split("=")[1];
    let spassword = keyValueArr[1];
    spassword = spassword.split("=")[1] + sid;
    connection.query(
      `select * from login where sid=${sid} and spassword='${spassword}'`,
      function (error, results, fields) {
        if (error) throw error;
        if (results != "") {
          resdata.sname = results[0].sname;
          resdata.adm = results[0].adm;
          resdata.sid_md5 = results[0].sid_md5;
        }
        res.json({
          resdata,
        });
        connection.end();
      }
    );
  });
};
