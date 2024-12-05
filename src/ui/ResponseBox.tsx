import React, { useState, useEffect } from 'react';
import './ResponseBox.css';
import { t } from '../languageUtils';

type ResponseBoxProps = {
  onSubmit: (response: string) => void; // takes string input and doesn't return an output
  language: string;
  isResultWindow: boolean; // new prop to check if result window is shown
  serverResponse?: string; // new prop to display server response
};

function ResponseBox({ onSubmit, language, serverResponse, isResultWindow }: ResponseBoxProps) {
  const [response, setResponse] = useState<string>(''); 

  useEffect(() => {
    if (isResultWindow && serverResponse) {
      setResponse(serverResponse); // Set the response to the server's reply
    }
  }, [isResultWindow, serverResponse]); // Only update when result window is toggled or server response changes

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(e.target.value);
    onSubmit(e.target.value); // Pass input to the parent
  };

  // If result window is active, replace user input with the server's response
  const displayResponse = isResultWindow ? serverResponse : response;

  return (
    <div className="scenario-input">
      {/* Change label text based on isResultWindow */}
      <label htmlFor="response">{isResultWindow ? t(language, "conversation") : t(language, "enterScenario")}</label>
      
      <textarea
        id="response"
        value={displayResponse} // Show response or input in the box
        onChange={handleInputChange}
        placeholder={t(language, "enterYourScenarioHere")}
        disabled={isResultWindow} // Disable textarea when result window is active
        className={isResultWindow ? 'response-textarea-result' : 'response-textarea'}
      />
    </div>
  );
}

export default ResponseBox;
