import {useEffect, useState } from 'react';

let recognitition: any = null;
if('webkitSpeechRecognition' in window) {
    recognitition = new webkitSpeechRecognition();
    recognitition.continuous = true;
    recognitition.lang = "en-US";
}

const useSpeechRecognition = () => {
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);

    useEffect(()=> {
        if(!recognitition) return;

        recognitition.onresult = (event: SpeechRecognitionEvent) => {
            console.log("onresult event: ", event);
            setText(event.results[0][0].transcript)
            recognitition.stop();
            setIsListening(false);
        }
    }, []);

     /**
      * 
      * @param languageKey Use ISO-3166-1 (e.g. en-US, de-AT) language keys - otherwise this won't work!!
      */
    const startListening = (languageKey: string) => {
        setText('')
        setIsListening(true)
        recognitition.lang = languageKey;
        console.log(languageKey);
        recognitition.start()
    };

    const stopListening = () => {
        setIsListening(false)
        recognitition.stop()
    };
    console.log(text)
    return {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !!recognitition,
    }
}

export default useSpeechRecognition;