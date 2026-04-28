import React, { useState, useEffect } from 'react';
import { supabase } from '../Supabase.jsx';
import Nav from '../Components/Nav';
import PageTitle from '../Components/PageTitle';
import Footer from '../Components/Footer.jsx';
import heroBg from '../Assets/Icons/heroBg.png';
import './Asking.css';

const Asking = () => {
    const [titleData, setTitleData] = useState(null);

    useEffect(() => {
        const fetchTitleData = async () => {
            const { data, error } = await supabase
                .from('PageTitle')
                .select('*')
                .eq('id', 11)
                .single();
            
            if (data) {
                setTitleData(data);
            }
        };

        fetchTitleData();
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
            </div>

            <Footer />
        </>
    );
}

export default Asking;