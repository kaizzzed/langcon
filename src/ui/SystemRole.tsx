import React, { useState } from 'react';
import { t } from '../languageUtils';
// Define the prop type to expect a callback function to handle role change
interface SystemRoleProps {
  onSystemRoleChange: (role: string) => void;
  language:string;
}

const SystemRole: React.FC<SystemRoleProps> = ({ onSystemRoleChange, language }) => {
  const [role, setRole] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRole = event.target.value;
    setRole(newRole); // Update local state with user input
    onSystemRoleChange(newRole); // Pass updated role to the parent component
  };

  return (
    <div className="input-container">
      <label htmlFor="system-role">S{t(language, "systemRole")}</label>
      <input
        id="system-role"
        type="text"
        value={role}
        onChange={handleInputChange}
        placeholder={`e.g. ${t(language, "teacher")}`}
      />
    </div>
  );
};

export default SystemRole;