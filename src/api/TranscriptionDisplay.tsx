// TranscriptionDisplay.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TranscriptionDisplay() {
  const [transcribedText, setTranscribedText] = useState<string>('');

  useEffect(() => {
    async function fetchTranscription() {
      try {
        const response = await axios.post('http://localhost:5000/transcribe');
        console.log("Backend Response:", response.data);  // Log the response to check data structure

        setTranscribedText(response.data.transcribedText);
      } catch (error) {
        console.error('Error fetching transcription:', error);
      }
    }

    fetchTranscription();
  }, []);

  return (
    <div>
      <h2>Transcribed Text</h2>
      <p>{transcribedText || 'Loading transcription...'}</p>
    </div>
  );
}

export default TranscriptionDisplay;


