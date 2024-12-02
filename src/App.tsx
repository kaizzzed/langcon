import React, { useState } from "react";
import Logo from "./ui/Logo";
import Question from "./ui/FAQ";
import Icon from "./ui/Icon";
import "./App.css";
import ResponseBox from "./ui/ResponseBox";
import Speaker from "./ui/Volume";
import Microphone from "./ui/Microphone";
import IconDropdown from "./ui/IconDropdown";
import SystemRole from "./ui/SystemRole";
import LogoDesign from "./ui/LogoDesign";
import StartRecording from "./ui/StartRecording";
import UserRole from "./ui/UserRole";
import BeginButton from "./ui/BeginButton";
import EnterLanguageDropdown from "./ui/EnterLanguageDropdown";
import useSpeechRecognition from "./hooks/useSpeechRecognitionHook";
import FAQDropdown from "./ui/FAQDropdown";

function App() {
  const [language, setLanguage] = useState("english");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [dropOpen, setDropOpen] = useState(false); // state to control the visibility of the dropdown
  const [dropFAQOpen, setDropFAQOpen] = useState(false); // control visibility of faq
  const [response, setServerResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [systemRole, setSystemRole] = useState("");
  const [userRole, setUserRole] = useState("");
  const [resultWindow, setResultWindow] = useState(false);
  const [userInput, setUserInput] = useState(""); // Store user input

  const { startListening, stopListening, isListening, hasRecognitionSupport } =
    useSpeechRecognition();

    const handleIconClick = () => { // function to handle the icon click, toggles the dropdown
      setDropOpen(!dropOpen);
    };
    
    const handleFAQClick = () => { // function to handle the icon click, toggles the dropdown
      setDropFAQOpen(!dropFAQOpen);
    };

  const handleResponseSubmit = async (userInput: unknown) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInput,
          systemRole,
          userRole,
          language,
        }),
      });

      const data = await response.json();
      // setResponse(data.response);
      setResultWindow(true);
    } catch (error) {
      console.error("API Error:", error);
      setServerResponse("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageSelect = (language: string) => {
    setLanguage(language);
    setDropOpen(false);
  };

  const handleSelectedLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleBegin = () => {
    if (hasRecognitionSupport) {
      isListening ? stopListening() : startListening(selectedLanguage);
    } else {
      alert("Speech recognition is not supported on this device.");
    }
  };

  const handleBeginButtonClick = () => {
    // If using speech recognition, collect user input and submit it to ChatGPT
    if (userInput) {
      handleResponseSubmit(userInput);
    } else {
      alert("Please provide some input.");
    }
  };

  return (
    <div className="App">
      <header className="header">
        <div className="icon-container">
          <Icon height={80} width={80} onClick={handleIconClick} />
        </div>
        <div className="logo-design">
          <LogoDesign height={80} width={80} />
          <Logo height={40} width={130} />
        </div>
        <div className="FAQ">
          <Question height={40} width={40} onClick={handleFAQClick} />
        </div>
      </header>

      {dropFAQOpen && (
        <FAQDropdown language={language}></FAQDropdown>
      )}

      {resultWindow ? (
        <div className="result-window">
          <h2>ChatGPT Response:</h2>
          <p>{response}</p>
          <button onClick={() => setResultWindow(false)}>Go Back</button>
        </div>
      ) : (
        <div className="center-section">
          {dropOpen && <IconDropdown setLanguage={handleLanguageSelect} />}
          <EnterLanguageDropdown
            setLanguage={handleSelectedLanguageSelect}
            language={language}
            selectedLanguage={selectedLanguage}
          />

          <ResponseBox
            onSubmit={handleResponseSubmit}
            language={language}
            // serverResponse={response}
            // loading={isLoading}
          />

          <div className="input-grid">
            <div className="input-grid-item">
              <SystemRole onSystemRoleChange={setSystemRole} />
            </div>
            <div className="input-grid-item">
              <UserRole onUserRoleChange={setUserRole} language={language} />
            </div>
          </div>

          <div className="speak-grid-container">
            <div className="speak-grid-item">
              <Microphone height={50} width={50} />
            </div>
            <div className="speak-grid-item">
              {/* On click, trigger ChatGPT request with user input */}
              <BeginButton
                onClick={handleBeginButtonClick}
                language={language}
              />
            </div>
            <div className="speak-grid-item">
              <Speaker height={50} width={50} />
            </div>
            <div className="speak-grid-item">
              <StartRecording onClick={handleBegin} language={language}
                isListening={isListening} />
            </div>
          </div>

          {isLoading && <p>Loading...</p>}
        </div>
      )}
    </div>
  );
}

export default App;
