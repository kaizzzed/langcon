import React from 'react';
import './BeginButton.css'; // style for the button
import { t } from '../languageUtils';

type BeginButtonProps = {
  onClick: () => void;
  text: string;
};

const BeginButton: React.FC<BeginButtonProps> = ({ onClick, text}) => {
  return (
    <button onClick={onClick} className="begin-button">
      {t(text, "begin")}
    </button>
  );
};

export default BeginButton;