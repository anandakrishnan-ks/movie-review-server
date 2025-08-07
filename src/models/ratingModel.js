const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movie_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const ratingModel = mongoose.model("Rating", ratingSchema);

module.exports = ratingModel;
