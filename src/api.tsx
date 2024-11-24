import React, { useState } from "react";

function App() {
  const [transcription, setTranscription] = useState("");

  const startListening = async () => {
    const response = await fetch("https://api.assemblyai.com/v2/realtime", {
      headers: {
        Authorization: "ede500ddf82942e3be704f2f868dfe3c",
      },
    });

    const result = await response.json();
    setTranscription(result.text);
  };

  return (
    <div className="App">
      <button onClick={startListening}>Start Listening</button>
      <p>Transcription: {transcription}</p>
    </div>
  );
}

export default App;
