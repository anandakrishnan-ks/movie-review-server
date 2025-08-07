const express = require("express");
const router = express.Router();

const {
  getDirectors,
  addDirector,
} = require("../controllers/directorController");
const { protect, admin } = require("../middlewares/authMiddleware");

// Public route: get all directors
router.get("/", getDirectors);

// Protected admin-only route: add director
router.post("/", protect, admin, addDirector);

module.exports = router;
