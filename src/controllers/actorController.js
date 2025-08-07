const Actor = require("../models/actorModel");

// POST /api/actors (Admin only)
const addActor = async (req, res) => {
  try {
    // Optional: Check admin role here, but better to use middleware
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Actor name is required" });
    }

    const exists = await Actor.findOne({ name: name.trim() });
    if (exists) {
      return res.status(400).json({ message: "Actor already exists" });
    }

    const actor = await Actor.create({ name: name.trim() });
    res.status(201).json({ message: "Actor added", actor });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add actor", error: err.message });
  }
};

module.exports = { addActor };
