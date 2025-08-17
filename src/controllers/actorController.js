const Actor = require("../models/actorModel");

// ✅ Add Actor (Admin only)
const addActor = async (req, res) => {
  try {
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

// ✅ Get All Actors (Public)
const getActors = async (req, res) => {
  try {
    const actors = await Actor.find();
    res.json(actors);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch actors", error: err.message });
  }
};

// ✅ Get Actor by ID (Public)
const getActorById = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);
    if (!actor) return res.status(404).json({ message: "Actor not found" });
    res.json(actor);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching actor", error: err.message });
  }
};

// ✅ Update Actor (Admin only)
const updateActor = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);
    if (!actor) return res.status(404).json({ message: "Actor not found" });

    actor.name = req.body.name || actor.name;
    const updated = await actor.save();

    res.json({ message: "Actor updated", actor: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update actor", error: err.message });
  }
};

// ✅ Delete Actor (Admin only)
const deleteActor = async (req, res) => {
  try {
    const actor = await Actor.findByIdAndDelete(req.params.id);
    if (!actor) return res.status(404).json({ message: "Actor not found" });

    res.json({ message: "Actor deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete actor", error: err.message });
  }
};

module.exports = {
  addActor,
  getActors,
  getActorById,
  updateActor,
  deleteActor,
};
