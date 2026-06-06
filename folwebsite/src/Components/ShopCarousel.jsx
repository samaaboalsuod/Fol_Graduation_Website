import React, { useState } from 'react';
import './ShopCarousel.css';
import ShopCard from './ShopCard';
import { CaretRight, CaretLeft } from '@phosphor-icons/react';

const ShopCarousel = ({ plants }) => {
    // We expect exactly 3 plants for this specific design
    const [activeIndex, setActiveIndex] = useState(1); // Start with middle item

    if (!plants || plants.length !== 3) return null; 

    // Because the wrapper is LTR internally, "left" means going to the previous index
    const goLeft = () => {
        setActiveIndex((prev) => (prev - 1 + 3) % 3);
    };

    const goRight = () => {
        setActiveIndex((prev) => (prev + 1) % 3);
    };

    return (
        <div className="shopCarouselWrapper">
            <button className="shopCarouselBtn left-btn" onClick={goLeft}>
                <CaretLeft size={24} color="#FAFAEA" />
            </button>
            
            <div className="shopCarouselTrack">
                {plants.map((plant, index) => {
                    let positionClass = '';
                    if (index === activeIndex) {
                        positionClass = 'center';
                    } else if (index === (activeIndex - 1 + 3) % 3) {
                        positionClass = 'left'; 
                    } else {
                        positionClass = 'right'; 
                    }

                    return (
                        <div key={plant.id} className={`shopCarouselSlide ${positionClass}`}>
                            <ShopCard plant={plant} />
                        </div>
                    );
                })}
            </div>

            <button className="shopCarouselBtn right-btn" onClick={goRight}>
                <CaretRight size={24} color="#FAFAEA" />
            </button>
        </div>
    );
};

export default ShopCarousel;
