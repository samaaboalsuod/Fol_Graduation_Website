import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../Supabase';
import Nav from '../Components/Nav';
import PageTitle from '../Components/PageTitle';
import PlantMatchCard from '../Components/PlantMatchCard';
import Footer from '../Components/Footer';
import GlassyCTA from '../Components/GlassyCTA';
import { Sun, House, Clock, GraduationCap } from "@phosphor-icons/react";

import heroBg from '../Assets/Icons/heroBg.png';
import './Suggestions.css';

const Suggestions = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [titleData, setTitleData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const suggestions = location.state?.suggestions || [];
    const answers = location.state?.userAnswers || {};

    // For Considerations mapping
    const getLightingText = (val) => val === 'high_direct' ? 'ضوء مباشر' : 'ضوء غير مباشر';
    const getPlacementText = (val) => {
        if (val === 'small_surface') return 'سطح صغير';
        if (val === 'floor_large') return 'مساحة أرضية';
        if (val === 'outdoor_balcony') return 'مساحة خارجية';
        return 'غير محدد';
    };
    const getMaintenanceText = (val) => {
        if (val === 'low_maintenance') return 'صيانة قليلة';
        if (val === 'medium_maintenance') return 'صيانة متوسطة';
        if (val === 'high_maintenance') return 'عناية مستمرة';
        return 'غير محدد';
    };
    const getExperienceText = (val) => {
        if (val === 'beginner') return 'مبتدئ';
        if (val === 'intermediate') return 'متوسط';
        if (val === 'advanced') return 'خبير';
        return 'غير محدد';
    };

    useEffect(() => {
        if (!location.state?.suggestions) {
            // Redirect back to questions if accessed without state
            navigate('/Questions');
            return;
        }

        const fetchTitle = async () => {
            const { data } = await supabase
                .from('PageTitle')
                .select('*')
                .eq('id', 25)
                .single();
            if (data) setTitleData(data);
            setIsLoading(false);
        };

        fetchTitle();
    }, [location.state, navigate]);

    if (isLoading) {
        return (
            <div className="loadingScreen">
                <div className="spinner"></div>
                <p>جاري تحليل إجاباتك وإيجاد أفضل النباتات لك...</p>
            </div>
        );
    }

    const perfectMatch = suggestions[0];
    const goodMatches = suggestions.slice(1, 3);

    return (
        <div className="suggestionsPage">
            <div className="navOverlay">
                <Nav hideWave={true} />
            </div>

            <div className="heroBgLayer">
                <img src={heroBg} alt="Background" className="bgImg" />
                <div className="greenOverlay"></div>
                <div className="blurLayer"></div>
            </div>

            <div className="pageContent">
                <div className="heroTitleCont">
                    {titleData && (
                        <PageTitle 
                            title={titleData.Title} 
                            subtitle={titleData.SubTitle}
                            discription={titleData.Description} 
                        />
                    )}
                </div>

                {/* Considerations Section */}
                <div className="considerationsBox">
                    <h3 className="consBoxTitle">ما تم أخذه في الاعتبار</h3>
                    <div className="consItemsRow">
                        <div className="consItem">
                            <Sun size={32} weight="light" className="consIcon" />
                            <span className="consLabel">الإضاءة</span>
                            <span className="consValue">{getLightingText(answers.lighting)}</span>
                        </div>
                        <div className="consItem">
                            <House size={32} weight="light" className="consIcon" />
                            <span className="consLabel">المساحة</span>
                            <span className="consValue">{getPlacementText(answers.placement)}</span>
                        </div>
                        <div className="consItem">
                            <Clock size={32} weight="light" className="consIcon" />
                            <span className="consLabel">الوقت المتاح</span>
                            <span className="consValue">{getMaintenanceText(answers.maintenance)}</span>
                        </div>
                        <div className="consItem">
                            <GraduationCap size={32} weight="light" className="consIcon" />
                            <span className="consLabel">الخبرة</span>
                            <span className="consValue">{getExperienceText(answers.experience)}</span>
                        </div>
                    </div>
                </div>

                {/* Matches Section */}
                <div className="matchesSection">
                    {perfectMatch && (
                        <PlantMatchCard plant={perfectMatch} matchType="perfect" />
                    )}

                    <div className="goodMatchesRow">
                        {goodMatches.map((plant, index) => (
                            <PlantMatchCard key={index} plant={plant} matchType="good" />
                        ))}
                    </div>
                </div>
                
                <GlassyCTA 
                    title="لست متأكداً بعد؟ لا مشكلة، هذه الاقتراحات ستكون محفوظة دائماً. يمكنك تصفح المشتل كاملاً أو تعديل إجاباتك للحصول على نتائج مختلفة."
                    mainBtnText="تصفح الموقع كالمشتل"
                    mainBtnAction={() => navigate('/Home')}
                    secondBtnText="عدل إجاباتك"
                    secondBtnAction={() => navigate('/Questions')}
                />
            </div>
            <Footer />
        </div>
    );
};

export default Suggestions;
