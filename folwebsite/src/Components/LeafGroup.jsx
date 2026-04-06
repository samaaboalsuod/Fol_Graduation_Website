import React from 'react';
import './LeafGroup.css';
import leaf1 from '../Assets/Icons/Leaf1.png'; 
import leaf2 from '../Assets/Icons/Leaf2.png';
import leaf3 from '../Assets/Icons/Leaf3.png';
import { ReactComponent as FlowerSVG } from '../Assets/Icons/flower.svg';

const LeafGroup = ({ data, index, isActive, onToggle }) => {
    // This style handles the "One-by-One" reveal timing
    const revealStyle = {
        transitionDelay: `${index * 0.15}s` 
    };

    return (
        <div 
            className={`leaf-group-container ${isActive ? 'is-exploded' : ''}`} 
            style={revealStyle}
        >
            <div className="leaf-cluster">
                {/* The Flower stays hidden in the middle */}
                <div className="flower-center">
                    <FlowerSVG />
                </div>

                                {/* The Pulse Trigger - Only shows when not exploded */}
                {!isActive && (
                    <div className="pulse-trigger" onClick={onToggle}>
                        <div className="pulse-circle"></div>
                    </div>
                )}

                {/* The 3 Leaves */}
                <img src={leaf1} className="leaf leaf-1" alt="leaf" />
                <img src={leaf2} className="leaf leaf-2" alt="leaf" />
                <img src={leaf3} className="leaf leaf-3" alt="leaf" />


                
                {/* The X to close the explosion specifically */}
                {isActive && (
                    <div className="close-explosion" onClick={onToggle}>✕</div>
                )}
            </div>

            <h2 className="category-title">{data.NameAR}</h2>
        </div>
    );
};

export default LeafGroup;