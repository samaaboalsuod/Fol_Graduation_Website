import React from 'react';
import './ServiceTypeCard.css';

const ServiceTypeCard = ({ title, icon, selected, onClick }) => {
    return (
        <div
            className={`typeCard ${selected ? 'selected' : ''}`}
            onClick={onClick}
        >
            <div className="cardInner">
                <div className="iconCont">
                    <img src={icon} alt={title} />
                </div>
                <h3 className="typeTitle">{title}</h3>
            </div>
        </div>
    );
};

export default ServiceTypeCard;
