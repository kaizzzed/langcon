import React from 'react';
import './BeginButton.css'; // style for the button
import { t } from '../languageUtils';

type BeginButtonProps = {
  onClick: () => void;
  language: string;
};

const BeginButton: React.FC<BeginButtonProps> = ({ onClick, language}) => {
  return (
    <button onClick={onClick} className="begin-button">
      {t(language, "begin")}
    </button>
  );
};

export default BeginButton;
