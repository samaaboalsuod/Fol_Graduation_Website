import React from 'react';
import './CommunityPost.css';

const CommunityPost = ({ data, show, onClick }) => {
    // The "Bloom" Logic: If not shown, stay at center (50%). 
    // If shown, move to the fixed 'left' coordinate.
    const bloomStyle = {
        top: data.top,
        left: show ? data.left : '50%', 
        transform: show 
            ? 'translate(-50%, -50%) scale(1)' 
            : 'translate(-50%, -50%) scale(0)',
        opacity: show ? 1 : 0,
        filter: `blur(${data.blur})`,
        transition: `all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${data.delay}s`,
        width: data.size,
        pointerEvents: show ? 'auto' : 'none',
    };

    return (
        <div 
            className="post-card-wrapper" 
            style={bloomStyle} 
            onClick={onClick}
        >
            <div className="post-card-inner">
                {/* Header: User Info */}
                <div className="post-header">
                    <div className="user-avatar"></div>
                    <div className="user-meta">
                        <span className="user-name">محمد العلي</span>
                        <span className="post-time">منذ يومين</span>
                    </div>
                </div>

                {/* Content: Text & Image */}
                <p className="post-text">هل يمكن إنقاذ هذه المونستيرا؟ الأوراق بدأت تصفر 😟</p>
                <div className="post-image-container">
                    <img src={data.img} alt="Community Post" className="post-main-img" />
                </div>

                {/* Tags */}
                <div className="post-tags">
                    <span className="tag">#مونستيرا</span>
                    <span className="tag">#مساعدة</span>
                </div>

                {/* Interaction Bar */}
                <div className="post-footer">
                    <div className="footer-right">
                        <i className="icon-heart"></i> <span>18</span>
                        <i className="icon-comment"></i> <span>12</span>
                    </div>
                    <i className="icon-bookmark"></i>
                </div>
            </div>
        </div>
    );
};

export default CommunityPost;