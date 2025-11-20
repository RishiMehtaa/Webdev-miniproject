const { connectDB, ObjectId } = require("../database");
const { sendMail } = require("../utils/mailer");

// Create event (by NGO)
async function createEvent(req, res) {
  const db = await connectDB();
  const eventsCollection = db.collection("events");

  let body = "";
  req.on("data", chunk => body += chunk);
  req.on("end", async () => {
    try {
      const data = JSON.parse(body);

      const event = {
        title: data.title,
        description: data.description,
        location: data.location,
        date: new Date(data.date),
        ngoId: new ObjectId(data.ngoId),
        volunteers: [],
        createdAt: new Date()
      };

      const result = await eventsCollection.insertOne(event);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Event created", eventId: result.insertedId }));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Server error", error: err.message }));
    }
  });
}

// Get all events
async function getAllEvents(req, res) {
  const db = await connectDB();
  const eventsCollection = db.collection("events");

  try {
    const events = await eventsCollection.find({}).toArray();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(events));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error", error: err.message }));
  }
}

// Volunteer joins an event
async function joinEvent(req, res) {
  const db = await connectDB();
  const eventsCollection = db.collection("events");
  const usersCollection = db.collection("users");

  let body = "";
  req.on("data", chunk => body += chunk);
  req.on("end", async () => {
    try {
      const data = JSON.parse(body);
      const eventId = data.eventId;
      const volunteerId = data.volunteerId;

      const event = await eventsCollection.findOne({ _id: new ObjectId(eventId) });
      if (!event) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Event not found" }));
      }

      if (event.volunteers.includes(volunteerId)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Already joined" }));
      }

      // Add volunteer to event
      await eventsCollection.updateOne(
        { _id: ObjectId(eventId) },
        { $push: { volunteers: volunteerId } }
      );

      // Add event to volunteer joinedEvents
      await usersCollection.updateOne(
        { _id: ObjectId(volunteerId) },
        { $push: { joinedEvents: eventId } }
      );

      // Send email
      const volunteer = await usersCollection.findOne({ _id: new ObjectId(volunteerId) });
      await sendMail(
        volunteer.email,
        `Joined Event: ${event.title}`,
        `You have successfully joined the event "${event.title}" on ${event.date}`
      );

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Joined event successfully" }));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Server error", error: err.message }));
    }
  });
}

module.exports = { createEvent, getAllEvents, joinEvent };
