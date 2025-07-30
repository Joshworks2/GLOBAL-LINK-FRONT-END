const { handleRegister, handleLogin } = require("../controllers/authController");
const { handlePostJob, handleGetJobs } = require("../controllers/jobController");

function router(req, res) {
  const { method, url } = req;

  if (method === "POST" && url === "/register") return handleRegister(req, res);
  if (method === "POST" && url === "/login") return handleLogin(req, res);
  if (method === "POST" && url === "/jobs") return handlePostJob(req, res);
  if (method === "GET" && url === "/jobs") return handleGetJobs(req, res);

  // Fallback route
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
}

module.exports = router;
