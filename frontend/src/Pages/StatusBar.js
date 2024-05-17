import React, { useState } from 'react';

function StatusBar({ progress, onProgressChange }) {
  // Ensure that the input value is initialized with 0 if progress is undefined
  const [value, setValue] = useState(progress || 0);

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value, 10); // Parse the value as an integer
    setValue(newValue);
    onProgressChange(newValue);
  };

  return (
    <div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
      />
      <div>Progress: {value}%</div>
    </div>
  );
}

export default StatusBar;