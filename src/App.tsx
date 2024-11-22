///import React, { useState } from 'react';
import React, { useState} from 'react';

import Logo from './ui/Logo';  
import Icon from './ui/Icon';  
import './App.css';
import ResponseBox from './ui/ResponseBox';
import IconDropdown from './ui/IconDropdown';
import { t } from './languageUtils';
import EnterLanguageDropdown from './ui/EnterLanguageDropdown';
import TranscriptionDisplay from './api/TranscriptionDisplay';


function App() {
  const [selectLanguage, setSelectLanguage] = useState(''); // selectLanguage stores the langauge picked
  const [dropOpen, setDropOpen] = useState(false); // state to control the visibility of the dropdown
  const [language, setLanguage] = useState('english'); // state to keep track of the selected language

  const handleIconClick = () => { // function to handle the icon click, toggles the dropdown
    setDropOpen(!dropOpen);
  };

  const handleResponseSubmit = (response:any) => { // function to handle the submission of user responses
    console.log("User response: ", response);
  };

  const [resultWindow, setResultWindow] = useState(false); // turn true after api call
  

  return (
    <div className = "App">
      <div className="header">
        <div className="IconContainer">
          <Icon height={64} width={64} onClick={handleIconClick} />
        </div>
        <div className="LogoContainer">
          <Logo height={30} width={100}/> 
        </div>
        <div>
          {/* add in question elem later */}
        </div>
      </div>
      {
        resultWindow ? ( // result section (2)
          <>
            
          </>
        ) : ( // inital section (1)
          <>
            {dropOpen && (
              <IconDropdown setLanguage={setLanguage}></IconDropdown>
            )}
            <div className='center-section'>
              <EnterLanguageDropdown setLanguage={setSelectLanguage}></EnterLanguageDropdown>
              {/* pass the selected language to the ResponseBox component */}
              <ResponseBox onSubmit={ handleResponseSubmit} language={language}/> 
            </div>
          </>
        )
      }
      {/* Display the TranscriptionDisplay component which will handle the transcription display */}
      <TranscriptionDisplay />
    </div>





  );
}

export default App;