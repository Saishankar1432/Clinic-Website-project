const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mysql@532003",       // add password if any
  database: "paidis_clinic"
});

db.connect(err => {
  if (err) {
    console.error("DB Error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;
