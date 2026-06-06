import React, { useState } from 'react';
import './ShopFilterBar.css';
import MainButton from './MainButton';
import SecondButton from './SecondButton';
import { Faders } from '@phosphor-icons/react';

const ShopFilterBar = ({ onOpenFilters }) => {
    const [activeFilter, setActiveFilter] = useState('الكل');
    const filters = ['الكل', 'للمبتدئين', 'الهدايا'];

    return (
        <div className="shopFilterBar">
            <div className="shopFilterBar-filters">
                {filters.map(filter => (
                    filter === activeFilter ? (
                        <MainButton 
                            key={filter} 
                            text={filter} 
                            onClick={() => setActiveFilter(filter)} 
                        />
                    ) : (
                        <SecondButton 
                            key={filter} 
                            text={filter} 
                            onClick={() => setActiveFilter(filter)} 
                        />
                    )
                ))}
            </div>
            <div className="shopFilterBar-categories">
                <SecondButton 
                    onClick={onOpenFilters}
                    text={
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Faders size={20} />
                            تصنيفات
                        </span>
                    } 
                />
            </div>
        </div>
    );
};

export default ShopFilterBar;
