import React from 'react';
import './GlassyCTA.css';
import MainButton from './MainButton';
import SecondButton from './SecondButton';

const GlassyCTA = ({ title, mainBtnText, mainBtnAction, secondBtnText, secondBtnAction, subText }) => {
    return (
        <div className="glassyCtaBar">
            <div className="ctaContent">
                <p className="ctaTitle">{title}</p>
                
                <div className="ctaActions">
                    {mainBtnText && (
                        <div onClick={mainBtnAction}>
                            <MainButton text={mainBtnText} />
                        </div>
                    )}
                    
                    {secondBtnText && (
                        <div onClick={secondBtnAction}>
                            <SecondButton text={secondBtnText} />
                        </div>
                    )}
                </div>

                {subText && <p className="ctaSubText">{subText}</p>}
            </div>
        </div>
    );
};

export default GlassyCTA;
