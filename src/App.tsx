import React, { useState } from 'react';
import Logo from './ui/Logo';  
import Icon from './ui/Icon';  
import './App.css';
import ResponseBox from './ui/ResponseBox';
import IconDropdown from './ui/IconDropdown';
import { t } from './languageUtils';

function App() {
  const [dropOpen, setDropOpen] = useState(false);
  const [language, setLanguage] = useState("english");
  // state, and then fn to overwrite state
  const handleIconClick = () => {
    setDropOpen(!dropOpen);
  };

  const handleResponseSubmit = (response:any) => {
    console.log("User response: ", response);
  };

  return (
    <div className = "App">
      <div className="header">
        <div className="IconContainer">
          <Icon height={64} width={64} onClick={handleIconClick} />
        </div>
        {dropOpen && (
          <IconDropdown setLanguage={setLanguage}></IconDropdown>
        )}
        <div className="LogoContainer">
          <Logo height={30} width={100}/> 
        </div>
      </div>
      <ResponseBox onSubmit={handleResponseSubmit} language={language}/> 
    </div>
  );
}

export default App;