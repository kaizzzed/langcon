import React, { useState } from 'react';
import './ResponseBox.css';

type ResponseBoxProps = {
  onSubmit: (response: string) => void; //take string input and doens't return an outpuut
};

function ResponseBox({ onSubmit }: ResponseBoxProps) { //passes the prop from ResponseBoxProps
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
      <label htmlFor="response">ENTER SCENARIO:</label> 
      <textarea
        id="response" //label
        value={response} //show input in box
        onChange={(e) => setResponse(e.target.value)} //runs when user types input
        placeholder="Enter your scenario here..."
      /> 
      <button type="submit">Begin</button> 
    </form>//calls onSubmit
  ); 
}
/*htmlFor = "response" links label to input with id = "response"
className on the <form> links the css
*/

export default ResponseBox;
