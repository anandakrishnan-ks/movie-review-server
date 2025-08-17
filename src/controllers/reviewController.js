const Review = require("../models/reviewModel");

exports.createReview = async (req, res) => {
  try {
    const { content, rating, movieId } = req.body;
    const userId = req.user._id;

    if (!content || !rating || !movieId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const review = new Review({
      content,
      rating,
      movie_id: movieId,
      user_id: userId,
    });

    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create review", error: err.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user_id", "username")
      .populate("movie_id", "title");
    res.status(200).json(reviews);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get reviews", error: err.message });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("user_id", "username")
      .populate("movie_id", "title");
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(review);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting review", error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // Only the owner can update their review
    if (review.user_id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this review" });
    }

    review.content = req.body.content || review.content;
    review.rating = req.body.rating || review.rating;

    const updatedReview = await review.save();
    res.status(200).json(updatedReview);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating review", error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // Correct field name is user_id
    if (review.user_id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this review" });
    }

    await review.deleteOne();
    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting review", error: err.message });
  }
};
