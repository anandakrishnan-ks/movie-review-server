const express = require("express");
const router = express.Router();
const { addComment } = require("../controllers/commentController");

// POST /api/comments/:reviewId
router.post("/:reviewId", addComment);

module.exports = router;
