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

const ServiceDetail = () => {
    const { id } = useParams();
    const [serviceData, setServiceData] = useState(null);
    const [titleData, setTitleData] = useState(null);
    const [selectedType, setSelectedType] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch Service Data by id
            const { data: service } = await supabase
                .from('Service')
                .select('*')
                .eq('id', id || 1)
                .single();
            
            if (service) setServiceData(service);

            // Fetch Page Title (id 12)
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

    // Icon mapping logic
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

                {/* Future sections will be added here */}
            </div>

            <Footer />
        </div>
    );
};

export default ServiceDetail;
