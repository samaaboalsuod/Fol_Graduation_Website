import React from 'react';
import './CategoryCard.css';
import MainButton from './MainButton'; 

const CategoryCard = ({ data, onClose }) => {
    // Safety check: do not render if data is missing
    if (!data) return null;

    // Destructure Photos from JSONB column with empty fallback to prevent crashes
    const photos = data.Photos || { primary: '', secondary: '' }; 

    return (
        <div className="category-card-overlay active">
            <div className="glass-card">
                <button className="close-card" onClick={onClose}>✕</button>

                <div className="card-header">
                    {/* Fetches icon URL from the database 'Icon' column */}
                    <img src={data.Icon} alt="category icon" className="category-icon" />
                    <h2 className="card-title">{data.NameAR}</h2>
                </div>

                <p className="card-description">{data.DescriptionAR}</p>
                
                {/* Dynamic label: shows plant count OR 'Explore' for general categories */}
                <span className="plant-count">
                    {data.CategoryType === 'General' ? 'اكتشف المزيد' : `${data.Items_Numbers || 80}+ نبات`}
                </span>

                <div className="card-photos">
                    <div className="photo-wrapper primary">
                        {/* Accesses 'primary' key inside JSONB column */}
                        <img src={photos.primary} alt="main view" />
                    </div>
                    <div className="photo-wrapper secondary">
                        {/* Accesses 'secondary' key inside JSONB column */}
                        <img src={photos.secondary} alt="alternate view" />
                    </div>
                </div>

                <div className="card-action">
                    <MainButton text="استكشف الآن" />
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;