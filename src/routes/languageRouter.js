const express = require("express");
const router = express.Router();
const { addLanguage } = require("../controllers/languageController");

// POST /api/languages
router.post("/", addLanguage);

module.exports = router;
