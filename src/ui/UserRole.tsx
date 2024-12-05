import React, { useState, useEffect } from 'react';
import { t } from '../languageUtils';

interface UserRoleProps {
  onUserRoleChange: (newRole: string) => void;
  language: string;
  isResultWindow: boolean; // prop that disable typing in the boxes
  userRole: string; // prop to keep the inputed role in the box even after submitting
}

const UserRole: React.FC<UserRoleProps> = ({ onUserRoleChange, language, isResultWindow, userRole }) => {
  const [role, setRole] = useState(userRole); // initialize state with the current role

  //ensures the role is updated when the input changes
  useEffect(() => {
    setRole(userRole);
  }, [userRole]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRole = event.target.value;
    setRole(newRole); // update local state
    onUserRoleChange(newRole); //pass updated role to the parent component
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
        readOnly={isResultWindow} // prevent changing input value when result window is active
      />
    </div>
  );
};

export default UserRole;
