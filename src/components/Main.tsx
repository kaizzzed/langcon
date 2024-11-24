import useSpeechRecognition from "../hooks/useSpeechRecognitionHook";

const Main = () => {
    const {text, startListening, stopListening, isListening, hasRecognitionSupport } = useSpeechRecognition();

    return (
        <div>
            <button onClick = {startListening}>Start Listening</button>
        </div>

        
    )
};

export default Main;