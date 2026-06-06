import React from 'react';
import './MainButton.css';

const MainButton = (props) => {
    return ( 
        <button className={`mainButton ${props.className || ''}`} onClick={props.onClick}> 
            {props.text} 
        </button>
     );
}
 
export default MainButton;