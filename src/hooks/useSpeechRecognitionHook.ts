import { useEffect, useState } from 'react';

let recognitition: any = null;
if ('webkitSpeechRecognition' in window) {
  recognitition = new webkitSpeechRecognition();
  recognitition.continuous = true;
  recognitition.lang = "en-US";
}

const useSpeechRecognition = () => {
  const [text, setText] = useState(""); // Stores the recognized speech
  const [translatedText, setTranslatedText] = useState(""); // Stores the translated text
  const [isListening, setIsListening] = useState(false); // Tracks if the microphone is actively listening

  // Function to fetch translation from the backend API
  const fetchTranslation = async (recognizedText: string, targetLanguage: string) => {
    try {
      const response = await fetch('http://localhost:5001/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: recognizedText, // Text from speech recognition
          targetLanguage:"en", // Translation target language
        }),
      });

      const data = await response.json();
      console.log('Translation Response:', data);

      if (data.translatedText) {
        setTranslatedText(data.translatedText); // Update translated text
      } else {
        console.error('Translation API did not return translatedText');
      }
    } catch (error) {
      console.error('Error fetching translation:', error);
    }
  };

  useEffect(() => {
    if (!recognitition) return;

    recognitition.onresult = (event: SpeechRecognitionEvent) => {
      console.log("onresult event: ", event);
      const recognizedText = event.results[0][0].transcript; // Get recognized text
      setText(recognizedText);

      // Call fetchTranslation to translate the recognized text
      fetchTranslation(recognizedText, recognitition.lang);

      // Stop listening after recognizing text
      recognitition.stop();
      setIsListening(false);
    };
  }, []);

  /**
   * Starts speech recognition with the given language.
   * 
   * @param languageKey Use ISO-3166-1 (e.g. en-US, de-AT) language keys - otherwise this won't work!!
   */
  const startListening = (languageKey: string) => {
    setText(''); // Clear previous recognized text
    setTranslatedText(''); // Clear previous translation
    setIsListening(true); // Set listening state
    recognitition.lang = languageKey; // Set recognition language
    console.log(languageKey);
    recognitition.start(); // Start speech recognition
  };

  /**
   * Stops speech recognition.
   */
  const stopListening = () => {
    setIsListening(false); // Reset listening state
    recognitition.stop(); // Stop speech recognition
  };

  console.log({ text, translatedText }); // For debugging

  return {
    text, // Recognized text
    translatedText, // Translated text
    isListening, // Listening state
    startListening, // Start recognition function
    stopListening, // Stop recognition function
    hasRecognitionSupport: !!recognitition, // Check if browser supports speech recognition
  };
};

export default useSpeechRecognition;
