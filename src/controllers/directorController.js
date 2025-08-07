const Director = require("../models/directorModel");

exports.addDirector = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Director name is required" });
    }

    const existing = await Director.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ message: "Director already exists" });
    }

    const director = await Director.create({ name });
    res.status(201).json({ message: "Director added", director });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add director", error: err.message });
  }
};
