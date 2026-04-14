import React, { Component } from 'react';
import './PageTitle.css';


const PageTitle = (props) => {
    return ( 

        <div className='pageTitleCont'>

            <div className='subRow'>
                <img src={props.icon} alt="" />
                <h5>{props.subtitle}</h5>
            </div>
            <h2>{props.title}</h2>
            <h5>{props.discription}</h5>
        </div>
     );
}
 
export default PageTitle;