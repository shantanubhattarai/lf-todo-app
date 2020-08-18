const mysql = require("mysql");
const config = require("./configs/config");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "todo-lf",
});

module.exports = {
  connection,
};
