const Comment = require("../models/commentModel");
const Review = require("../models/reviewModel");

exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user?._id;
    const reviewId = req.params.reviewId;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const comment = await Comment.create({
      review_id: reviewId,
      user_id: userId,
      content: content.trim(),
    });

    res.status(201).json({ message: "Comment added", comment });
  } catch (err) {
    res.status(500).json({
      message: "Failed to add comment",
      error: err.message,
    });
  }
};
