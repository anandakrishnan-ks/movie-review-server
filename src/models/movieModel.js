const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    release_date: {
      type: Date,
      required: [true, "Release date is required"],
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

const MovieModel = mongoose.model("Movie", movieSchema);

module.exports = MovieModel;
