import React, { Component } from 'react';
import './Home.css';
import Nav from '../Components/Nav';
import ScrollHero from '../Components/ScrollHero';
import ServicesSection from '../Components/ServicesSection';
import CategoriesSection from '../Components/CategoriesSection';
import AskingExpert from '../Components/AskingExpert';



const Home = () => {
    return ( <>
    
    <Nav />
    
    <ScrollHero />
    
    <ServicesSection />

    <CategoriesSection />

    <AskingExpert />
    
    
    
    
    
    
    </> );
}
 
export default Home;