const { connectDB, ObjectId } = require("../database");
const { sendMail } = require("../utils/mailer");
const crypto = require("crypto");

// Hash password
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// Create user (signup)
async function createUser(req, res) {
  const db = await connectDB();
  const usersCollection = db.collection("users");

  let body = "";
  req.on("data", chunk => body += chunk);
  req.on("end", async () => {
    try {
      const data = JSON.parse(body);
      const existing = await usersCollection.findOne({ email: data.email });
      if (existing) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Email already registered" }));
      }

      const user = {
        name: data.name,
        email: data.email,
        password: hashPassword(data.password),
        role: data.role, // 'ngo' or 'volunteer'
        joinedEvents: [],
        createdAt: new Date()
      };

      const result = await usersCollection.insertOne(user);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User created", userId: result.insertedId }));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Server error", error: err.message }));
    }
  });
}

// Login user
async function loginUser(req, res) {
  const db = await connectDB();
  const usersCollection = db.collection("users");

  let body = "";
  req.on("data", chunk => body += chunk);
  req.on("end", async () => {
    try {
      const data = JSON.parse(body);
      const user = await usersCollection.findOne({ email: data.email });

      if (!user || user.password !== hashPassword(data.password)) {
        res.writeHead(401, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Invalid credentials" }));
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Login successful", userId: user._id, role: user.role }));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Server error", error: err.message }));
    }
  });
}

// Get user profile
async function getProfile(req, res) {
  const db = await connectDB();
  const usersCollection = db.collection("users");

  const queryParams = new URL(req.url, `http://${req.headers.host}`).searchParams;
  const userId = queryParams.get("userId");

  if (!userId) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "userId required" }));
  }

  try {
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) }, { projection: { password: 0 } });
    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "User not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error", error: err.message }));
  }
}

module.exports = { createUser, loginUser, getProfile };
