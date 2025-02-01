const { Translate } = require("@google-cloud/translate").v2;
require("dotenv").config();

const translate = new Translate({
  key: process.env.GOOGLE_API_KEY,
});

const translateText = async (text, targetLang) => {
  try {
    const [translation] = await translate.translate(text, targetLang);
    return translation;
  } catch (error) {
    console.error("Translation Error:", error);
    return text; // Fallback to original text (assumed English)
  }
};

module.exports = translateText;
