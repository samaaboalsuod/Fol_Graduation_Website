import React from 'react';
import TimelineCard from '../Components/TimelineCard';
import { Trophy, Users, RocketLaunch, Lightbulb } from '@phosphor-icons/react';
import './AboutTimeline.css';

const AboutTimeline = () => {
    return (
        <section className="generalSec timelineSection">
            <h3 className="section-main-title timelineMainTitle">مسيرتنا بدأت بكم ومعكم تستمر</h3>
            
            <div className="timelineCardsContainer" dir="rtl">
                
                {/* 2025: Leftmost in RTL actually goes last in DOM, but let's keep it semantic. 
                    Wait, if dir="rtl", Flexbox row places first child on the Right.
                    The screenshot shows 2025 on Left, 2022 on Right.
                    So in DOM, 2022 should be FIRST child if dir="rtl", so it appears on the Right. */}
                    
                <div className="timelineCardWrapperStagger up">
                    <TimelineCard 
                        year="2022" 
                        IconComponent={Lightbulb} 
                        title="الفكرة" 
                        description="لاحظنا أن الناس يخافون من شراء النباتات، فقررنا تغيير ذلك" 
                    />
                </div>

                <div className="timelineCardWrapperStagger down">
                    <TimelineCard 
                        year="2023" 
                        IconComponent={RocketLaunch} 
                        title="الإطلاق" 
                        description="بدأنا بمتجر صغير و ٥٠ نوعاً من النباتات في القاهرة" 
                    />
                </div>

                <div className="timelineCardWrapperStagger up">
                    <TimelineCard 
                        year="2024" 
                        IconComponent={Users} 
                        title="المجتمع" 
                        description="أطلقنا برنامج الخبراء ووصلنا إلى ١٠٠٠ عميل سعيد" 
                    />
                </div>

                <div className="timelineCardWrapperStagger down">
                    <TimelineCard 
                        year="2025" 
                        IconComponent={Trophy} 
                        title="النمو" 
                        description="فتحنا ٣ فروع جديدة وأطلقنا تقنية AR للتجربة الافتراضية" 
                    />
                </div>

            </div>
        </section>
    );
};

export default AboutTimeline;
