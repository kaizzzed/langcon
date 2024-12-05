import React, { useState, useEffect } from 'react';
import { t } from '../languageUtils';

interface SystemRoleProps {
  onSystemRoleChange: (newRole: string) => void;
  language: string;
  isResultWindow: boolean; // Prop to control whether the input should be disabled
  systemRole: string; // Prop to pass the current role from the parent component
}

const SystemRole: React.FC<SystemRoleProps> = ({ onSystemRoleChange, language, isResultWindow, systemRole }) => {
  const [role, setRole] = useState(systemRole); // Initialize state with the current role

  // This ensures that the role state is updated when the parent component changes the role
  useEffect(() => {
    setRole(systemRole);
  }, [systemRole]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRole = event.target.value;
    setRole(newRole); // Update local state
    onSystemRoleChange(newRole); // Pass updated role to the parent component
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
        readOnly={isResultWindow} // Prevent changing input value when result window is active
      />
    </div>
  );
};

export default SystemRole;
