import React from 'react';
import './IconButton.css';

import arrow from '../Assets/Icons/angelArrow.svg'; 

const IconButton = ({ onClick, children }) => {
  return (
    <button className="custom-icon-button" onClick={onClick}>
      {children || <span className="arrow-icon"> <img src={arrow} alt="" /> </span>}
    </button>
  );
};

export default IconButton;