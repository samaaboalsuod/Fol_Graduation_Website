import React, { Component } from 'react';
import './Home.css';
import Nav from '../Components/Nav';
import ScrollHero from '../Components/ScrollHero';
import ServicesSection from '../Components/ServicesSection';
import CategoriesSection from '../Components/CategoriesSection';
import AskingExpert from '../Components/AskingExpert';
import CommunitySection from '../Components/CommunitySection';
import Footer from '../Components/Footer';



const Home = () => {
    return ( <>
    
    <Nav />
    
    <ScrollHero />
    
    <ServicesSection />

    <CategoriesSection />

    <AskingExpert />

    <CommunitySection />

    <Footer />
    
    
    </> );
}
 
export default Home;