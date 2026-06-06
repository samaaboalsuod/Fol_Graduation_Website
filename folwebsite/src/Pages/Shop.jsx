import React, { useState, useEffect } from 'react';
import { supabase } from '../Supabase.jsx';
import Nav from '../Components/Nav';
import PageTitle from '../Components/PageTitle';
import Footer from '../Components/Footer.jsx';

import shopBg from '../Assets/Icons/shopBg.png';
import './Shop.css';

const Shop = () => {
    const [titleData, setTitleData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch Hero Title using row 24 as requested
            const { data: title } = await supabase
                .from('PageTitle')
                .select('*')
                .eq('id', 24)
                .single();
            
            if (title) setTitleData(title);
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="navOverlay">
                <Nav hideWave={true} />
            </div>
                    
            <div className="heroBgLayer">
                <img src={shopBg} alt="Shop Background" className="bgImg" />
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

                {/* Overlapping section below hero */}
                <section className="shopContentSec">
                    {/* Future shop content/cards will go here */}
                </section>
            </div>

            <Footer />
        </>
    );
}

export default Shop;
