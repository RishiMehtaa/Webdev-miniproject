const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { authenticate, requireRole } = require("../middleware/auth");

// GET /api/events -> list (public)
router.get("/", eventController.getAllEvents);

// POST /api/events -> create (NGO only)
router.post("/", authenticate, requireRole("ngo"), eventController.createEvent);

// POST /api/events/join -> join (volunteer only)
router.post("/join", authenticate, requireRole("volunteer"), eventController.joinEvent);

module.exports = router;
