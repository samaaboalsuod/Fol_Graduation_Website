import React, { useState, useEffect } from 'react';

import './Onboarding.css';

import { supabase } from '../Supabase.jsx'; 
import PageTitle from './../Components/PageTitle';
import ActionCard from './../Components/ActionCard';
import logo from '../Assets/Icons/logo.svg';
import DecorLeaf from '../Assets/Icons/decorLeaf.png';


const Onboarding = () => {

    const [titleData, setTitleData] = useState(null);
    const [paths, setPaths] = useState([]);

useEffect(() => {
        // 1. Fetch the Page Title (Row 6)
        const fetchHeader = async () => {
            const { data, error } = await supabase
                .from('PageTitle')
                .select('*')
                .eq('id', 6) 
                .single();

            if (error) {
                console.error("Error fetching page title:", error.message);
            } else {
                setTitleData(data);
            }
        };

        // 2. Fetch the Onboarding Paths (Action Cards)
        const fetchPaths = async () => {
            const { data, error } = await supabase
                .from('Onboarding_Paths')
                .select('*')
                .order('Id', { ascending: true });

            if (error) {
                console.error("Error fetching paths:", error.message);
            } else {
                setPaths(data);
            }
        };

        fetchHeader();
        fetchPaths();
    }, []);



    return ( <>

    <nav>
        <header>
            <img src={logo} alt="logo" />
        </header>
    </nav>
    
    {titleData ? (
                <PageTitle 
                    // Mapping Capitalized DB columns to your lowercase props
                    title={titleData.Title}
                    subtitle={titleData.SubTitle}
                    discription={titleData.Description}
                    icon={titleData.Icon}
                />
            ) : (
                <p>Loading title...</p>
    )}


    <section className='pathSec'>
        {paths.map((path) => (
                <ActionCard 
                    key={path.Id}
                    // Mapping Capitalized DB columns to your props
                    title={path.Title_Ar}
                    subtitle={path.Subtitle_Ar}
                    discription={path.Description_Ar}
                    features={path.Features_Ar} // Passes the array to be mapped
                    icon={path.Icon_Url}
                    iconAlt={path.Icon_Alt}
                    btnText={path.BtnText}
                    isHighlighted={path.Is_Highlighted}
                    onClick={() => console.log(`Selected path: ${path.Id}`)}
                />
        ))}
    </section>
    
    
  <div className="leaf-decor-system">
    <img src={DecorLeaf} className="leaf-primary" alt="" />
    <img src={DecorLeaf} className="leaf-secondary" alt="" />
</div>
    
    </> );
}
 
export default Onboarding;