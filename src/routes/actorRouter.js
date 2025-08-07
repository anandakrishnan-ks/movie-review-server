const express = require("express");
const router = express.Router();
const { addActor } = require("../controllers/actorController");

// POST /api/actors
router.post("/", addActor);

module.exports = router;
