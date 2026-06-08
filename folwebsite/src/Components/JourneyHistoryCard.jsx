import React from 'react';
import { Sun, House, Clock, GraduationCap, Drop } from '@phosphor-icons/react';
import MainButton from './MainButton';
import './JourneyHistoryCard.css';

const JourneyHistoryCard = ({ journey, onShowSuggestions }) => {
    
    // Mapping texts
    const getLightingText = (val) => {
        if (val === 'high_direct') return { title: 'إضاءة عالية', desc: 'إضاءة قوية بجانب النافذة' };
        if (val === 'high_indirect') return { title: 'إضاءة ساطعة', desc: 'إضاءة ساطعة غير مباشرة' };
        if (val === 'medium_indirect') return { title: 'إضاءة متوسطة', desc: 'إضاءة متوسطة في الغرفة' };
        return { title: 'إضاءة منخفضة', desc: 'إضاءة منخفضة أو صناعية' };
    };

    const getPlacementText = (val) => {
        if (val === 'small_surface') return { title: 'سطح صغير', desc: 'مكتب أو طاولة صغيرة' };
        if (val === 'floor_large') return { title: 'مساحة أرضية', desc: 'مساحة واسعة على الأرض' };
        if (val === 'outdoor_balcony') return { title: 'مساحة خارجية', desc: 'شرفة أو حديقة' };
        return { title: 'مساحة داخلية', desc: 'غرفة أو صالة' };
    };

    const getMaintenanceText = (val) => {
        if (val === 'low_maintenance') return { title: 'ري بسيط', desc: 'تتحمل العطش' };
        if (val === 'medium_maintenance') return { title: 'ري معتدل', desc: 'تحتاج ري منتظم' };
        if (val === 'high_maintenance') return { title: 'عناية مستمرة', desc: 'تتطلب رعاية فائقة' };
        return { title: 'ري متوسط', desc: 'منتظم' };
    };

    const getExperienceText = (val) => {
        if (val === 'beginner') return 'مبتدئ';
        if (val === 'intermediate') return 'متوسط';
        if (val === 'advanced') return 'خبير';
        return 'غير محدد';
    };

    const lightData = getLightingText(journey.lighting_selection);
    const spaceData = getPlacementText(journey.placement_selection);
    const waterData = getMaintenanceText(journey.maintenance_selection);
    const expText = getExperienceText(journey.experience_selection);

    const formattedDate = new Date(journey.created_at).toLocaleDateString('en-GB'); // dd/mm/yyyy
    const mainTitle = `توصية لمساحة ب${lightData.title}`;

    return (
        <div className="journeyHistoryCard" dir="rtl">
            <div className="journeyDate">{formattedDate}</div>
            <h3 className="journeyTitle">{mainTitle}</h3>
            
            <div className="journeyGrid">
                
                <div className="journeyDetailItem">
                    <div className="journeyDetailIconText">
                        <Drop size="2rem" color="#fff" weight="regular" />
                        <span className="journeyDetailLabel">الري</span>
                    </div>
                    <div className="journeyDetailDesc">{waterData.desc}</div>
                </div>

                <div className="journeyDetailItem">
                    <div className="journeyDetailIconText">
                        <Sun size="2rem" color="#fff" weight="regular" />
                        <span className="journeyDetailLabel">الإضاءة</span>
                    </div>
                    <div className="journeyDetailDesc">{lightData.desc}</div>
                </div>

                <div className="journeyDetailItem">
                    <div className="journeyDetailIconText">
                        <House size="2rem" color="#fff" weight="regular" />
                        <span className="journeyDetailLabel">المساحة</span>
                    </div>
                    <div className="journeyDetailDesc">{spaceData.desc}</div>
                </div>

                <div className="journeyDetailItem">
                    <div className="journeyDetailIconText">
                        <GraduationCap size="2rem" color="#fff" weight="regular" />
                        <span className="journeyDetailLabel">مستوى الخبرة</span>
                    </div>
                    <div className="journeyDetailDesc">{expText}</div>
                </div>

            </div>

            <MainButton 
                className="journeyShowBtn" 
                onClick={() => onShowSuggestions(journey)}
                text="شاهد الاقتراحات"
            />
        </div>
    );
};

export default JourneyHistoryCard;
