const Rating = require("../models/ratingModel");
const Movie = require("../models/movieModel");

exports.submitRating = async (req, res) => {
  try {
    const { score } = req.body;
    const userId = req.user?._id;
    const movieId = req.params.movieId;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (score === undefined || score < 0 || score > 5) {
      return res.status(400).json({ message: "Score must be between 0 and 5" });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    let rating = await Rating.findOne({ user_id: userId, movie_id: movieId });

    if (rating) {
      rating.score = score;
    } else {
      rating = new Rating({ user_id: userId, movie_id: movieId, score });
    }

    await rating.save();

    const allRatings = await Rating.find({ movie_id: movieId });
    const totalScore = allRatings.reduce((acc, r) => acc + r.score, 0);
    const averageRating = totalScore / allRatings.length;

    movie.averageRating = averageRating;
    movie.numberOfRatings = allRatings.length;
    await movie.save();

    res.status(200).json({
      message: "Rating submitted successfully",
      averageRating: averageRating.toFixed(2),
      numberOfRatings: movie.numberOfRatings,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to submit rating",
      error: err.message,
    });
  }
};
