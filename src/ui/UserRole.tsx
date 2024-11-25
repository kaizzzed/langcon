import React, { useState } from 'react';

interface UserRoleProps {
  onUserRoleChange: (newRole: string) => void;
}

const UserRole: React.FC<UserRoleProps> = ({ onUserRoleChange }) => {
  const [role, setRole] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRole = event.target.value;
    setRole(newRole);  // Update local state
    onUserRoleChange(newRole);  // Pass updated role to the parent component
  };
  return (
    <div className="input-container">
      <label htmlFor="user-role">USER ROLE</label>
      <input
        id="user-role"
        type="text"
        placeholder="Enter user role"
        value={role}
        onChange={handleChange}
      />
    </div>
  );
};

export default UserRole;
