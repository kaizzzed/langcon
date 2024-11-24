import React from 'react';
import { t } from '../languageUtils';

type SystemRoleProp = {
  language:string;
};

function SystemRole({language}: SystemRoleProp){
  return (
    <div className="input-container">
      <label htmlFor="system-role">{t(language, "systemRole")}</label>
      <input id="system-role" type="text" placeholder={`e.g. ${t(language, "teacher")}`}/>
    </div>
  );
};

export default SystemRole;

