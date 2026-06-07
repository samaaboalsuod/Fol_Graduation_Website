import React, { useState, useEffect } from 'react';
import { supabase } from '../Supabase.jsx';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';
import PageTitle from '../Components/PageTitle';
import AboutJourney from './AboutJourney';

import './About.css';

import fillLogo from '../Assets/Icons/fillLogo.png';
import decorLeaf from '../Assets/Icons/decorLeaf.png';

const About = () => {
    const [titleData, setTitleData] = useState(null);

    useEffect(() => {
        const fetchTitle = async () => {
            const { data } = await supabase
                .from('PageTitle')
                .select('*')
                .eq('id', 26)
                .single();

            if (data) {
                setTitleData(data);
            }
        };

        fetchTitle();
    }, []);

    return (
        <div className="aboutPage" dir="rtl">
            <div className="navOverlay">
                <Nav hideWave={true} />
            </div>
            {/* Background pattern removed as requested */}

            <div className="aboutContent">
                <div className="aboutHeroTitle">
                    {titleData ? (
                        <PageTitle
                            title={titleData.Title}
                            subtitle={titleData.SubTitle}
                            discription={titleData.Description}
                        />
                    ) : (
                        <div style={{ height: '200px' }}></div>
                    )}
                </div>

                <div className="aboutLogoSection">
                    {/* Floating Bubbles */}
                    <div className="aboutBubble bubbleLeft">
                        <h3>95%</h3>
                        <p>معدل نجاح</p>
                    </div>

                    <div className="aboutBubble bubbleTopRight">
                        <h3 dir="ltr">+1500</h3>
                        <p>عميل سعيد</p>
                    </div>

                    <div className="aboutBubble bubbleBottomRight">
                        <h3 dir="ltr">+200</h3>
                        <p>نوع نبات</p>
                    </div>

                    {/* Central Logo */}
                    <img src={fillLogo} alt="Fol Logo" className="aboutMainLogo" />
                </div>

                {/* Decorative Leaf */}
                <img src={decorLeaf} alt="" className="aboutDecoLeaf" />
            </div>

            <AboutJourney />

            <div className="aboutFooterWrapper">
                <Footer />
            </div>
        </div>
    );
};

export default About;
