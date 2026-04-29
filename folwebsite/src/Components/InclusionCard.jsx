import React from 'react';
import './InclusionCard.css';

const InclusionCard = ({ icon: Icon, text }) => {
    return (
        <div className="inclusionCard">
            <div className="inclusionIconCont">
                <Icon size={32} weight="duotone" />
            </div>
            <p className="inclusionText">{text}</p>
        </div>
    );
};

export default InclusionCard;
