const Movie = require("../models/movieModel");

// Get all movies
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch movies" });
  }
};

// Get a single movie by ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching movie" });
  }
};

// Create a movie
const createMovie = async (req, res) => {
  try {
    const { title, image, description, release_date } = req.body;

    const newMovie = await Movie.create({
      title,
      image,
      description,
      release_date,
    });

    res.status(201).json(newMovie);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create movie", error: err.message });
  }
};

// Update a movie
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      movie.title = req.body.title || movie.title;
      movie.image = req.body.image || movie.image;
      movie.description = req.body.description || movie.description;
      movie.release_date = req.body.release_date || movie.release_date;

      const updatedMovie = await movie.save();
      res.json(updatedMovie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// Delete a movie
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (movie) {
      res.json({ message: "Movie deleted successfully" });
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Deletion failed", error: err.message });
  }
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
