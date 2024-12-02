import React from 'react';
import { t } from '../languageUtils';
import './StartRecording.css';

type StartRecordingProps = {
  onClick: () => void;
  language: string;
};

const StartRecording: React.FC<StartRecordingProps> = ({ onClick, language }) => {
  return (
    <button onClick={onClick} className="recording">
      {/* {t(language, 'StartRecording')}  */}
    </button>
  );
};

export default StartRecording;