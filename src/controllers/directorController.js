const Director = require("../models/directorModel");

exports.getDirectors = async (req, res) => {
  try {
    const directors = await Director.find();
    res.status(200).json(directors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch directors", error: error.message });
  }
};

exports.addDirector = async (req, res) => {
  try {
    // Role check is done in middleware; optional here
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Director name is required" });
    }

    const existing = await Director.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ message: "Director already exists" });
    }

    const director = await Director.create({ name: name.trim() });
    res.status(201).json({ message: "Director added", director });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add director", error: error.message });
  }
};
