import useSpeechRecognition from "../hooks/useSpeechRecognitionHook";

const Main = () => {
    const {text, startListening, stopListening, isListening, hasRecognitionSupport } = useSpeechRecognition();

    return (
        <div>
        </div>

        
    )
};

export default Main;