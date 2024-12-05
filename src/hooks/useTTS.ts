import { useState } from "react";

const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (text: string, language:string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;

      // Set the speech rate (you can adjust this value as needed)
      utterance.rate = 1.5; // Change to any value you prefer

      // Get available voices and select a female voice
      const voices = window.speechSynthesis.getVoices();
      // Speak the text
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Your browser does not support text-to-speech.");
    }
  };

  const stop = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return { speak, stop, isSpeaking };
};

export default useTextToSpeech;
