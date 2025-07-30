const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",         // your XAMPP MySQL username
  password: "",         // your XAMPP MySQL password (default is empty)
  database: "global_link"
});

connection.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

module.exports = connection;

