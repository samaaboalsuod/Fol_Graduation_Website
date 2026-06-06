import React from 'react';
import './InviteOverlay.css';
import MainButton from './MainButton';
import SecondButton from './SecondButton';

const InviteModal = ({ post, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="close-x" onClick={onClose}>&times;</button>
                
                <div className="modal-layout">
                    {/* The Clicked Photo - Scaled and Sharp */}
                    <div className="modal-image-preview">
                        <img src={post.img} alt="Community Post" />
                    </div>

                    {/* The Gentle Invitation */}
                    <div className="modal-text-side">
                        <h3 className="modal-headline">مجتمعنا ينمو بك!</h3>
                        <p className="modal-description">
                            نباتك ينتظر أن يجد منزلاً دافئًا. انضم إلى عائلتنا الكبيرة وشاركنا رحلة العناية بنباتاتك، حيث نتبادل الخبرات واللحظات الجميلة.
                        </p>
                        
                        <div className="modal-actions">
                            <MainButton 
                                text="ابدأ رحلتك الآن" 
                                onClick={() => console.log("Link to e-commerce")} 
                            />
                            <SecondButton 
                                text="سأستمر في الاستكشاف أولاً" 
                                onClick={onClose} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InviteModal;