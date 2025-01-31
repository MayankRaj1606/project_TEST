const express = require("express");
const Faq = require("../models/Faq");

const router = express.Router();

// 📌 GET All FAQs with language support
router.get("/", async (req, res) => {
  try {
    const { lang = "en" } = req.query; // Default to English
    const faqs = await Faq.find();

    // Pre-translate FAQs
    const translatedFaqs = faqs.map(faq => ({
      _id: faq._id,
      question: faq.getTranslatedQuestion(lang),
      answer: faq.answer,
    }));

    res.json(translatedFaqs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 POST - Add a new FAQ
router.post("/", async (req, res) => {
  try {
    const { question, answer, translations } = req.body;
    const newFaq = new Faq({
      question,
      answer,
      translations: {
        en: question, // Default language
        ...translations, // Other language translations
      },
    });
    await newFaq.save();
    res.status(201).json(newFaq);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 📌 DELETE - Remove FAQ
router.delete("/:id", async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.json({ message: "FAQ deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting FAQ" });
  }
});

module.exports = router;
