import React from 'react';
import './CategoryCard.css';
import MainButton from './MainButton'; // Reusing your existing button

const CategoryCard = ({ data, onClose }) => {
    if (!data) return null;

    // Destructure your JSONB photos
    // Assuming your JSON structure is: { "primary": "url", "secondary": "url" }
    const photos = data.Photos || {}; 

    return (
        <div className="category-card-overlay active">
            <div className="glass-card">
                {/* Close Button */}
                <button className="close-card" onClick={onClose}>✕</button>

                {/* Content Top: Icon & Title */}
                <div className="card-header">
                    <img src={data.Icon} alt="icon" className="category-icon" />
                    <h2 className="card-title">{data.NameAR}</h2>
                </div>

                {/* Description & Count */}
                <p className="card-description">{data.DescriptionAR}</p>
                <span className="plant-count">{data.Items_Numbers}+ نبات</span>

                {/* Photo Section: Using your JSONB paths */}
                <div className="card-photos">
                    <div className="photo-wrapper primary">
                        <img src={photos.primary} alt="primary" />
                    </div>
                    <div className="photo-wrapper secondary">
                        <img src={photos.secondary} alt="secondary" />
                    </div>
                </div>

                {/* Main Action Button */}
                <div className="card-action">
                    <MainButton text="استكشف الآن" />
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;