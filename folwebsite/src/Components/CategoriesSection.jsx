import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../Supabase.jsx'; 
import './CategoriesSection.css';
import LeafGroup from './LeafGroup'; 
import CategoryCard from './CategoryCard'; 
import CategoryBg from '../Assets/Icons/cateBg.jpg';

const CategoriesSection = () => {
    const [categories, setCategories] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.4 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // 1. Precise fetching logic using IDs instead of ranges
    useEffect(() => {
        const fetchCategories = async () => {
            // Target IDs: 4 (Lighting), 5 (Care), 9 (Space), 10 (Safety), 11 (Goal)
            const targetIds = [4, 5, 9, 10, 11];

            const { data, error } = await supabase
                .from('Categories')
                .select('*')
                // Fetch specific IDs OR any row marked as 'General' (for View All Plants)
                .or(`id.in.(${targetIds.join(',')}),CategoryType.eq.General`)
                .order('id', { ascending: true }); 
            
            if (error) {
                console.error("Error fetching categories:", error);
            } else {
                setCategories(data);
            }
        };

        fetchCategories();
    }, []);

    return (
        <section className={`categories-wrapper ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
            <div className="category-bg-photo">
                <img src={CategoryBg} alt="background" />
            </div>

            <h3 className="section-main-title">كل ما تحتاجه هنا...</h3>

            <div className="categories-grid">
                {categories.map((cat, index) => (
                    <LeafGroup 
                        key={cat.id}
                        data={cat}
                        index={index} 
                        isActive={activeId === cat.id}
                        onToggle={() => setActiveId(activeId === cat.id ? null : cat.id)}
                    />
                ))}
            </div>

            {/* Render the card only when a leaf is clicked */}
            {activeId && (
                <CategoryCard 
                    data={categories.find(c => c.id === activeId)} 
                    onClose={() => setActiveId(null)} 
                />
            )}
        </section>
    );
};

export default CategoriesSection;