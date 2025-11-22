require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db");

const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get("/health", (req, res) => res.json({ status: "ok" }));


const apiRouter = express.Router();
apiRouter.use("/users", userRoutes);
apiRouter.use("/events", eventRoutes);


app.use("/api", apiRouter);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});


connectDB()
  .then(() => {
    const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    const shutdown = () => {
      console.log("Shutting down server...");
      server.close(() => {
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
    process.exit(1);
  });


module.exports = app;
