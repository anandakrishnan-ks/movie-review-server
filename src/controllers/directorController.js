const Director = require("../models/directorModel");

// ✅ Get All Directors (Public)
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

// ✅ Get Director by ID (Public)
exports.getDirectorById = async (req, res) => {
  try {
    const director = await Director.findById(req.params.id);
    if (!director)
      return res.status(404).json({ message: "Director not found" });
    res.json(director);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching director", error: error.message });
  }
};

// ✅ Add Director (Admin only)
exports.addDirector = async (req, res) => {
  try {
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

// ✅ Update Director (Admin only)
exports.updateDirector = async (req, res) => {
  try {
    const director = await Director.findById(req.params.id);
    if (!director)
      return res.status(404).json({ message: "Director not found" });

    director.name = req.body.name || director.name;
    const updated = await director.save();

    res.json({ message: "Director updated", director: updated });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update director", error: error.message });
  }
};

// ✅ Delete Director (Admin only)
exports.deleteDirector = async (req, res) => {
  try {
    const director = await Director.findByIdAndDelete(req.params.id);
    if (!director)
      return res.status(404).json({ message: "Director not found" });

    res.json({ message: "Director deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete director", error: error.message });
  }
};
