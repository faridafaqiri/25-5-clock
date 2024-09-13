import React from 'react';
import Timer from './Timer';
import Controls from './Controls';

function Display() {
  return (
    <div className="display-container">
      <h1 className="title">25 + 5 Clock</h1>
      <Timer />
      <Controls />
    </div>
  );
}

export default Display;