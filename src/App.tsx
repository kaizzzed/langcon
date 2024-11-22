import React, { useState } from 'react';
import Logo from './ui/Logo';
import Question from './ui/FAQ';
import Icon from './ui/Icon';
import './App.css';
import ResponseBox from './ui/ResponseBox';
import Speaker from './ui/Volume';
import Microphone from './ui/Microphone';
import IconDropdown from './ui/IconDropdown';
import { t } from './languageUtils';
import SystemRole from './ui/SystemRole';
import UserRole from './ui/UserRole';
import NumLines from './ui/NumLines';
import SystemStarts from './ui/SystemStarts';
import BeginButton from './ui/BeginButton';
import EnterLanguageDropdown from './ui/EnterLanguageDropdown';

function App() {
  const [selectLanguage, setSelectLanguage] = useState(''); // selectLanguage stores the language picked
  const [dropOpen, setDropOpen] = useState(false); // state to control the visibility of the dropdown
  const [language, setLanguage] = useState('english'); // state to keep track of the selected language
  
  const handleIconClick = () => { // function to handle the icon click, toggles the dropdown
    setDropOpen(!dropOpen);
  };

  const handleResponseSubmit = (response: any) => { // function to handle the submission of user responses
    console.log("User response: ", response);
  };

  const [resultWindow, setResultWindow] = useState(false); // turn true after API call

  // function to handle the selection of a language
  const handleLanguageSelect = (lang: string) => {
    setLanguage(lang);
    setSelectLanguage(lang); // Optionally set both states
    setDropOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="App">
      <div className="header">
        <div className="IconContainer">
          <Icon height={64} width={64} onClick={handleIconClick} />
        </div>
        <div className="LogoContainer">
          <Logo height={40} width={130}/> 
        </div>
        <div className="FAQ">
          <Question height={40} width={40}/> 
        </div>
      </div>

      {
        resultWindow ? ( // result section (2)
          <>
            {/* Add content here for the result window */}
          </>
        ) : ( // initial section (1)
          <>
            {dropOpen && (
              <IconDropdown setLanguage={handleLanguageSelect} />
            )}
            <div className='center-section'>
              <EnterLanguageDropdown setLanguage={setSelectLanguage} />
              <ResponseBox onSubmit={handleResponseSubmit} language={language}/>

              {/* grid container for user inputs */}
              <div className="input-grid">
                <div className="input-grid-item">
                  <SystemRole />
                </div>
                <div className="input-grid-item">
                  <UserRole />
                </div>
                <div className="input-grid-item">
                  <NumLines />
                </div>
                <div className="input-grid-item">
                  <SystemStarts />
                </div>
                <div className="input-grid-item">
                </div>
                <div className="input-grid-item">
                  <BeginButton onClick={() => console.log('Begin button clicked!')} />
                </div>
                
              </div>

              <div className="speak-grid-container">
                <div className="speak-grid-item">
                  <Microphone height={50} width={50} />
                </div>
                  <Speaker height={50} width={50} />
                <div className="speak-grid-item">
                </div>
              </div>
            </div>
          </>
        )
      }
    </div>
  );
}

export default App;
