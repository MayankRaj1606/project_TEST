const express = require("express");
const Faq = require("../models/Faq");
const translateText = require("../utils/translate"); // Translation utility

const router = express.Router();

// 📌 GET All FAQs with language support
router.get("/", async (req, res) => {
  try {
    const { lang = "en" } = req.query;
    const faqs = await Faq.find();

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

// 📌 POST - Add a new FAQ with Auto-Translation
router.post("/", async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Auto-translate question
    const translations = {
      en: question,
      hi: await translateText(question, "hi"),
      bn: await translateText(question, "bn"),
    };

    const newFaq = new Faq({ question, answer, translations });
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
