const http = require("http");
const url = require("url");
require("dotenv").config();

const { connectDB } = require("./database");
const userController = require("./controllers/userController");
const eventController = require("./controllers/eventController");

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    // User APIs
    if (path === "/api/users" && method === "POST") return userController.createUser(req, res);
    if (path === "/api/users/login" && method === "POST") return userController.loginUser(req, res);
    if (path === "/api/users/profile" && method === "GET") return userController.getProfile(req, res);

    // Event APIs
    if (path === "/api/events" && method === "POST") return eventController.createEvent(req, res);
    if (path === "/api/events" && method === "GET") return eventController.getAllEvents(req, res);
    if (path === "/api/events/join" && method === "POST") return eventController.joinEvent(req, res);

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  });

  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
