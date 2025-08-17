const express = require("express");
const router = express.Router();

const {
  addActor,
  getActors,
  getActorById,
  updateActor,
  deleteActor,
} = require("../controllers/actorController");

const { protect, admin } = require("../middlewares/authMiddleware");

// Public Routes
router.get("/", getActors); // Get all actors
router.get("/:id", getActorById); // Get actor by ID

// Admin Routes
router.post("/", protect, admin, addActor); // Add actor
router.put("/:id", protect, admin, updateActor); // Update actor
router.delete("/:id", protect, admin, deleteActor); // Delete actor

module.exports = router;
