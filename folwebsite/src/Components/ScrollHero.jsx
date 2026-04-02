import React from 'react';
import './ScrollHero.css';
import PlantCanvas from './PlantCanvas';
import QuizCard from './QuizCard';

import livingRoom from '../Assets/Icons/livingRoom.png'; 

const ScrollHero = () => {
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

       <img src={livingRoom} alt="Living Room" />

       <div className="photo-ui-overlay">
          <h2>Bring it Home</h2>
          <button className="cta-button">Shop Now</button>
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