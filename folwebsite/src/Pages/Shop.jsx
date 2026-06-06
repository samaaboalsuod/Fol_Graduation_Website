import React, { useState, useEffect } from 'react';
import { supabase } from '../Supabase.jsx';
import Nav from '../Components/Nav';
import PageTitle from '../Components/PageTitle';
import SectionTitles from '../Components/SectionTitles';
import ShopCarousel from '../Components/ShopCarousel';
import ShopFilterBar from '../Components/ShopFilterBar';
import ShopCard from '../Components/ShopCard';
import FilterOverlay from '../Components/FilterOverlay';
import Footer from '../Components/Footer.jsx';

import shopBg from '../Assets/Icons/shopBg.png';
import './Shop.css';

const Shop = () => {
    const [titleData, setTitleData] = useState(null);
    const [bestSellers, setBestSellers] = useState([]);
    const [allPlants, setAllPlants] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch Hero Title using row 24
            const { data: title } = await supabase
                .from('PageTitle')
                .select('*')
                .eq('id', 24)
                .single();
            
            if (title) setTitleData(title);

            // Fetch the 3 best seller plants
            const { data: plantsData, error } = await supabase
                .from('Plant')
                .select('*')
                .in('id', [1, 2, 13]);

            if (error) console.error(error);

            if (plantsData) {
                // Sort by TotalSales descending
                const sorted = [...plantsData].sort((a, b) => b.TotalSales - a.TotalSales);
                
                // Assign rank and custom 3D model properties
                sorted.forEach((p, index) => {
                    p.rank = index + 1;
                    
                    // Assign explicit scale to fit the card perfectly and Y offset to shift them down
                    if (p.id === 1) { // Pothos
                        p.modelScale = 2.6;
                        p.modelPosition = [0, -1.6, 0];
                    } else if (p.id === 2) { // Aloe Vera
                        p.modelScale = 2.1;
                        p.modelPosition = [0, -1.6, 0];
                    } else if (p.id === 13) { // Peace Lily
                        p.modelScale = 2.4;
                        p.modelPosition = [0, -1.6, 0];
                    }
                });

                // Arrange array so rank 1 is in the middle (index 1) for the carousel
                // [Rank 2, Rank 1, Rank 3]
                let arranged = [];
                if (sorted.length === 3) {
                    arranged = [sorted[1], sorted[0], sorted[2]];
                } else {
                    arranged = sorted;
                }
                
                setBestSellers(arranged);
            }

            // Fetch all plants for the grid
            const { data: allPlantsData, error: allPlantsError } = await supabase
                .from('Plant')
                .select('*');

            if (allPlantsError) console.error(allPlantsError);
            if (allPlantsData) {
                setAllPlants(allPlantsData);
            }
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

                {/* Best Sellers Section */}
                <section className="generalSec shopBestSellerSec">
                    <SectionTitles title="الأكثر مبيعًا هذا الشهر" />
                    
                    {bestSellers.length === 3 && (
                        <ShopCarousel plants={bestSellers} />
                    )}
                </section>

                {/* Main Product List Grid Section */}
                <section className="generalSec shopProductGridSec">
                    <ShopFilterBar onOpenFilters={() => setIsFilterOpen(true)} />
                    
                    <div className="shopProductGrid">
                        {allPlants.map(plant => (
                            <ShopCard key={plant.id} plant={plant} />
                        ))}
                    </div>
                </section>
            </div>

            {isFilterOpen && <FilterOverlay onClose={() => setIsFilterOpen(false)} />}

            <Footer />
        </>
    );
}

export default Shop;
