
import React from 'react';
import { t } from '../languageUtils';

type UserRoleProp = {
  language:string;
};

function UserRole({language}: UserRoleProp){
  return (
    <div className="input-container">
      <label htmlFor="user-role">{t(language, "userRole")}</label>
      <input id="user-role" type="text" placeholder={`e.g. ${t(language, "student")}`}/>
    </div>
  );
};

export default UserRole;
