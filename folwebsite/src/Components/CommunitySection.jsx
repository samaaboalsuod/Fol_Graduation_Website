import React, { useState, useEffect, useRef } from 'react';
import CommunityPost from './CommunityPost';
import InviteOverlay from './InviteOverlay';
import './CommunitySection.css';

const CommunitySection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [memberCount, setMemberCount] = useState(0);
    const [selectedPost, setSelectedPost] = useState(null);
    const sectionRef = useRef(null);

    // Fixed Random Layout Data
    const communityPosts = [
        { id: 1, img: "/posts/p1.jpg", size: "280px", top: "35%", left: "20%", blur: "4px", delay: 0.2 },
        { id: 2, img: "/posts/p2.jpg", size: "340px", top: "75%", left: "15%", blur: "0px", delay: 0.5 },
        { id: 3, img: "/posts/p3.jpg", size: "250px", top: "80%", left: "50%", blur: "3px", delay: 0.8 },
        { id: 4, img: "/posts/p4.jpg", size: "320px", top: "30%", left: "45%", blur: "0px", delay: 1.1 },
        { id: 5, img: "/posts/p5.jpg", size: "270px", top: "42%", left: "70%", blur: "2px", delay: 1.4 },
        { id: 6, img: "/posts/p6.jpg", size: "350px", top: "68%", left: "85%", blur: "0px", delay: 1.7 },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                startCounter();
            } else {
                setIsVisible(false); // Resets so it blooms every time
                setMemberCount(0);
            }
        }, { threshold: 0.3 });

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const startCounter = () => {
        let start = 0;
        const end = 5432;
        const duration = 2000; 
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setMemberCount(end);
                clearInterval(timer);
            } else {
                setMemberCount(Math.floor(start));
            }
        }, 16);
    };

    return (
        <section ref={sectionRef} className="community-section">
            <div className="community-header">
                <h3 className="community-title">انضم لمجتمع فل</h3>
                <div className="member-counter">
                    <span className="pulse-dot"></span>
                    انضم إلينا أكثر من <strong>{memberCount.toLocaleString()}+</strong> صديق للنباتات
                </div>
            </div>

            <div className="gallery-container">
                {/* The Central Vine would be here as a background SVG */}
                {communityPosts.map((post) => (
                    <CommunityPost 
                        key={post.id}
                        data={post}
                        show={isVisible}
                        onClick={() => setSelectedPost(post)}
                    />
                ))}
            </div>

            {selectedPost && (
                <InviteOverlay 
                    post={selectedPost} 
                    onClose={() => setSelectedPost(null)} 
                />
            )}
        </section>
    );
};

export default CommunitySection;