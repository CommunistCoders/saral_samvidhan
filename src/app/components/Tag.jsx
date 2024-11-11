import React from 'react';

const Tag = ({ text, color = 'bg-blue-500', textColor = 'text-white' }) => {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full ${color} ${textColor} text-sm font-semibold`}
    >
      {text}
    </span>
  );
};

export default Tag;
