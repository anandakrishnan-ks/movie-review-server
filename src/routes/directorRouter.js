const express = require("express");
const router = express.Router();
const { addDirector } = require("../controllers/directorController");

// POST /api/directors
router.post("/", addDirector);

module.exports = router;
