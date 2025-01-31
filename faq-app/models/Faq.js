const mongoose = require("mongoose");

const FaqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }, // Rich text format
  translations: {
    en: { type: String, required: true }, // English (default)
    hi: { type: String }, // Hindi
    bn: { type: String }, // Bengali
  },
});

// Method to get pre-translated question
FaqSchema.methods.getTranslatedQuestion = function (lang) {
  return this.translations[lang] || this.translations.en;
};

module.exports = mongoose.model("Faq", FaqSchema);
