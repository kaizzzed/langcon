import React, { useState } from 'react';
import Logo from './ui/Logo';
import Question from './ui/FAQ';
import OpenAI from "openai";
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
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

function App() {
  // State variables to manage various aspects of the app
  const [response, setServerResponse] = useState(''); // Stores the server's response
  const [isLoading, setIsLoading] = useState(false); // Controls loading spinner visibility
  const [systemRole, setSystemRole] = useState(''); // Stores the system role input
  const [userRole, setUserRole] = useState(''); // Stores the user role input
  const [resultWindow, setResultWindow] = useState(false); // Toggles the result window visibility
  const [userInput, setUserInput] = useState(''); // Stores user input text
  const [selectLanguageDropdown, setSelectLanguageDropdown] = useState('English');
  // const [selectLanguageDropdown, setSelectLanguageDropdown] = useState<string>('English');
  // const [selectedLanguage, setSelectedLanguage] = useState(''); // Stores the selected language key
  // const [selectedLanguageValue, setSelectedLanguageValue] = useState(''); // Stores the selected language value
  const [dropOpen, setDropOpen] = useState(false); // Controls the dropdown visibility
  const [dropFAQOpen, setDropFAQOpen] = useState(false); // Controls FAQ dropdown visibility
  const [language, setLanguage] = useState('english'); // Keeps track of the page language

  const {
    text: recognizedText,
    translatedText,
    startListening,
    stopListening,
    isListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();
  // // Custom speech recognition hook
  // const { startListening, stopListening, isListening, hasRecognitionSupport } =
  //   useSpeechRecognition();


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

  // //Handles the language selection for conversation
  //const handleSelectedLanguageSelect = (languageKey:string, languageValue:string) => {
  //   setSelectedLanguage(languageKey); // Stores the language key
  //   setSelectedLanguageValue(languageValue); // Stores the language value
  // };

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

      
      {resultWindow ? (
        <div className="result-window">
          <h2>ChatGPT Response:</h2>
          <p>{response}</p>
          <button onClick={() => setResultWindow(false)}>Go Back</button>
        </div>
      ) : (
        <div className="center-section">
          {/* Language selection dropdown */}
          {dropOpen && <IconDropdown setLanguage={handleLanguageSelect} />}
          <EnterLanguageDropdown 
          setLanguage={setSelectLanguageDropdown} 
          selectedLanguage={selectLanguageDropdown} 
          language={language}/>
          {/* <EnterLanguageDropdown
            setLanguageKey={setSelectedLanguage} 
            setLanguageValue={setSelectedLanguageValue}
            // setLanguage={handleSelectedLanguageSelect}
            selectedLanguage={selectedLanguage}
            language={language}
          /> */}

          {/* Response box for user input */}
          <ResponseBox
            onSubmit={(input) => setUserInput(input)} // Captures user input
            language={language}
          />
          {/* <ResponseBox onSubmit={handleResponseSubmit} language={language} serverResponse={response} loading={isLoading} /> */}
          {/* Input grid for role settings */}
          <div className="input-grid">
            <div className="input-grid-item">
              <SystemRole onSystemRoleChange={setSystemRole} language={language} />
            </div>
            <div className="input-grid-item">
              <UserRole onUserRoleChange={setUserRole} language={language} />
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
          <div className="recognized-translation-container">
            <h2>Recognized Text:</h2>
            <p>{recognizedText}</p>
            <h2>Translated Text:</h2>
            <p>{translatedText}</p>
          </div>

          {/* Loading indicator */}
          {isLoading && <p>Loading...</p>}
        </div>
      )}
    </div>
  );
}

export default App;

// import React, { useState } from 'react';
// import Logo from './ui/Logo';
// import Question from './ui/FAQ';
// import Icon from './ui/Icon';
// import './App.css';
// import ResponseBox from './ui/ResponseBox';
// import Speaker from './ui/Volume';
// import Microphone from './ui/Microphone';
// import IconDropdown from './ui/IconDropdown';
// import SystemRole from './ui/SystemRole';
// import LogoDesign from './ui/LogoDesign';
// import StartRecording from './ui/StartRecording';
// import UserRole from './ui/UserRole';
// import BeginButton from './ui/BeginButton';
// import EnterLanguageDropdown from './ui/EnterLanguageDropdown';
// import useSpeechRecognition from './hooks/useSpeechRecognitionHook';
// import FAQDropdown from './ui/FAQDropdown';

// function App() {
//   // State variables to manage various aspects of the app
//   const [response, setServerResponse] = useState(''); // Stores the server's response
//   const [isLoading, setIsLoading] = useState(false); // Controls loading spinner visibility
//   const [systemRole, setSystemRole] = useState(''); // Stores the system role input
//   const [userRole, setUserRole] = useState(''); // Stores the user role input
//   const [resultWindow, setResultWindow] = useState(false); // Toggles the result window visibility
//   const [userInput, setUserInput] = useState(''); // Stores user input text
//   // const [selectLanguageDropdown, setSelectLanguageDropdown] = useState('English'); // Stores the selected language name
//   const [selectLanguageDropdown, setSelectLanguageDropdown] = useState<LanguageKey>('English');
//   const [dropOpen, setDropOpen] = useState(false); // Controls the dropdown visibility
//   const [dropFAQOpen, setDropFAQOpen] = useState(false); // Controls FAQ dropdown visibility
//   const [language, setLanguage] = useState('english'); // Keeps track of the page language
  
//   const {
//     text: recognizedText,
//     translatedText,
//     startListening,
//     stopListening,
//     isListening,
//     hasRecognitionSupport,
//   } = useSpeechRecognition();

//   // Mapping for language names to their respective keys
//   const languageMap = {
//     Afrikaans: 'af',
//     Albanian: 'sq',
//     Amharic: 'am',
//     Arabic: 'ar',
//     Armenian: 'hy',
//     Azerbaijani: 'az',
//     Basque: 'eu',
//     Belarusian: 'be',
//     Bengali: 'bn',
//     Bosnian: 'bs',
//     Bulgarian: 'bg',
//     Catalan: 'ca',
//     Cebuano: 'ceb',
//     Chinese: 'zh',
//     Corsican: 'co',
//     Croatian: 'hr',
//     Czech: 'cs',
//     Danish: 'da',
//     Dutch: 'nl',
//     English: 'en',
//     Esperanto: 'eo',
//     Estonian: 'et',
//     Filipino: 'tl',
//     Finnish: 'fi',
//     French: 'fr',
//     Galician: 'gl',
//     Georgian: 'ka',
//     German: 'de',
//     Greek: 'el',
//     Gujarati: 'gu',
//     'Haitian Creole': 'ht',
//     Hausa: 'ha',
//     Hawaiian: 'haw',
//     Hebrew: 'he',
//     Hindi: 'hi',
//     Hmong: 'hmn',
//     Hungarian: 'hu',
//     Icelandic: 'is',
//     Igbo: 'ig',
//     Indonesian: 'id',
//     Irish: 'ga',
//     Italian: 'it',
//     Japanese: 'ja',
//     Javanese: 'jw',
//     Kannada: 'kn',
//     Kazakh: 'kk',
//     Khmer: 'km',
//     Korean: 'ko',
//     Kurdish: 'ku',
//     Kyrgyz: 'ky',
//   };
//   type LanguageKey = keyof typeof languageMap;
  
//   // Handles the dropdown toggle for the icon
//   const handleIconClick = () => {
//     setDropOpen(!dropOpen);
//   };

//   // Handles the dropdown toggle for FAQs
//   const handleFAQClick = () => {
//     setDropFAQOpen(!dropFAQOpen);
//   };

//   // Handles the submission of user input to the backend
//   const handleResponseSubmit = async (userInput: string) => {
//     setIsLoading(true); // Starts loading indicator
//     try {
//       console.log(userInput);
//       console.log("systemRole", systemRole);
//       console.log("userRole", userRole);
//       console.log("language" + selectLanguageDropdown); // Logging the selected language name

//       // Send user input, system role, and other settings to the server
//       const response = await fetch('http://localhost:5000/api/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userInput,
//           systemRole,
//           userRole,
//           selectLanguageDropdown, // Sending the language name to the backend
//         }),
//       });

//       // Parse and store the server's response
//       const data = await response.json();
//       setServerResponse(data.response);
//       setResultWindow(true); // Show result window
//     } catch (error) {
//       console.error('API Error:', error);
//       setServerResponse('An error occurred. Please try again.'); // Error message
//     } finally {
//       setIsLoading(false); // Stops loading indicator
//     }
//   };

//   // Handles the language selection from the dropdown
//   const handleLanguageSelect = (languageName: string) => {
//     setLanguage(languageName); // Updates the page language (for display)
//     setSelectLanguageDropdown(languageName); // Updates the selected language name for submission
//     setDropOpen(false); // Closes the dropdown
//   };

//   // Handles the start/stop of voice recording
//   const handleBegin = () => {
//     if (hasRecognitionSupport) {
//       // Pass the selected language key to startListening based on the selected language name
//       const languageKey = languageMap[selectLanguageDropdown];
//       isListening ? stopListening() : startListening(languageKey); 
//     } else {
//       alert('Speech recognition is not supported on this device.'); // Alert for unsupported devices
//     }
//   };

//   // Handles the Begin button click to trigger ChatGPT response
//   const handleBeginButtonClick = () => {
//     if (userInput.trim()) {
//       handleResponseSubmit(userInput); // Submits input if not empty
//     } else {
//       alert("Please provide some input."); // Alert for empty input
//     }
//   };

//   return (
//     <div className="App">
//       <header className="header">
//         {/* Icon for dropdown menu */}
//         <div className="icon-container" onClick={handleIconClick}>
//           <Icon height={80} width={80} />
//         </div>
//         {/* Logo section */}
//         <div className="logo-design">
//           <LogoDesign height={80} width={80} />
//           <Logo height={40} width={130} />
//         </div>
//         {/* FAQ section */}
//         <div className="FAQ">
//           <Question height={40} width={40} onClick={handleFAQClick} />
//         </div>
//       </header>

//       {/* FAQ dropdown */}
//       {dropFAQOpen && <FAQDropdown language={language} />}

//       {resultWindow ? (
//         <div className="result-window">
//           <h2>ChatGPT Response:</h2>
//           <p>{response}</p>
//           <button onClick={() => setResultWindow(false)}>Go Back</button>
//         </div>
//       ) : (
//         <div className="center-section">
//           {/* Language selection dropdown */}
//           {dropOpen && <IconDropdown setLanguage={handleLanguageSelect} />}
//           <EnterLanguageDropdown 
//             setLanguage={setSelectLanguageDropdown} 
//             selectedLanguage={selectLanguageDropdown} 
//             language={language}
//           />
          
//           {/* Response box for user input */}
//           <ResponseBox
//             onSubmit={(input) => setUserInput(input)} // Captures user input
//             language={language}
//           />
          
//           {/* Input grid for role settings */}
//           <div className="input-grid">
//             <div className="input-grid-item">
//               <SystemRole onSystemRoleChange={setSystemRole} language={language} />
//             </div>
//             <div className="input-grid-item">
//               <UserRole onUserRoleChange={setUserRole} language={language} />
//             </div>
//           </div>

//           {/* Speak grid for microphone, speaker, and recording */}
//           <div className="speak-grid-container">
//             <div className="speak-grid-item">
//               <Microphone height={50} width={50} /> 
//             </div>
//             <div className="speak-grid-item">
//               <BeginButton onClick={handleBeginButtonClick} text={language} />
//             </div>
//             <div className="speak-grid-item">
//               <Speaker height={50} width={50} />
//             </div>
//             <div className="recording-container">
//               <StartRecording
//                 onClick={handleBegin}
//                 language={language}
//                 isListening={isListening}
//               />
//             </div>
//           </div>
//           <div className="recognized-translation-container">
//             <h2>Recognized Text:</h2>
//             <p>{recognizedText}</p>
//             <h2>Translated Text:</h2>
//             <p>{translatedText}</p>
//           </div>

//           {/* Loading indicator */}
//           {isLoading && <p>Loading...</p>}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
