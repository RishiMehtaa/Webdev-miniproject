const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  date: Date,
  ngoId: { type: Schema.Types.ObjectId, ref: "User" },
  volunteers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Event", eventSchema);
