const express = require("express");
const router = express.Router();
const { addComment } = require("../controllers/commentController");
const { protect } = require("../middlewares/authMiddleware");

// POST /api/comments/:reviewId (Logged-in users)
router.post("/:reviewId", protect, addComment);

module.exports = router;
