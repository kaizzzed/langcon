import { useState, useEffect } from 'react';
import { TranslationServiceClient } from '@google-cloud/translate';


let recognition: any = null;
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'en-US'; 
}

const useSpeechRecognition = (targetLanguage: string = 'fr') => {  
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const client = new TranslationServiceClient();
    
    const fetchTranslation = async (recognizedText: string) => {
      try {
        const response = await fetch('http://localhost:5002/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: recognizedText,
            targetLanguage: targetLanguage,  // Sending target language for translation
          }),
        });
    
        const data = await response.json();
        console.log(data); 
        setTranslatedText(data.translatedText); 
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    useEffect(() => {
      if (!recognition) return;
  
      recognition.onresult = async (event: SpeechRecognitionEvent) => {
        const transcribedText = event.results[0][0].transcript;
        console.log('Recognized text: ', transcribedText);
  
        setText(transcribedText);
  
        fetchTranslation(transcribedText);
  
        // Stop listening after each transcription
        recognition.stop();
        setIsListening(false);
      };
    }, [targetLanguage]);
  
    const startListening = () => {
      setText('');
      setIsListening(true);
      recognition.start();
    };
  
    const stopListening = () => {
      setIsListening(false);
      recognition.stop();
    };
  
    return {
      text,
      translatedText,
      isListening,
      startListening,
      stopListening,
      hasRecognitionSupport: !!recognition,
    };
  };
  
  export default useSpeechRecognition;
  