import React, { useState } from "react";
import './SystemStarts.css';

const SystemStarts = () => {
  const [isSystemOn, setIsSystemOn] = useState(false);

  const handleToggle = () => {
    setIsSystemOn(!isSystemOn); // toggle system state on click
  };

  return (
    <div className="input-container">
      <label htmlFor="system-starts">SYSTEM STARTS?</label>
      <div
        id="system-starts" 
        onClick={handleToggle}
        className={`toggle ${isSystemOn ? "on" : "off"}`} // conditionally apply "on" or "off" class
      >
        <div className="toggle-knob"></div>
      </div>
    </div>
  );
};

export default SystemStarts;
