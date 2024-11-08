import React from 'react';
import Logo from './ui/Logo';  // Your existing Logo component
import Icon from './ui/Icon';  // The new Icon component

function App() {
  return (
    <div className="App">
      <div className="IconContainer">
        <Icon height={50} width={50} />
      </div>
      <div className="LogoContainer">
        <Logo height={100} width={100} />  {/* Your Logo component */}
      </div>
      <h1>Welcome to LangCon</h1>
    </div>
  );
}

export default App;