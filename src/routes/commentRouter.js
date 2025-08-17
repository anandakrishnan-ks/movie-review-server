const express = require("express");
const router = express.Router();
const {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const { protect } = require("../middlewares/authMiddleware");

// POST a comment to a review
router.post("/:reviewId", protect, addComment);

// GET all comments for a review
router.get("/:reviewId", getComments);

// UPDATE a comment
router.put("/:id", protect, updateComment);

// DELETE a comment
router.delete("/:id", protect, deleteComment);

module.exports = router;
