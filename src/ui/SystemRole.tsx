import React, { useState, useEffect } from 'react';
import { t } from '../languageUtils';

interface SystemRoleProps {
  onSystemRoleChange: (newRole: string) => void;
  language: string;
  isResultWindow: boolean;// prop that disable typing in the boxes
  systemRole: string; // prop to keep the inputed role in the box even after submitting
}

const SystemRole: React.FC<SystemRoleProps> = ({ onSystemRoleChange, language, isResultWindow, systemRole }) => {
  const [role, setRole] = useState(systemRole); // initialize state with the current role

  //ensures the role is updated when the input changes
  useEffect(() => {
    setRole(systemRole);
  }, [systemRole]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRole = event.target.value;
    setRole(newRole); // update local state
    onSystemRoleChange(newRole); // pass updated role to the parent component
  };

  return (
    <div className="input-container">
      <label htmlFor="system-role">{t(language, "systemRole")}</label>
      <input
        id="system-role"
        type="text"
        placeholder={`e.g. ${t(language, "teacher")}`}
        value={role}
        onChange={handleChange}
        readOnly={isResultWindow} // prevent changing input value when result window is active
      />
    </div>
  );
};

export default SystemRole;
