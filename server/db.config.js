let mysql = require("mysql");
let pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "hy",
});

module.exports = pool;
