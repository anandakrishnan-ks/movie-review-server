const Movie = require("../models/movieModel");

// GET all movies (Public)
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch {
    res.status(500).json({ message: "Failed to fetch movies" });
  }
};

// GET movie by ID (Public)
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch {
    res.status(500).json({ message: "Error fetching movie" });
  }
};

// POST create a movie (Admin only)
exports.createMovie = async (req, res) => {
  try {
    const { title, image, description, release_date } = req.body;

    const movie = await Movie.create({
      title,
      image,
      description,
      release_date,
    });

    res.status(201).json(movie);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create movie", error: err.message });
  }
};

// PUT update a movie (Admin only)
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    movie.title = req.body.title || movie.title;
    movie.image = req.body.image || movie.image;
    movie.description = req.body.description || movie.description;
    movie.release_date = req.body.release_date || movie.release_date;

    const updated = await movie.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// DELETE movie (Admin only)
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Deletion failed", error: err.message });
  }
};
