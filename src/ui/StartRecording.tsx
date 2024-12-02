import React from 'react';
import { t } from '../languageUtils';
import './StartRecording.css';

type StartRecordingProps = {
  onClick: () => void;
  language: string;
  isListening: boolean;
};

const StartRecording: React.FC<StartRecordingProps> = ({ onClick, language, isListening }) => {
  return (
    <button onClick={onClick} className={`recording ${isListening ? "recording-active" : ""}`}>
      <br/>{t(language, 'startRecording')} 
    </button>
  );
};

export default StartRecording;
