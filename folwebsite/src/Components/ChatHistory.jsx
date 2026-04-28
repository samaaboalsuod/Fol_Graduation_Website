import React, { useRef } from 'react';
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import SectionTitles from './SectionTitles';
import flower from '../Assets/Icons/flower.svg';
import angelArrow from '../Assets/Icons/angelArrow.svg';
import './ChatHistory.css';

const ChatHistory = ({ history }) => {
    const scrollRef = useRef(null);
    const cardWidth = 320;
    const trackPadding = 80;
    const totalWidth = history.length * cardWidth + trackPadding * 2;

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = cardWidth * 2;
            scrollRef.current.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const generatePath = () => {
        const height = 400;
        const midY = height / 2;
        const rx = cardWidth / 2;
        const ry = 160; // Perfect semi-circle radius
        
        let path = `M ${totalWidth - trackPadding},${midY}`;
        for (let i = 0; i < history.length; i++) {
            const endX = totalWidth - ((i + 1) * cardWidth + trackPadding);
            // SVG Arc: A rx ry x-axis-rotation large-arc-flag sweep-flag x y
            // sweep-flag 1 for top arc in RTL, 0 for bottom arc in RTL
            const sweepFlag = i % 2 === 0 ? 1 : 0;
            path += ` A ${rx},${ry} 0 0 ${sweepFlag} ${endX},${midY}`;
        }
        return path;
    };

    return (
        <section className="generalSec historySec">
            <div className="historyHeader">
                <SectionTitles title="تحقق من أسئلتك السابقة" />
                <div className="scrollControls">
                    <button onClick={() => scroll('right')} className="scrollBtn">
                        <CaretRight size={18} weight="bold" />
                    </button>
                    <button onClick={() => scroll('left')} className="scrollBtn">
                        <CaretLeft size={18} weight="bold" />
                    </button>
                </div>
            </div>
            
            <div className="historyScrollCont" ref={scrollRef}>
                <div className="historyTrack" style={{ width: `${totalWidth}px` }}>
                    <svg className="historyCurve" width={totalWidth} height="500" viewBox={`0 -50 ${totalWidth} 500`}>
                        <path 
                            d={generatePath()} 
                            fill="none" 
                            stroke="rgba(255, 255, 255, 0.15)" 
                            strokeWidth="1"
                        />
                        {history.map((_, i) => (
                            <image 
                                key={`flower-${i}`}
                                href={flower} 
                                x={totalWidth - (i * cardWidth + trackPadding + cardWidth/2 + 10)} 
                                // Swapped to fix "opposite" issue
                                y={i % 2 === 0 ? 350 : 30} 
                                width="20" 
                                height="20" 
                                className="flowerIcon"
                            />
                        ))}
                    </svg>

                    <div className="historyCards" style={{ paddingRight: `${trackPadding}px` }}>
                        {history.map((item, i) => (
                            <div key={item.id} className={`historyCard ${i % 2 === 0 ? 'topCard' : 'bottomCard'}`}>
                                <div className="cardHeader">
                                    <span className="cardDate">{item.date}</span>
                                    <div className="arrowCircle">
                                        <img src={angelArrow} alt="Go" />
                                    </div>
                                </div>
                                <div className="cardBody">
                                    <h3>{item.titlear}</h3>
                                    <p>{item.descar}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChatHistory;
