import React from 'react';
import './ScrollHero.css';
import PlantCanvas from './PlantCanvas';

import livingRoom from '../Assets/Icons/livingRoom.png'; 

const ScrollHero = () => {
  return (
    <section className="hero-viewport">
      {/* THIS IS THE CONTAINER WE WILL ANIMATE THE PLANT AGAINST */}
      <div className="scroll-content-container">
        
        {/* 1. SCREEN 1: GREEN HERO (Top half) */}
        <div className="section-green hero-hero">
          {/* PLACEHOLDER FOR NAVBAR, LOGO, MAIN ARABIC TEXT FROM Figma */}
          {/* We'll use absolute positioning for these elements */}

          <div className="main-text-container"><h1>اختر نباتك...</h1></div>
          <div className="secondary-text-container">...</div>
          <div className="cta-container">...</div>
        </div>

        {/* 2. SCREEN 2: LIVING ROOM PHOTO (Bottom half) */}
        <div className="section-photo hero-living-room">
          <img src={livingRoom} alt="Living Room" />
          {/* OPTIONAL: "ماذا نقدم؟" Button */}
        </div>
      </div>

      {/* 3. THE 3D CANVAS OVERLAY */}
      {/* It must span BOTH sections so the plant can traverse them */}
      <div className="hero-3d-overlay">
        <PlantCanvas />
      </div>

      {/* 4. THE INVISIBLE SCROLL TRIGGER */}
      {/* Creates the length needed to drive the scroll animation */}
      <div className="scroll-trigger" />
    </section>
  );
};

export default ScrollHero;