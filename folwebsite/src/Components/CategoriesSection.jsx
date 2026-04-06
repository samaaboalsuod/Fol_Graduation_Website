import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../Supabase.jsx'; // Adjust path to your client
import './CategoriesSection.css';

import LeafGroup from './LeafGroup'; // We will create this next
import CategoryCard from './CategoryCard'; // We will create this after

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
                    // Once it's visible, we can stop observing
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.4 } // Trigger when 20% of the section is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // 1. Fetching from Supabase
useEffect(() => {
    const fetchCategories = async () => {
        const { data, error } = await supabase
            .from('Categories')
            .select('*')
            // .range(start, end) -> start is inclusive, end is inclusive
            // Index 3 is Row 4 | Index 8 is Row 9
            .range(3, 8) 
            .order('id', { ascending: true }); // Ensures they stay in the correct visual order
        
        if (error) {
            console.error("Error fetching categories:", error);
        } else {
            setCategories(data);
        }
    };

    fetchCategories();
}, []);

    // 2. Intersection Observer for the "One-by-One" reveal
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.2 } // Triggers when 20% of section is visible
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className={`categories-wrapper ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
            {/* Background Placeholder - Commented as requested */}
            <div className="category-bg-photo">
                <img src={CategoryBg} alt="background" />
            </div>

            <h3 className="section-main-title">كل ما تحتاجه هنا...</h3>

            <div className="categories-grid">
                {categories.map((cat, index) => (
                    <LeafGroup 
                        key={cat.id}
                        data={cat}
                        index={index} // Used for the staggered reveal delay
                        isActive={activeId === cat.id}
                        onToggle={() => setActiveId(activeId === cat.id ? null : cat.id)}
                    />
                ))}
            </div>

            {/* The Offset Glass Card */}
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