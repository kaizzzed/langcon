import React from 'react';
import Logo from './ui/Logo';  
import Icon from './ui/Icon';  
import './App.css';

function App() {
  return (
    <div className = "App">
      <div className="header">
        <div className="IconContainer">
          <Icon height={50} width={50} />
        </div>
        <div className="LogoContainer">
          <Logo height={100} width={100} />  { }
        </div>
      </div>
      <h1>Welcome to LangCon</h1>
    </div>
  );
}

export default App;