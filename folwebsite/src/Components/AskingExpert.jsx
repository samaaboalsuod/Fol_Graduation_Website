import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../Supabase.jsx';
import MainBranch from './MainBranch';
import BubbleCard from './BubbleCard';
import './AskingExpert.css';

const AskingExpert = () => {
    const [services, setServices] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        // 1. Fetch data from your new table
       const fetchServices = async () => {
    const { data, error } = await supabase
        .from('Asking_Service')
        .select('*')
        .order('id', { ascending: true });
    
    if (error) {
        console.error("Supabase Error:", error.message);
    } else {
        console.log("Fetched Data:", data); // THIS WILL TELL US IF THE DATA IS ACTUALLY THERE
        setServices(data || []);
    }
};

        fetchServices();

        // 2. Observer to trigger the branch growth
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className={`expert-section ${isVisible ? 'is-visible' : ''}`}>
            <h3 className="expert-main-title">اسأل خبيرًا</h3>
            
            <div className="expert-container">
                {/* The Central Flowy Branch */}
                <MainBranch isVisible={isVisible} />

                {/* The Service Cards (Bubbles) */}
                <div className="bubbles-wrapper">
                    {services.map((service, index) => (
                        <BubbleCard 
                            key={service.id} 
                            data={service} 
                            index={index} 
                            show={isVisible}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AskingExpert;