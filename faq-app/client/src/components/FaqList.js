import React, { useEffect, useState } from "react";

const FaqList = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/faqs") // API to fetch FAQs
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch FAQs");
        }
        return response.json();
      })
      .then((data) => {
        setFaqs(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading FAQs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>FAQs</h2>
      <ul>
        {faqs.map((faq) => (
          <li key={faq._id}>
            <strong>{faq.question}</strong>
            <p>{faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FaqList;
