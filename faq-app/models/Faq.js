const mongoose = require("mongoose");

const FaqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }, // Stores HTML content
  translations: {
    question_hi: { type: String },
    question_bn: { type: String },
  },
});

// Method to get translated question
FaqSchema.methods.getTranslatedQuestion = function (lang) {
  return this.translations[`question_${lang}`] || this.question;
};

module.exports = mongoose.model("Faq", FaqSchema);
