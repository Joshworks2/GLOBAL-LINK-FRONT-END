const db = require("../db/connection");

function collectRequestData(req, callback) {
  let body = "";
  req.on("data", chunk => body += chunk.toString());
  req.on("end", () => callback(JSON.parse(body)));
}

function handlePostJob(req, res) {
  collectRequestData(req, data => {
    const { title, company, description } = data;

    db.query("INSERT INTO jobs (title, company, description) VALUES (?, ?, ?)", [title, company, description], (err) => {
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Job posting failed" }));
      } else {
        res.writeHead(200);
        res.end(JSON.stringify({ message: "Job posted successfully" }));
      }
    });
  });
}

function handleGetJobs(req, res) {
  db.query("SELECT * FROM jobs", (err, results) => {
    if (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: "Failed to fetch jobs" }));
    } else {
      res.writeHead(200);
      res.end(JSON.stringify({ jobs: results }));
    }
  });
}

module.exports = { handlePostJob, handleGetJobs };
