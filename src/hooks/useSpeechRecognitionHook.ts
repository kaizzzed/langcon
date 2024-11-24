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

    const startListening = () => {
        setText('')
        setIsListening(true)
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