import React from 'react';
import './BeginButton.css'; // style for the button

type BeginButtonProps = {
  onClick: () => void;
};

const BeginButton: React.FC<BeginButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="begin-button">
      BEGIN
    </button>
  );
};

export default BeginButton;
