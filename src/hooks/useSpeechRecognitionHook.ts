import {useEffect, useState } from 'react';

let recognition: any = null;
if('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
}

const useSpeechRecognition = () => {
    const [text, setText] = useState<string>("");
    const [isListening, setIsListening] = useState<boolean>(false);

    useEffect(()=> {
        if(!recognition) return;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            console.log("onresult event: ", event);
            setText(event.results[0][0].transcript)
            recognition.stop();
            setIsListening(false);
        }
    }, []);

     /**
      * 
      * @param languageKey Use ISO-3166-1 (e.g. en-US, de-AT) language keys - otherwise this won't work!!
      */
    const startListening = (languageKey: string) => {
        if (!recognition) {
            console.warn("Speech recognition is not supported in this browser.");
            return;
        }
    
        // dynamically set the language
        recognition.lang = languageKey;
    
        // reset text and start listening
        setText('');
        setIsListening(true);
        console.log(`Listening started with language: ${languageKey}`);
        recognition.start();
    };

    const stopListening = () => {
        setIsListening(false)
        recognition.stop()
    };
    console.log(text)
    return {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !!recognition,
    }
}

export default useSpeechRecognition;