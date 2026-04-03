import React from 'react';
import './SecondButton.css';

const SecondButton = ({ text, onClick, className }) => {
  return (
    <button className={`second-button ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default SecondButton;