const express = require("express");
const router = express.Router();
const { addLanguage } = require("../controllers/languageController");
const { protect, admin } = require("../middlewares/authMiddleware");

// POST /api/languages (Admin only)
router.post("/", protect, admin, addLanguage);

module.exports = router;
