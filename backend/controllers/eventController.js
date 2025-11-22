const Event = require("../models/Event");
const User = require("../models/User");
const { sendMail } = require("../utils/mailer");

// Create event (by NGO)
async function createEvent(req, res) {
  try {
    const data = req.body;
    if (!data.title || !data.date) return res.status(400).json({ message: "title and date required" });

    // prefer ngoId from token if present
    const ngoId = req.user?.userId || data.ngoId;

    const event = new Event({
      title: data.title,
      description: data.description,
      location: data.location,
      date: data.date ? new Date(data.date) : undefined,
      ngoId,
      volunteers: [],
    });

    await event.save();
    return res.status(201).json({ message: "Event created", eventId: event._id });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

// Get all events
async function getAllEvents(req, res) {
  try {
    const events = await Event.find({}).lean();
    return res.status(200).json(events);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

// Volunteer joins an event
async function joinEvent(req, res) {
  try {
    const { eventId } = req.body;
    const volunteerId = req.user?.userId || req.body.volunteerId;
    if (!eventId || !volunteerId) return res.status(400).json({ message: "eventId and volunteerId required" });

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.volunteers.some((v) => v.toString() === volunteerId)) return res.status(400).json({ message: "Already joined" });

    event.volunteers.push(volunteerId);
    await event.save();

    const volunteer = await User.findById(volunteerId);
    if (volunteer) {
      volunteer.joinedEvents.push(eventId);
      await volunteer.save();

      // Send email (best-effort)
      if (volunteer.email) {
        await sendMail(
          volunteer.email,
          `Joined Event: ${event.title}`,
          `You have successfully joined the event "${event.title}" on ${event.date}`
        ).catch((e) => console.warn("Mail send failed", e.message));
      }
    }

    return res.status(200).json({ message: "Joined event successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = { createEvent, getAllEvents, joinEvent };
