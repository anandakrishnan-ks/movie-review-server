const Actor = require("../models/actorModel");

exports.addActor = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Actor name is required" });
    }

    const exists = await Actor.findOne({ name: name.trim() });
    if (exists) {
      return res.status(400).json({ message: "Actor already exists" });
    }

    const actor = await Actor.create({ name });
    res.status(201).json({ message: "Actor added", actor });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add actor", error: err.message });
  }
};
