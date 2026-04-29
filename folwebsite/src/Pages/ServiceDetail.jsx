import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../Supabase.jsx';
import Nav from '../Components/Nav';
import PageTitle from '../Components/PageTitle';
import SectionTitles from '../Components/SectionTitles';
import MainButton from '../Components/MainButton';
import Footer from '../Components/Footer.jsx';
import './ServiceDetail.css';

// Icons for different services
import ser1Icon1 from '../Assets/Icons/ser1Icon1.svg';
import ser1Icon2 from '../Assets/Icons/ser1Icon2.svg';

import ServiceTypeCard from '../Components/ServiceTypeCard';

import { motion } from 'framer-motion';
import NeedHelpCard from '../Components/NeedHelpCard';

import { ClipboardText, Plant, Broom, SunDim } from '@phosphor-icons/react';
import InclusionCard from '../Components/InclusionCard';
import ConsultationTypeBlock from '../Components/ConsultationTypeBlock';
import StepItem from '../Components/StepItem';

const ServiceDetail = () => {
    const { id } = useParams();
    const [serviceData, setServiceData] = useState(null);
    const [titleData, setTitleData] = useState(null);
    const [selectedType, setSelectedType] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const { data: service } = await supabase
                .from('Service')
                .select('*')
                .eq('id', id || 1)
                .single();
            
            if (service) setServiceData(service);

            const { data: title } = await supabase
                .from('PageTitle')
                .select('*')
                .eq('id', 12)
                .single();
            
            if (title) setTitleData(title);
        };

        fetchData();
    }, [id]);

    if (!serviceData || !titleData) return <div className="loading">جاري التحميل...</div>;

    const getIcons = (serviceId) => {
        if (serviceId === "1") return [ser1Icon2, ser1Icon1];
        return [ser1Icon2, ser1Icon1]; 
    };

    const currentIcons = getIcons(id || "1");

    return (
        <div className="serviceDetailPage">
            <div className="navOverlay">
                <Nav hideWave={true} />
            </div>

            <div className="heroBgLayer">
                <img src={serviceData.Photo} alt={serviceData.NameAR} className="bgImg" />
                <div className="greenOverlay"></div>
                <div className="blurLayer"></div>
            </div>

            <div className="pageContent">
                <div className="heroTitleCont">
                    <PageTitle 
                        title={titleData.Title} 
                        subtitle={titleData.SubTitle}
                        discription={titleData.Description} 
                    />
                </div>

                <section className="generalSec serviceTypeSec">
                    <SectionTitles title="احجز الاستشارة الآن" />
                    
                    <div className="typeCardsContainer">
                        <ServiceTypeCard 
                            title={serviceData.Adv1T} 
                            icon={currentIcons[0]} 
                            selected={selectedType === 0}
                            onClick={() => setSelectedType(0)}
                        />
                        <ServiceTypeCard 
                            title={serviceData.Adv2T} 
                            icon={currentIcons[1]} 
                            selected={selectedType === 1}
                            onClick={() => setSelectedType(1)}
                        />
                    </div>

                    <div className="bookingBtnCont">
                        <MainButton text="احجز الآن" onClick={() => console.log("Booking flow started")} />
                    </div>
                </section>

                {/* Need Help Section */}
                <section className="generalSec2">
                    <SectionTitles title="هل تحتاج المساعدة لنباتاتك؟" />
                    
                    <div className="stairsContainer">
                        <div className="stairItem stair1">
                            <NeedHelpCard 
                                text={serviceData.Need1T} 
                                img={serviceData.Need1Img} 
                                alt={serviceData.Need1Alt} 
                            />
                        </div>
                        <div className="stairItem stair2">
                            <NeedHelpCard 
                                text={serviceData.Need2T} 
                                img={serviceData.Need2Img} 
                                alt={serviceData.Need2Alt} 
                            />
                        </div>
                        <div className="stairItem stair3">
                            <NeedHelpCard 
                                text={serviceData.Need3T} 
                                img={serviceData.Need3Img} 
                                alt={serviceData.Need3Alt} 
                            />
                        </div>
                    </div>
                </section>

                {/* What's Included Section */}
                <section className="generalSec2">
                    <SectionTitles title="ماذا تشمل الاستشارة؟" />
                    
                    <div className="inclusionGrid">
                        <InclusionCard text={serviceData.Inc1} icon={ClipboardText} />
                        <InclusionCard text={serviceData.Inc2} icon={Plant} />
                        <InclusionCard text={serviceData.Inc3} icon={Broom} />
                        <InclusionCard text={serviceData.Inc4} icon={SunDim} />
                    </div>
                </section>

                {/* Types of Consultations Section */}
                <section className="generalSec2">
                    <SectionTitles title="أنواع الاستشارات" />
                    
                    <ConsultationTypeBlock 
                        title={serviceData.Adv1T} 
                        points={serviceData.Adv1Pts} 
                        img={serviceData.Adv1Img || serviceData.Photo} 
                        reverse={false}
                    />
                    
                    <ConsultationTypeBlock 
                        title={serviceData.Adv2T} 
                        points={serviceData.Adv2Pts} 
                        img={serviceData.Adv2Img || serviceData.Photo} 
                        reverse={true}
                    />
                </section>

                {/* How to Benefit Section */}
                <section className="generalSec2">
                    <SectionTitles title="كيف تستفيد من الخدمة؟" />
                    
                    <StepItem 
                        number="01" 
                        title={serviceData.Step1T} 
                        description={serviceData.Step1D} 
                        reverse={false} 
                    />
                    <StepItem 
                        number="02" 
                        title={serviceData.Step2T} 
                        description={serviceData.Step2D} 
                        reverse={true} 
                    />
                    <StepItem 
                        number="03" 
                        title={serviceData.Step3T} 
                        description={serviceData.Step3D} 
                        reverse={false} 
                    />
                    <StepItem 
                        number="04" 
                        title={serviceData.Step4T} 
                        description={serviceData.Step4D} 
                        reverse={true} 
                    />
                </section>

                {/* Future sections will be added here */}
            </div>

            <Footer />
        </div>
    );
};

export default ServiceDetail;
