const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["ngo", "volunteer"], default: "volunteer" },
  joinedEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
