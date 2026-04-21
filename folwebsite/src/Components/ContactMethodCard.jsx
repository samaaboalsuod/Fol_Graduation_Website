import React from 'react';
import './ContactMethodCard.css';
import { FacebookLogo, TelegramLogo, WhatsappLogo, EnvelopeSimple } from '@phosphor-icons/react';
import MainButton from './MainButton';

const ContactMethodCard = ({ platform, value, responseTime, buttonText, link, direction }) => {
    
    const getIcon = () => {
        switch (platform.toLowerCase()) {
            case 'facebook':
                return <FacebookLogo size={48} weight="thin" />;
            case 'telegram':
                return <TelegramLogo size={48} weight="thin" />;
            case 'whatsapp':
                return <WhatsappLogo size={48} weight="thin" />;
            case 'email':
                return <EnvelopeSimple size={48} weight="thin" />;
            default:
                return null;
        }
    };

    return (
        <div className={`contactMethodCard ${direction === 'left' ? 'sharp-left' : 'sharp-right'}`}>
            <div className="contactIconCont">
                {getIcon()}
            </div>
            <div className="cardInfo">
                <h3>{value}</h3>
                <p>{responseTime}</p>
            </div>
            <a href={link} target="_blank" rel="noopener noreferrer">
                <MainButton text={buttonText} />
            </a>
        </div>
    );
};

export default ContactMethodCard;
