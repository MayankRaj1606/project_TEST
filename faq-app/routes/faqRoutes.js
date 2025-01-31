const express = require("express");
const Faq = require("../models/Faq");

const router = express.Router();

// Get all FAQs (with optional translation)
router.get("/", async (req, res) => {
  try {
    const { lang } = req.query;
    let faqs = await Faq.find();

    if (lang) {
      faqs = faqs.map(faq => ({
        _id: faq._id,
        question: faq.getTranslatedQuestion(lang),
        answer: faq.answer,
      }));
    }

    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new FAQ
router.post("/", async (req, res) => {
  try {
    const { question, answer, translations } = req.body;
    const newFaq = new Faq({ question, answer, translations });
    await newFaq.save();
    res.status(201).json(newFaq);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
