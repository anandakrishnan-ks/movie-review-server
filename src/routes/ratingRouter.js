const express = require("express");
const router = express.Router();
const { submitRating } = require("../controllers/ratingController");

// POST /api/ratings/:movieId
router.post("/:movieId", submitRating);

module.exports = router;
