import React, { useState } from 'react';
import './FilterOverlay.css';
import { X, CaretDown, CaretUp } from '@phosphor-icons/react';
import MainButton from './MainButton';

const FilterOverlay = ({ onClose }) => {
    const [openTabs, setOpenTabs] = useState({ plants: true, accessories: true });

    const toggleTab = (tab) => {
        setOpenTabs(prev => ({ ...prev, [tab]: !prev[tab] }));
    };

    // Placeholder data - replace with actual DB values when provided
    const plantCategories = [
        { id: 'light', name: 'الإضاءة', options: ['خافتة', 'متوسطة', 'ساطعة', 'مباشرة', 'غير مباشرة'] },
        { id: 'care', name: 'العناية', options: ['سهلة جداً', 'سهلة', 'متوسطة', 'للمحترفين'] },
        { id: 'space', name: 'المساحة', options: ['صغيرة', 'متوسطة', 'كبيرة', 'مكتبية'] },
        { id: 'safety', name: 'الأمان', options: ['آمنة للحيوانات الأليفة', 'آمنة للأطفال', 'سامة'] },
        { id: 'goal', name: 'الهدف', options: ['تنقية الهواء', 'زينة', 'رائحة عطرة', 'هدايا'] },
    ];

    const accessoriesCategories = [
        { id: 'soil', name: 'تربة', options: ['بتموس', 'بيرلايت', 'تربة زراعية', 'رمل', 'سماد عضوي'] },
        { id: 'tools', name: 'أدوات', options: ['مقصات تقليم', 'قفازات', 'مرشات مياه', 'أوعية سقي', 'مجارف'] },
        { id: 'decor', name: 'إكسسوارات', options: ['أحجار زينة', 'أرفف خشبية', 'أحواض سيراميك', 'سلال خوص'] },
    ];

    return (
        <div className="filter-overlay" onClick={onClose}>
            <div className="filter-content" onClick={e => e.stopPropagation()}>
                <div className="filter-header">
                    <h2>تصنيفات الفرز</h2>
                    <button className="filter-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="filter-body">
                    {/* Right Sidebar */}
                    <div className="filter-sidebar">
                        <div className="filter-accordion-item">
                            <div className="filter-accordion-header" onClick={() => toggleTab('plants')}>
                                <span>نباتات</span>
                                {openTabs.plants ? <CaretUp size={16} /> : <CaretDown size={16} />}
                            </div>
                            {openTabs.plants && (
                                <div className="filter-accordion-content">
                                    {plantCategories.map(cat => (
                                        <a href={`#section-${cat.id}`} key={cat.id} className="filter-category-link">
                                            {cat.name}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="filter-accordion-item">
                            <div className="filter-accordion-header" onClick={() => toggleTab('accessories')}>
                                <span>مكملات</span>
                                {openTabs.accessories ? <CaretUp size={16} /> : <CaretDown size={16} />}
                            </div>
                            {openTabs.accessories && (
                                <div className="filter-accordion-content">
                                    {accessoriesCategories.map(cat => (
                                        <a href={`#section-${cat.id}`} key={cat.id} className="filter-category-link">
                                            {cat.name}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main Scrolling Body */}
                    <div className="filter-main">
                        {plantCategories.map((cat, idx) => (
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
                                {idx < plantCategories.length - 1 && <div className="filter-divider"></div>}
                                {idx === plantCategories.length - 1 && <div className="filter-divider"></div>}
                            </div>
                        ))}

                        {accessoriesCategories.map((cat, idx) => (
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
                                {idx < accessoriesCategories.length - 1 && <div className="filter-divider"></div>}
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
