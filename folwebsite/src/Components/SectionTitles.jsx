import React from 'react';
import './SectionTitles.css';

const SectionTitles = ({ title }) => {
    return (
        <div className="sectionTitle">
            <h4>{title}</h4>
        </div>
    );
};

export default SectionTitles;
