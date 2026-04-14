import React from 'react';
import './CommunityPost.css';

const CommunityPost = ({ data, show, onClick }) => {
    // Mapping DB columns to the bloom logic
    const bloomStyle = {
        top: data.pos_top, //
        left: show ? data.pos_left : '50%', 
        transform: show 
            ? 'translate(-50%, -50%) scale(1)' 
            : 'translate(-50%, -50%) scale(0)',
        opacity: show ? 1 : 0,
        filter: `blur(${data.blur_amt})`,
        transition: `all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${data.delay_sec}s`,
        width: "300px", // Fixed standard width for consistent layout
        pointerEvents: show ? 'auto' : 'none',
    };

    return (
        <div className="post-card-wrapper" style={bloomStyle} onClick={onClick}>
            <div className="post-card-inner">
                {/* Header: Dynamic User Info */}
                <div className="post-header">
                    <img src={data.user_img} alt={data.user_name} className="user-avatar" />
                    <div className="user-meta">
                        <span className="user-name">{data.user_name}</span>
                        <span className="post-time">منذ يومين</span>
                    </div>
                </div>

                {/* Content: Dynamic Text & Image */}
                <p className="post-text">{data.content_ar}</p>
                <div className="post-image-container">
                    <img src={data.img_url} alt="Community Post" className="post-main-img" />
                </div>

                {/* Tags: Mapping through the DB array */}
                <div className="post-tags">
                    {data.tags && data.tags.map((tag, i) => (
                        <span key={i} className="tag">#{tag}</span>
                    ))}
                </div>

                {/* Interaction Bar: Dynamic Counts */}
                <div className="post-footer">
                    <div className="footer-right">
                        <i className="icon-heart"></i> <span>{data.likes_count}</span>
                        <i className="icon-comment"></i> <span>{data.comments_count}</span>
                    </div>
                    <i className="icon-bookmark"></i>
                </div>
            </div>
        </div>
    );
};

export default CommunityPost;