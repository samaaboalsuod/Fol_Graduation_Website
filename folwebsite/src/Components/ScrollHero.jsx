import React from 'react';
import './ScrollHero.css';
import PlantCanvas from './PlantCanvas';
import QuizCard from './QuizCard';

import livingRoom from '../Assets/Icons/livingRoom.png'; 
import logoSvg from '../Assets/Icons/greenLogo.svg';
import SecondButton from './SecondButton';
import { useNavigate } from 'react-router-dom';

const ScrollHero = () => {
  const navigate = useNavigate();
  return (
    <section className="hero-viewport">
  {/* Layer 1: Backgrounds */}
  <div className="scroll-content-container">


    <div className="section-green">
       <h1>اختر نباتك ببساطة وثقة مع فل</h1>
       <h2 className='heroP'>إرشاد عملي مبني على مساحتك، الإضاءة، ووقتك قبل وبعد الشراء. سواء كنت مبتدئًا أو لديك نباتات بالفعل، ستجد ما يساعدك.</h2>
       <QuizCard />

    </div>

    <div className="section-photo">
  {/* The background image that GSAP is already brightening */}
  <img src={livingRoom} alt="Living Room" className='bg-photo' />

  {/* NEW: Living Room UI Elements */}
  <div className='photo-content-layer'>
    <div className='logo-container'>
       <img src={logoSvg} alt="Logo" className='hero-logo' />
    </div>

    <div className="text-reveal-wrapper">
       <h2 className='reveal-text line-1'>حياة</h2>
       <h2 className='reveal-text line-2'>حقيقية</h2>
       <SecondButton 
       text="احصل على صديقك الأخضر" 
       className="line-3" 
       onClick={() => navigate('/Shop')} 
       />
    </div>
  </div>
</div>


  </div>

  {/* Layer 2: The Plant (Fixed) */}
  <div className="hero-3d-overlay">
    <PlantCanvas />
  </div>

</section>

  );
};

export default ScrollHero;