import React from 'react';
import './OnboardingCard.css';

const OnboardingCard = ({ icon, label, desc, isSelected, onClick }) => {
    return (
        <div 
            className={`onboardingCard ${isSelected ? 'selected' : ''}`} 
            onClick={onClick}
        >
            <div className="choiceIndicator"></div>
            
            <div className="cardContent">
                <div className="onboardingIcon">
                    {icon}
                </div>
                <h3 className="cardLabel">{label}</h3>
                {desc && <p className="cardDesc">{desc}</p>}
            </div>
        </div>
    );
};

export default OnboardingCard;
