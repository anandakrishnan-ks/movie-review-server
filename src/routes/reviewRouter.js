const express = require("express");
const router = express.Router();
const {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", getReviews);
router.get("/:id", getReviewById);
router.post("/", protect, createReview);
router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);

module.exports = router;
