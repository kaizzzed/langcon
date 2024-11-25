import React, { useState } from "react";
import { t } from "../languageUtils";

type FaqProp = {
  language: string;
};

export default function FAQDropdown({ language }: FaqProp) {
  const faqItems = [
    {
      question: "What is this app about?",
      answer: "1",
    },
    {
      question: "How do I select a language?",
      answer: "Click on the globe icon or the dropdown to choose a language.",
    },
    {
      question: "3?",
      answer: "3",
    },
  ];

  return (
    <div className="faq-dropdown">
        <div className="faq-dropdown-content">
          {/* mapping over faqItems to display each question and answer */}
          {faqItems.map((item, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question">{item.question}</div>
              <div className="faq-answer">{item.answer}</div>
            </div>
          ))}
        </div>
    </div>
  );
}
