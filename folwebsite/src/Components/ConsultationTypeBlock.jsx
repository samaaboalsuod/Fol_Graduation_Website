import React from 'react';
import { Flower } from '@phosphor-icons/react';
import './ConsultationTypeBlock.css';

const ConsultationTypeBlock = ({ title, points, img, reverse }) => {
    const pointsList = points ? points.split(/[,\n]/).filter(p => p.trim() !== '') : [];

    return (
        <div className={`consultationTypeBlockContainer ${reverse ? 'reverse' : ''}`}>
            {/* 
              Order in RTL: 
              First element in DOM -> Far Right
              Last element in DOM -> Far Left
              To get [Image (Left) | Points (Middle) | Title (Right)]:
            */}
            
            <div className="verticalTitleSection">
                <h3 className="outlinedTitle">{title}</h3>
            </div>

            <div className="pointsSection">
                <ul className="pointsList">
                    {pointsList.map((point, index) => (
                        <li key={index} className="pointItem">
                            <Flower className="pointIcon" size={24} weight="fill" />
                            <span className="pointText">{point.trim()}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="imagePart">
                <img src={img} alt={title} />
                <div className="imgOverlay"></div>
            </div>
        </div>
    );
};

export default ConsultationTypeBlock;
