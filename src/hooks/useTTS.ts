// // hooks/useTextToSpeech.js
// import { useEffect } from "react";

// const useTextToSpeech = (text, languageKey = "en-US") => {
//   useEffect(() => {
//     if (!text) return; // If no text, do nothing

//     // Create a new SpeechSynthesisUtterance
//     const speech = new SpeechSynthesisUtterance();
//     speech.text = text; // Set the text to be spoken
//     speech.lang = languageKey; // Set the language for TTS

//     // Optional: Customize pitch and rate
//     speech.pitch = 1; // Range: 0 to 2
//     speech.rate = 1;  // Range: 0.1 to 10

//     // Speak the text
//     window.speechSynthesis.speak(speech);

//     // Cleanup on unmount or when text changes
//     return () => {
//       window.speechSynthesis.cancel(); // Cancel speech if text changes
//     };
//   }, [text, languageKey]); // Trigger TTS when text or language changes
// };

// export default useTextToSpeech;
