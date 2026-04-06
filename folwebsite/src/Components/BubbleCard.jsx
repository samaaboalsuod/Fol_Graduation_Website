import React from 'react';
import './BubbleCard.css';
// Assuming your MainButton is in the same Components folder
import MainButton from './MainButton'; 

const BubbleCard = ({ data, index, show }) => {
    // index 0 (1st) and 2 (3rd) will now be TRUE (Right Side)
    const isRight = index % 2 === 0; 
    
    const revealStyle = {
        transitionDelay: `${1 + index * 0.4}s`,
        top: `${12 + index * 26}%`, // Spacing them out vertically
        left: '50%',
        /* isRight (1st/3rd): Moves +80px to the right of the vine
           !isRight (2nd): Moves -420px to the left of the vine 
        */
        transform: isRight 
            ? 'translateX(80px)' 
            : 'translateX(-420px)',
        opacity: show ? 1 : 0,
        visibility: show ? 'visible' : 'hidden'
    };

    return (
        <div 
            className={`bubble-card-container ${isRight ? 'right-align' : 'left-align'}`}
            style={revealStyle}
        >
            <div className="bubble-glass-content">
                <img src={data.HIcon} alt="" className="bubble-icon" />
                <h3 className="bubble-title">{data.NameAR}</h3>
                <p className="bubble-description">{data.HDescriptionAR}</p>
                <MainButton text="احجز الآن" />
            </div>
        </div>
    );
};
export default BubbleCard;