const Language = require("../models/languageModel");

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
    res.status(500).json({
      message: "Failed to add language",
      error: err.message,
    });
  }
};
