const express = require("express");
const router = express.Router();
const { submitRating } = require("../controllers/ratingController");
const { protect } = require("../middlewares/authMiddleware");

// POST /api/ratings/:movieId (Only logged-in users)
router.post("/:movieId", protect, submitRating);

module.exports = router;
