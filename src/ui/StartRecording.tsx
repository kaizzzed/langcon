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
    <div className="recording-container">
      <button onClick={onClick} className={`recording ${isListening ? "recording-active" : ""}`}>
        <span className="recording-icon"></span>
      </button>
      <label htmlFor="recording" className="recording-label">{t(language, "startRecording")}</label>
    </div>
  );
};

export default StartRecording;