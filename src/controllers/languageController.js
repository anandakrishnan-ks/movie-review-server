const Language = require("../models/languageModel");

// ✅ Add Language (Admin only)
exports.addLanguage = async (req, res) => {
  try {
    const { language } = req.body;

    if (!language || language.trim() === "") {
      return res.status(400).json({ message: "Language is required" });
    }

    const exists = await Language.findOne({ language: language.trim() });
    if (exists) {
      return res.status(400).json({ message: "Language already exists" });
    }

    const newLang = await Language.create({ language: language.trim() });
    res.status(201).json({ message: "Language added", language: newLang });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add language", error: err.message });
  }
};

// ✅ Get All Languages (Public)
exports.getLanguages = async (req, res) => {
  try {
    const languages = await Language.find();
    res.status(200).json(languages);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch languages", error: err.message });
  }
};

// ✅ Get Language by ID (Public)
exports.getLanguageById = async (req, res) => {
  try {
    const language = await Language.findById(req.params.id);
    if (!language)
      return res.status(404).json({ message: "Language not found" });
    res.json(language);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching language", error: err.message });
  }
};

// ✅ Update Language (Admin only)
exports.updateLanguage = async (req, res) => {
  try {
    const language = await Language.findById(req.params.id);
    if (!language)
      return res.status(404).json({ message: "Language not found" });

    language.language = req.body.language || language.language;
    const updated = await language.save();

    res.json({ message: "Language updated", language: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update language", error: err.message });
  }
};

// ✅ Delete Language (Admin only)
exports.deleteLanguage = async (req, res) => {
  try {
    const language = await Language.findByIdAndDelete(req.params.id);
    if (!language)
      return res.status(404).json({ message: "Language not found" });

    res.json({ message: "Language deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete language", error: err.message });
  }
};
