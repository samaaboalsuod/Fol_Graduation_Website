import React from 'react';
import './ValuesCard.css';

const ValuesCard = ({ title, description, IconComponent, flipped }) => {
    return (
        <div className={`valuesCard ${flipped ? 'flipped' : ''}`}>
            <div className="valuesCardIcon">
                <IconComponent size="3.5rem" color="white" weight="regular" />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default ValuesCard;
