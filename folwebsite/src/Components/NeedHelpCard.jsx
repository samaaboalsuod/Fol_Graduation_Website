import React from 'react';
import './NeedHelpCard.css';

const NeedHelpCard = ({ text, img, alt }) => {
    return (
        <div className="needHelpCard">
            <h4 className="cardText">{text}</h4>
            <div className="imgCont">
                <img src={img} alt={alt} />
            </div>
        </div>
    );
};

export default NeedHelpCard;
