import React from 'react';
import { BookmarkSimple } from '@phosphor-icons/react';
import './SavedPlantCard.css';

const SavedPlantCard = ({ plant, onRemove }) => {
    return (
        <div className="savedPlantCard" dir="rtl">
            <div className="savedPlantModelContainer">
                {plant['3DModel'] ? (
                    <model-viewer
                        src={plant['3DModel']}
                        auto-rotate
                        camera-controls
                        disable-zoom
                        shadow-intensity="1"
                        exposure="0.8"
                        style={{ width: '100%', height: '100%', outline: 'none' }}
                    ></model-viewer>
                ) : (
                    <img 
                        src={plant.Cover_Photo || plant.Hero_Showcase_Photo} 
                        alt={plant.NameAR} 
                        className="savedPlantFallbackImg"
                    />
                )}
            </div>

            <div className="savedPlantInfoBox">
                <div className="savedPlantCategory">الفئة: {plant.Category}</div>
                <div className="savedPlantTitleRow">
                    <h3 className="savedPlantName">{plant.NameAR}</h3>
                    <div className="savedPlantPrice">{plant.Price} جنيه</div>
                </div>
                {plant.Common_Names && (
                    <div className="savedPlantCommonNames">الاسم الشائع: {plant.Common_Names}</div>
                )}
                
                <div className="savedPlantActions">
                    <button className="savedPlantCartBtn">أضف للسلة</button>
                    <button className="savedPlantRemoveBtn" onClick={() => onRemove(plant.id)} title="إزالة من المحفوظات">
                        <BookmarkSimple size="1.5rem" weight="fill" color="#fff" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SavedPlantCard;
