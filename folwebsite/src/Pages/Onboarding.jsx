import React, { useState, useEffect } from 'react';

import './Onboarding.css';

import { supabase } from '../Supabase.jsx'; 
import PageTitle from './../Components/PageTitle';



const Onboarding = () => {

    const [titleData, setTitleData] = useState(null);

    useEffect(() => {
        const fetchHeader = async () => {
            // Fetching only row 6 as requested
            const { data, error } = await supabase
                .from('PageTitle')
                .select('*')
                .eq('id', 6) 
                .single(); // Since we only want one specific row

            if (error) {
                console.error("Error fetching page title:", error.message);
            } else {
                setTitleData(data);
            }
        };

        fetchHeader();
    }, []);



    return ( <>
    
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


    <section className='pathSec'></section>
    
    
    
    
    
    
    
    
    
    
    
    
    
    </> );
}
 
export default Onboarding;