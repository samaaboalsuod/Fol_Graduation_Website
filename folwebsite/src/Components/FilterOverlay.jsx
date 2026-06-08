import React, { useState } from 'react';
import './FilterOverlay.css';
import { X, CaretDown, CaretUp } from '@phosphor-icons/react';
import MainButton from './MainButton';

const FilterOverlay = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('plants');

    // Plant categories extracted from DB schema
    const plantCategories = [
        { id: 'category', name: 'الفئة', options: ['عشبي', 'صباريات', 'نباتات داخلية', 'نباتات منزلية', 'نباتات زينة', 'شجيرات'] },
        { id: 'care', name: 'العناية', options: ['سهل', 'متوسط', 'صعب'] },
        { id: 'light', name: 'الإضاءة', options: ['مباشر', 'غير مباشر'] },
        { id: 'water', name: 'الري', options: ['أسبوعي', 'كل أسبوعين'] },
        { id: 'features', name: 'ميزات إضافية', options: ['نبات نادر', 'آمن للحيوانات', 'منقي للهواء'] },
    ];

    const accessoriesCategories = [
        { id: 'soil', name: 'تربة', options: ['بتموس', 'بيرلايت', 'تربة زراعية', 'رمل', 'سماد عضوي'] },
        { id: 'tools', name: 'أدوات', options: ['مقصات تقليم', 'قفازات', 'مرشات مياه', 'أوعية سقي', 'مجارف'] },
        { id: 'decor', name: 'إكسسوارات', options: ['أحجار زينة', 'أرفف خشبية', 'أحواض سيراميك', 'سلال خوص'] },
    ];

    const currentCategories = activeTab === 'plants' ? plantCategories : accessoriesCategories;

    return (
        <div className="filter-overlay" onClick={onClose}>
            <div className="filter-content" onClick={e => e.stopPropagation()}>
                <div className="filter-header">
                    <h2>تصنيفات الفرز</h2>
                    <button className="filter-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="filter-tabs-top">
                    <button 
                        className={`filter-tab-btn ${activeTab === 'plants' ? 'active' : ''}`}
                        onClick={() => setActiveTab('plants')}
                    >
                        نباتات
                    </button>
                    <button 
                        className={`filter-tab-btn ${activeTab === 'accessories' ? 'active' : ''}`}
                        onClick={() => setActiveTab('accessories')}
                    >
                        مكملات
                    </button>
                </div>

                <div className="filter-body">
                    <div className="filter-main">
                        {currentCategories.map((cat, idx) => (
                            <div key={cat.id} id={`section-${cat.id}`} className="filter-section">
                                <h3 className="filter-section-title">{cat.name}</h3>
                                <div className="filter-grid">
                                    {cat.options.map(opt => (
                                        <label key={opt} className="filter-checkbox-label">
                                            <input type="checkbox" className="filter-checkbox" />
                                            {opt}
                                        </label>
                                    ))}
                                </div>
                                {idx < currentCategories.length - 1 && <div className="filter-divider"></div>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="filter-footer">
                    <MainButton text="تطبيق" onClick={onClose} />
                </div>
            </div>
        </div>
    );
};

export default FilterOverlay;
