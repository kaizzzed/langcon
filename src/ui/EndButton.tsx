import React from 'react';
import './EndButton.css'; // style for the button
import { t } from '../languageUtils';

type EndButtonProps = {
  onClick: () => void;
  text: string;
};

const EndButton: React.FC<EndButtonProps> = ({ onClick, text}) => {
  return (
    <button onClick={onClick} className="end-button">
      {t(text, "end")}
    </button>
  );
};

export default EndButton;