import React, { useState, useEffect } from 'react';
import './Contact.css';
import { supabase } from '../Supabase.jsx';
import Nav from '../Components/Nav';
import PageTitle from '../Components/PageTitle';
import SectionTitles from '../Components/SectionTitles';
import ContactMethodCard from '../Components/ContactMethodCard';
import MapSection from '../Components/MapSection';
import GlassyCTA from '../Components/GlassyCTA';
import heroBg from '../Assets/Icons/heroBg.png';
import Footer from '../Components/Footer.jsx';

const Contact = () => {
    const [titleData, setTitleData] = useState(null);
    const [contactMethods, setContactMethods] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch Hero Title (id 10)
            const { data: title } = await supabase
                .from('PageTitle')
                .select('*')
                .eq('id', 10)
                .single();
            
            if (title) setTitleData(title);

            // Fetch Contact Methods
            const { data: methods } = await supabase
                .from('Contctmethod')
                .select('*')
                .order('id', { ascending: true });
            
            if (methods) setContactMethods(methods);
        };

        fetchData();
    }, []);

    return (

        <>
            <div className="navOverlay">
                <Nav hideWave={true} />
            </div>
            
            {/* Hero Background Layer (Starts from top) */}
            <div className="heroBgLayer">
                <img src={heroBg} alt="Background" className="bgImg" />
                <div className="greenOverlay"></div>
                <div className="blurLayer"></div>
            </div>

            {/* Page Content Overlay */}
            <div className="pageContent">
                {/* Hero Title (Positioned like Onboarding) */}
                <div className="heroTitleCont">
                    {titleData && (
                        <PageTitle 
                            title={titleData.Title} 
                            discription={titleData.Description} 
                        />
                    )}
                </div>

                {/* Contact Methods Section (Overlaying Hero) */}
                <section className="generalSec contactMethodsSec">
                    <SectionTitles title="وسائل التواصل المتاحة لفل" />
                    
                    <div className="cardsContainer">
                        {contactMethods.map((method, index) => (
                            <ContactMethodCard 
                                key={method.id}
                                platform={method.platformkey}
                                value={method.value}
                                responseTime={method.responsetimear}
                                buttonText={method.platformkey === 'email' ? 'أرسل بريدًا' : 'أرسل رسالة'}
                                link={method.linkurl}
                                // Rightmost 2 cards (0,1) sharp-left, Leftmost 2 cards (2,3) flipped to sharp-right
                                direction={index < 2 ? 'left' : 'right'}
                            />
                        ))}
                    </div>
                </section>

                {/* Map Section */}
                <section className="generalSec">
                    <SectionTitles title="أو زرنا في أماكننا" />
                    <MapSection />
                </section>

                {/* Question/Expert CTA */}
                <GlassyCTA 
                    title="هل تريد أن تسأل عن النبات؟"
                    secondBtnText="انتقل لتسأل خبيرًا"
                    secondBtnAction={() => console.log("Navigate to expert")}
                />
            </div>


    <Footer />

</>
        
    );
};

export default Contact;
