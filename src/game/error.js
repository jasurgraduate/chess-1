// src/game/Error.js
import React from 'react';

const Error = ({ message }) => {
  if (!message) return null;

  return (
    <div className="error-message">
      {message}
    </div>
  );
};

export default Error;
