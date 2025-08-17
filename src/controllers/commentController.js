const Comment = require("../models/commentModel");
const Review = require("../models/reviewModel");

// ADD comment
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
    res
      .status(500)
      .json({ message: "Failed to add comment", error: err.message });
  }
};

// GET all comments for a review
exports.getComments = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const comments = await Comment.find({ review_id: reviewId }).populate(
      "user_id",
      "username"
    );
    res.status(200).json(comments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get comments", error: err.message });
  }
};

// UPDATE a comment
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user_id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this comment" });
    }

    comment.content = req.body.content || comment.content;
    const updatedComment = await comment.save();
    res.status(200).json(updatedComment);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating comment", error: err.message });
  }
};

// DELETE a comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user_id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this comment" });
    }

    await comment.deleteOne();
    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting comment", error: err.message });
  }
};
