const express = require("express");
const Faq = require("../models/Faq");
const auth = require("../middleware/auth");
const translateText = require("../utils/translate");

const router = express.Router();

// 📌 Get all FAQs
router.get("/", async (req, res) => {
  const { lang = "en" } = req.query;
  const faqs = await Faq.find();
  res.json(faqs.map(faq => ({ _id: faq._id, question: faq.getTranslatedQuestion(lang), answer: faq.answer })));
});

// 📌 Create a new FAQ (Protected)
router.post("/", auth, async (req, res) => {
  try {
    const { question, answer } = req.body;

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

// 📌 Delete FAQ (Protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.json({ message: "FAQ deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting FAQ" });
  }
});

module.exports = router;
