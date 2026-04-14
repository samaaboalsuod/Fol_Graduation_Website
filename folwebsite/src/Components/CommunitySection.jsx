import React, { useState, useEffect, useRef } from 'react';
import CommunityPost from './CommunityPost';
import InviteOverlay from './InviteOverlay';
import { supabase } from '../Supabase.jsx'; //
import './CommunitySection.css';

const CommunitySection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [memberCount, setMemberCount] = useState(0);
    const [selectedPost, setSelectedPost] = useState(null);
    const [communityPosts, setCommunityPosts] = useState([]); // Dynamic state
    const sectionRef = useRef(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('Community_Posts')
                .select('*')
                .order('id', { ascending: true }); //

            if (error) console.error("Error fetching posts:", error.message);
            else setCommunityPosts(data || []);
        };

        fetchPosts();

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                startCounter();
            } else {
                setIsVisible(false);
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