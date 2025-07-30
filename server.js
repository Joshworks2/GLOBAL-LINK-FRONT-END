const http = require("http");
const router = require("./routes/router");

const server = http.createServer((req, res) => {
  router(req, res);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
