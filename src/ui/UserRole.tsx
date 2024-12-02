import React, { useState } from 'react';
import { t } from '../languageUtils';

interface UserRoleProps {
  onUserRoleChange: (newRole: string) => void;
  language:string;
}

const UserRole: React.FC<UserRoleProps> = ({ onUserRoleChange, language}) => {
  const [role, setRole] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRole = event.target.value;
    setRole(newRole);  // Update local state
    onUserRoleChange(newRole);  // Pass updated role to the parent component
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
      />
    </div>
  );
};

export default UserRole;
