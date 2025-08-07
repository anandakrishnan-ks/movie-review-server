const express = require("express");
const router = express.Router();

const { addActor } = require("../controllers/actorController");
const { protect, admin } = require("../middlewares/authMiddleware");

// POST /api/actors (Admin only)
router.post("/", protect, admin, addActor);

module.exports = router;
