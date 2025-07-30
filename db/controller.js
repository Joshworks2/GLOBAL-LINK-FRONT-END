const db = require("../db/connection");

function collectRequestData(req, callback) {
  let body = "";
  req.on("data", chunk => body += chunk.toString());
  req.on("end", () => callback(JSON.parse(body)));
}

function handleRegister(req, res) {
  collectRequestData(req, data => {
    const { name, email, password } = data;

    db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password], (err) => {
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: "User registration failed" }));
      } else {
        res.writeHead(200);
        res.end(JSON.stringify({ message: "User registered successfully" }));
      }
    });
  });
}

function handleLogin(req, res) {
  collectRequestData(req, data => {
    const { email, password } = data;

    db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, results) => {
      if (err || results.length === 0) {
        res.writeHead(401);
        res.end(JSON.stringify({ error: "Invalid credentials" }));
      } else {
        res.writeHead(200);
        res.end(JSON.stringify({ message: "Login successful", user: results[0] }));
      }
    });
  });
}

module.exports = { handleRegister, handleLogin };
