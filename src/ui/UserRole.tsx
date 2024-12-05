import React, { useState, useEffect } from 'react';
import { t } from '../languageUtils';

interface UserRoleProps {
  onUserRoleChange: (newRole: string) => void;
  language: string;
  isResultWindow: boolean; // Prop to control whether the input should be disabled
  userRole: string; // Prop to pass the current role from the parent component
}

const UserRole: React.FC<UserRoleProps> = ({ onUserRoleChange, language, isResultWindow, userRole }) => {
  const [role, setRole] = useState(userRole); // Initialize state with the current role

  // This ensures that the role state is updated when the parent component changes the role
  useEffect(() => {
    setRole(userRole);
  }, [userRole]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRole = event.target.value;
    setRole(newRole); // Update local state
    onUserRoleChange(newRole); // Pass updated role to the parent component
  };

  return (
    <div className="input-container">
      <label htmlFor="user-role">{t(language, "userRole")}</label>
      <input
        id="user-role"
        type="text"
        placeholder={`e.g. ${t(language, "student")}`}
        value={role}
        onChange={handleChange}
        readOnly={isResultWindow} // Prevent changing input value when result window is active
      />
    </div>
  );
};

export default UserRole;
