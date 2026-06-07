import React from 'react';
import './TimelineCard.css';

const TimelineCard = ({ year, IconComponent, title, description }) => {
    return (
        <div className="timelineCardWrapper">
            <h2 className="timelineYearGlass">{year}</h2>
            <div className="timelineCard">
                <div className="timelineIconBox">
                    <IconComponent size="3rem" color="white" weight="regular" />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default TimelineCard;
