import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [faqs, setFaqs] = useState([]);
  const [language, setLanguage] = useState("en");

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

  return (
    <div className="container">
      <h1>FAQs</h1>
      <select onChange={(e) => setLanguage(e.target.value)} value={language}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="bn">Bengali</option>
      </select>
      <ul>
        {faqs.map((faq) => (
          <li key={faq._id}>
            <strong>{faq.question}</strong>
            <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
