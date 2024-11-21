import React from 'react';

const NumLines = () => {
  return (
    <div className="input-container">
      <label htmlFor="num-lines">Num of Lines</label>
      <input id="num-lines" type="number" placeholder="e.g. 5" />
    </div>
  );
};

export default NumLines;
