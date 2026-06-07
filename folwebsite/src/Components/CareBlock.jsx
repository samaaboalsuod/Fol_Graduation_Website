import React from 'react';
import './CareBlock.css';

const CareBlock = ({ title, description, icon }) => {
    return (
        <div className="careBlock">
            <div className="careBlockIcon">
                {icon}
            </div>
            <h4 className="careBlockTitle">{title}</h4>
            <p className="careBlockDesc">{description}</p>
        </div>
    );
};

export default CareBlock;
