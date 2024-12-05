import React, { useState } from 'react';
import Logo from './ui/Logo';
import Question from './ui/FAQ';
import Icon from './ui/Icon';
import './App.css';
import ResponseBox from './ui/ResponseBox';
import Speaker from './ui/Volume';
import Microphone from './ui/Microphone';
import IconDropdown from './ui/IconDropdown';
import SystemRole from './ui/SystemRole';
import LogoDesign from './ui/LogoDesign';
import StartRecording from './ui/StartRecording';
import UserRole from './ui/UserRole';
import BeginButton from './ui/BeginButton';
import EnterLanguageDropdown from './ui/EnterLanguageDropdown';
import useSpeechRecognition from './hooks/useSpeechRecognitionHook';
import FAQDropdown from './ui/FAQDropdown';
import useTextToSpeech from "./hooks/useTTS";

function App() {
  // State variables to manage various aspects of the app
  const [response, setServerResponse] = useState(''); // Stores the server's response
  const [isLoading, setIsLoading] = useState(false); // Controls loading spinner visibility
  const [systemRole, setSystemRole] = useState(''); // Stores the system role input
  const [userRole, setUserRole] = useState(''); // Stores the user role input
  const [resultWindow, setResultWindow] = useState(false); // Toggles the result window visibility
  const [userInput, setUserInput] = useState(''); // Stores user input text
  const [selectLanguageDropdown, setSelectLanguageDropdown] = useState('English');
  const [dropOpen, setDropOpen] = useState(false); // Controls the dropdown visibility
  const [dropFAQOpen, setDropFAQOpen] = useState(false); // Controls FAQ dropdown visibility
  const [language, setLanguage] = useState('english'); // Keeps track of the page language
  const { speak, stop, isSpeaking } = useTextToSpeech();

  const {
    text: recognizedText,
    translatedText,
    startListening,
    stopListening,
    isListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();
  
  // Mapping for language names to their respective keys
  const languageMap: { [key: string]: string } = {
    Arabic: 'ar-SA', // Arabic (Saudi Arabia)
    Chinese: 'zh-CN', // Simplified Chinese (China)
    English: 'en-US', // English (United States)
    French: 'fr-FR', // French (France)
    German: 'de-DE', // German (Germany)
    Hindi: 'hi-IN', // Hindi (India)
    Italian: 'it-IT', // Italian (Italy)
    Japanese: 'ja-JP', // Japanese (Japan)
    Korean: 'ko-KR', // Korean (South Korea)
    Portuguese: 'pt-PT', // Portuguese (Portugal)
    Russian: 'ru-RU', // Russian (Russia)
    Spanish: 'es-ES', // Spanish (Spain)
    Turkish: 'tr-TR', // Turkish (Turkey)
    Vietnamese: 'vi-VN', // Vietnamese (Vietnam)
  };
  
  const handleSystemRoleChange = (role: string) => {
    setSystemRole(role);
  };

  const handleUserRoleChange = (role: string) => {
    setUserRole(role);
  };
  
// Define the function with a specific type for the 'language' parameter
const getLanguageCode = (language: string): string => {
  return languageMap[language] || 'Unknown language';
};

  // Handles the dropdown toggle for the icon
  const handleIconClick = () => {
    setDropOpen(!dropOpen);
  };

  // Handles the dropdown toggle for FAQs
  const handleFAQClick = () => {
    setDropFAQOpen(!dropFAQOpen);
  };

  const handleResponseSubmit = async (userInput: string) => {
    setIsLoading(true);
    try {
      console.log(userInput);
      console.log("systemrole"+ systemRole);
      console.log("userrole" + userRole);
      console.log("language"+selectLanguageDropdown)
      const response= await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
        userInput,
        systemRole,
        userRole,
        selectLanguageDropdown
      }),
    });
      const data = await response.json();
      setServerResponse(data.response);
      
      speak(data.response, getLanguageCode(selectLanguageDropdown));
      
      setResultWindow(true);
    } catch (error) {
      console.error('API Error:', error);
      setServerResponse('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handles the language selection from the dropdown
  const handleLanguageSelect = (language: string) => {
    setLanguage(language); // Updates the page language
    setDropOpen(false); // Closes the dropdown
  };

  // Handles the start/stop of voice recording
  const handleBegin = () => {
    if (hasRecognitionSupport) {
      const languageCode = getLanguageCode(selectLanguageDropdown);
      isListening ? stopListening() : startListening(languageCode);
      // isListening ? stopListening() : startListening(selectLanguageDropdown); // Toggles speech recognition
    } else {
      alert('Speech recognition is not supported on this device.'); // Alert for unsupported devices
    }
  };

  // Handles the Begin button click to trigger ChatGPT response
  const handleBeginButtonClick = () => {
    if (userInput.trim()) {
      handleResponseSubmit(userInput);
    } else {
      alert("Please provide some input.");
    }
  };

  return (
    <div className="App">
      <header className="header">
        {/* Icon for dropdown menu */}
        <div className="icon-container" onClick={handleIconClick}>
          <Icon height={80} width={80} />
        </div>
        {/* Logo section */}
        <div className="logo-design">
          <LogoDesign height={80} width={80} />
          <Logo height={40} width={130} />
        </div>
        {/* FAQ section */}
        <div className="FAQ">
          <Question height={40} width={40} onClick={handleFAQClick} />
        </div>
      </header>
    
      {/* FAQ dropdown */}
      {dropFAQOpen && <FAQDropdown language={language} />}

        <div className="center-section">
        {isLoading?(
        <div className="loading">Loading...</div> // You can replace this with a spinner if you prefer
      ) : (
        <>
          {/* Language selection dropdown */}
          {dropOpen && <IconDropdown setLanguage={handleLanguageSelect} />}
          <EnterLanguageDropdown 
          setLanguage={setSelectLanguageDropdown} 
          selectedLanguage={selectLanguageDropdown} 
          language={language}/>

        {/* Conditionally render the ResponseBox or Loading indicator */}
   
          <ResponseBox
              onSubmit={(input) => setUserInput(input)} // Captures user input
              language={language} 
              isResultWindow={resultWindow} 
              serverResponse={response}
           />

          {/* <ResponseBox onSubmit={handleResponseSubmit} language={language} serverResponse={response} loading={isLoading} /> */}
          
          
          {/* Input grid for role settings */}
          <div className="input-grid">
            <div className="input-grid-item">
              <SystemRole
              onSystemRoleChange={handleSystemRoleChange} 
              language={language} 
              isResultWindow={resultWindow} 
              systemRole={systemRole}
              />
            </div>
            <div className="input-grid-item">
              <UserRole onUserRoleChange={handleUserRoleChange}
              language={language}
              isResultWindow={resultWindow} 
              userRole={userRole} />
            </div>
          </div>

          {/* Speak grid for microphone, speaker, and recording */}
          <div className="speak-grid-container">
            <div className="speak-grid-item">
              <Microphone height={50} width={50} /> 
            </div>
            <div className="speak-grid-item">
              <BeginButton onClick={handleBeginButtonClick} text={language} />
            </div>
            <div className="speak-grid-item">
              <Speaker height={50} width={50} />
            </div>
            <div className="recording-container">
              <StartRecording
                onClick={handleBegin}
                language={language}
                isListening={isListening}
                />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
  
  export default App;
