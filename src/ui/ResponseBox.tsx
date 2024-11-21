import React, { useState } from 'react';
import './ResponseBox.css';
import { t } from '../languageUtils';
import BeginButton from './BeginButton'; // import BeginButton component

type ResponseBoxProps = {
  onSubmit: (response: string) => void; // takes string input and doesn't return an output
  language: string;
};

function ResponseBox({ onSubmit, language }: ResponseBoxProps) { // passes the prop from ResponseBoxProps
  const [response, setResponse] = useState<string>(""); // store what user types

  const handleSubmit = () => { // function will run when Begin button clicked
    if (response.trim()) { // remove spaces at start/end + if empty, not run
      onSubmit(response); // call onSubmit to handle the response
      setResponse(""); // after input, clears box
    }
  };

  return (
    <div className="scenario-input">
      <label htmlFor="response">{t(language, "enterScenario")}</label>
      <textarea
        id="response" // label
        value={response} // show input in box
        onChange={(e) => setResponse(e.target.value)} // runs when user types input
        placeholder={t(language, "enterYourScenarioHere")}
      />
      <BeginButton onClick={handleSubmit} /> {/* pass handleSubmit directly */}
    </div>
  );
}

export default ResponseBox;
