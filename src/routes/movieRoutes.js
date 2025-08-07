const express = require("express");
const router = express.Router();
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");
const { protect, admin } = require("../middlewares/authMiddleware");

// Public GET routes
router.get("/", getMovies);
router.get("/:id", getMovieById);

// Admin-protected routes
router.post("/", protect, admin, createMovie);
router.put("/:id", protect, admin, updateMovie);
router.delete("/:id", protect, admin, deleteMovie);

module.exports = router;
