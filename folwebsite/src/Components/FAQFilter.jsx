import React from 'react';
import './FAQFilter.css';

const FAQFilter = ({ activeCategory, onCategoryChange }) => {
    const categories = [
        { id: 'all', name: 'الكل' },
        { id: 'watering', name: 'عن الري' },
        { id: 'lighting', name: 'عن الإضاءة والتموضع' },
        { id: 'pests', name: 'المشاكل والسمية' }
    ];

    return (
        <div className="faqFilter">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    className={`filterBtn ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => onCategoryChange(cat.id)}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
};

export default FAQFilter;
