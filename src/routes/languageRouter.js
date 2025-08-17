const express = require("express");
const router = express.Router();
const {
  addLanguage,
  getLanguages,
  getLanguageById,
  updateLanguage,
  deleteLanguage,
} = require("../controllers/languageController");
const { protect, admin } = require("../middlewares/authMiddleware");

// Public routes
router.get("/", getLanguages); // Get all languages
router.get("/:id", getLanguageById); // Get language by ID

// Admin routes
router.post("/", protect, admin, addLanguage); // Add language
router.put("/:id", protect, admin, updateLanguage); // Update language
router.delete("/:id", protect, admin, deleteLanguage); // Delete language

module.exports = router;
