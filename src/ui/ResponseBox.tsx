import React, { useState } from 'react';
import './ResponseBox.css';
import { t } from '../languageUtils';

type ResponseBoxProps = {
  onSubmit: (response: string) => void; //take string input and doens't return an output
  language: string;
};

function ResponseBox({ onSubmit, language }: ResponseBoxProps) { //passes the prop from ResponseBoxProps
  const [response, setResponse] = useState<string>("");//store what user types

  const handleSubmit = (e: React.FormEvent) => { //function will run when begin button clicked
    e.preventDefault();//stops page refresh
    if (response.trim()) { //remove spaces at start/end + if empty, not run
      onSubmit(response);
      setResponse(""); // after input, clears box
    }
  };

  return (
    <form onSubmit={handleSubmit} className="scenario-input">
      <label htmlFor="response">{t(language, "enterScenario")}</label>
      <textarea
        id="response" //label
        value={response} //show input in box
        onChange={(e) => setResponse(e.target.value)} //runs when user types input
        placeholder={t(language, "enterYourScenarioHere")}
      /> 
      <button type="submit">{t(language, "begin")}</button> 
    </form>//calls onSubmit
  ); 
}
/*htmlFor = "response" links label to input with id = "response"
className on the <form> links the css
*/

export default ResponseBox;
