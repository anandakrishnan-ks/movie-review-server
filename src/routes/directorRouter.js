const express = require("express");
const router = express.Router();

const {
  getDirectors,
  getDirectorById,
  addDirector,
  updateDirector,
  deleteDirector,
} = require("../controllers/directorController");

const { protect, admin } = require("../middlewares/authMiddleware");

// Public routes
router.get("/", getDirectors); // Get all directors
router.get("/:id", getDirectorById); // Get director by ID

// Admin routes
router.post("/", protect, admin, addDirector); // Add director
router.put("/:id", protect, admin, updateDirector); // Update director
router.delete("/:id", protect, admin, deleteDirector); // Delete director

module.exports = router;
