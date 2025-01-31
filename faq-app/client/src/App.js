import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const App = () => {
  const [faqs, setFaqs] = useState([]);
  const [language, setLanguage] = useState("en");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    fetchFaqs();
  }, [language]);

  const fetchFaqs = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/faqs?lang=${language}`);
      setFaqs(res.data);
    } catch (error) {
      console.error("Error fetching FAQs", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/faqs", {
        question,
        answer,
        translations,
      });
      setQuestion("");
      setAnswer("");
      fetchFaqs(); // Refresh FAQs
    } catch (error) {
      console.error("Error adding FAQ", error);
    }
  };

  return (
    <div className="container">
      <h1>FAQs</h1>

      {/* Language Selector */}
      <select onChange={(e) => setLanguage(e.target.value)} value={language}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="bn">Bengali</option>
      </select>

      {/* FAQ List */}
      <ul>
        {faqs.map((faq) => (
          <li key={faq._id}>
            <strong>{faq.question}</strong>
            <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
          </li>
        ))}
      </ul>

      {/* Add FAQ Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <ReactQuill value={answer} onChange={setAnswer} placeholder="Write answer..." />
        <button type="submit">Add FAQ</button>
      </form>
    </div>
  );
};

export default App;
