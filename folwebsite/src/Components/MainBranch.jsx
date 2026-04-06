import React from 'react';
import './MainBranch.css';

const MainBranch = ({ isVisible }) => {
    return (
        <div className={`main-branch-container ${isVisible ? 'animate' : ''}`}>
            {/* Fixed width/height ratio to prevent squashing */}
<svg 
    viewBox="0 0 600 800" /* Reduced height coordinate */
    className="trunk-svg"
    preserveAspectRatio="xMidYMin meet" /* Pin to top center */
>
                <defs>
                    <linearGradient id="vineGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                        <stop offset="20%" stopColor="#eefacea7" stopOpacity="0.8" />
                        <stop offset="80%" stopColor="#f3fff1c7" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#02300b" stopOpacity="0" />
                    </linearGradient>

                    {/* Harsh Rough Filter */}
                    <filter id="pencilTexture">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
                    </filter>
                </defs>

                {/* Main S-Curve Trunk */}
                <path 
        className="branch-path trunk-line"
        /* If you want the branch shorter, change the first '1000' to something like '800' */
        d="M300,1000 C350,800 200,700 300,500 C400,300 250,150 300,0" 
        stroke="url(#vineGradient)"
        strokeWidth="8" 
        fill="none"
        filter="url(#pencilTexture)"
    />

                {/* Fixed Spirals - matching your design's curling logic */}
                <path 
        className="branch-path spiral-1" 
        d="M285,730 C350,730 380,680 340,660" 
        stroke="url(#vineGradient)" 
        strokeWidth="4" 
        fill="none" 
    />
                <path 
        className="branch-path spiral-2" 
        d="M320,430 C250,430 220,380 260,360" 
        stroke="url(#vineGradient)" 
        strokeWidth="4" 
        fill="none" 
    />
                <path 
        className="branch-path spiral-3" 
        d="M310,230 C380,230 400,180 360,160" 
        stroke="url(#vineGradient)" 
        strokeWidth="4" 
        fill="none" 
    />
            </svg>
        </div>
    );
};

export default MainBranch;