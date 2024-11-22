import React, { useState } from "react";

const NumLines: React.FC = () => {
  const [numLines, setNumLines] = useState<string>("");//holds value of input
  const [isInvalid, setIsInvalid] = useState<boolean>(false);//state variable that's either valid or invalid

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { //event handler when input changes when user types in input
    const value = e.target.value; //gets new value
    setNumLines(value);

    // check if input is empty or 1: needs to be more than 1 line for a convo
    if (!value || Number(value) <= 1) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false); // greater than 1 line is valid
    }
  };

  return (
    <div className="input-container">
      <label htmlFor="num-lines">NUM OF LINES</label>
      <input
        id="num-lines"
        type="number"//onl accept numbers
        value={numLines}//value of input
        onChange={handleInputChange}//handles change
        style={{
          borderColor: isInvalid ? "red" : "", // red border around input box for invalid inputs
          borderWidth: "2px",
        }}
      />
    </div>
  );
};

export default NumLines;
