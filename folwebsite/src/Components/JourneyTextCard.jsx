import React from 'react';
import { motion } from 'framer-motion';
import './JourneyTextCard.css';

const JourneyTextCard = ({ title, description, style, className = "" }) => {
    return (
        <motion.div 
            className={`journeyCard ${className}`}
            style={style}
            dir="rtl"
        >
            <h2>{title}</h2>
            <p>{description}</p>
        </motion.div>
    );
};

export default JourneyTextCard;
