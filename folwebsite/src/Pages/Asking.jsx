import React, { useState, useEffect } from 'react';
import { supabase } from '../Supabase.jsx';
import Nav from '../Components/Nav';
import PageTitle from '../Components/PageTitle';
import SectionTitles from '../Components/SectionTitles';
import ActionCard from '../Components/ActionCard';
import ChatHistory from '../Components/ChatHistory';
import Footer from '../Components/Footer.jsx';

import heroBg from '../Assets/Icons/heroBg.png';
import './Asking.css';

const Asking = () => {
    const [titleData, setTitleData] = useState(null);
    const [services, setServices] = useState([]);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch Hero Title (id 11)
            const { data: title } = await supabase
                .from('PageTitle')
                .select('*')
                .eq('id', 11)
                .single();
            
            if (title) setTitleData(title);

            // Fetch Asking Services
            const { data: servicesData } = await supabase
                .from('Asking_Service')
                .select('*')
                .order('id', { ascending: true });
            
            if (servicesData) setServices(servicesData);

            // Fetch Chat History
            const { data: historyData } = await supabase
                .from('webchathistory')
                .select('*')
                .order('id', { ascending: true });
            
            if (historyData) setHistory(historyData);
        };

        fetchData();
    }, []);

    return (
        <>
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

                {/* Asking Services Section */}
                <section className="generalSec servicesSec">
                    <SectionTitles title="اختر كيف تريد أن تسألنا" />
                    
                    <div className="cardsContainer">
                        {services.map((service) => (
                            <ActionCard 
                                key={service.id}
                                title={service.NameAR}
                                subtitle={service.CardTagAR}
                                discription={service.AppDisc}
                                features={service.FeaturesAR}
                                icon={service.HIcon}
                                iconAlt={service.alt}
                                isHighlighted={service.IsRecommended}
                                btnText={service.BtnTextAR}
                                onClick={() => console.log(`Selected service: ${service.NameAR}`)}
                            />
                        ))}
                    </div>
                </section>

                {/* Chat History Section */}
                <ChatHistory history={history} />
            </div>

            <Footer />
        </>
    );
}

export default Asking;

