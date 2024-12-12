import React, { useState } from "react";
import { t } from "../languageUtils";

type FaqProp = {
  language: string;
};

export default function FAQDropdown({ language }: FaqProp) {
  const faqItems = [
    {
      question: "What is this app about?",
      answer: "This app is a tool for users to practice conversing in a foreign language and recieve personalized feedback.",
    },
    {
      question: "How do I change the page language??",
      answer: "Click on the globe icon and select your preferred language.",
    },
    {
      question: "Quickstart:",
      answer: "Select a language you want to speak in, put in a prompt/situation for the conversation, put in the roles for the user and system, then click begin. When it's your turn to speak, click the green button to turn on your mic, then click it again to turn it off after speaking.",
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