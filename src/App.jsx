import React from 'react';
import Logo from './ui/Logo';
import Icon from './ui/Icon';
import './App.css';
import ResponseBox from './ui/ResponseBox';

function App() {
  const handleResponseSubmit = (response) => {
    console.log("User response:", response);
  };

  return (
    <div className="App">
      <div className="header">
        <div className="IconContainer">
        <Icon height={80} width={80}/>
        </div>
        <div className="LogoContainer">
        <Logo height={30} width={100}/>
        </div>
      </div>
      <ResponseBox onSubmit={handleResponseSubmit} />
    </div>
  );
}

export default App;
