import React, { Component } from 'react';
import './ActionCard.css';

import { supabase } from '../Supabase.jsx'; 
import SecondButton from './SecondButton.jsx';


const ActionCard = (props) => {
    return ( 
        <div id={props.id} className={`actionCardCont ${props.isHighlighted ? 'highlighted-border' : ''}`}>

            <div className='topRow'>

                <div className='iconCont'>
                    <img src={props.icon} alt={props.iconAlt} />
                </div>

                <div className='titleCol'>
                    <p>{props.subtitle}</p>
                    <h5> {props.title}</h5>
                </div>
            </div>

            <h2 className='low'>{props.discription}</h2>

            <div className='featureCol'>
                {props.features && props.features.map((feature, index) => (
                   <h2 key={index}>— {feature}</h2>
                ))}
            </div>

            <SecondButton text={props.btnText} onClick={props.onClick} />

        </div>
     );
}
 
export default ActionCard;