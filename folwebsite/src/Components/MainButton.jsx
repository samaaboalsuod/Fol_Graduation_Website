import React, { Component } from 'react';
import './MainButton.css';
const MainButton = (props) => {
    return ( 
        <button className='mainButton'> {props.text} </button>
     );
}
 
export default MainButton;