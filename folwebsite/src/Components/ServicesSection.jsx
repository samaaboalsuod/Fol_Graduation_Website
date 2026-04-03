import { useEffect, useState } from 'react';
import { supabase } from '../Supabase.jsx'; 
// import MainButton from './MainButton'; 
import './ServicesSection.css';
import decorRoot from '../Assets/Icons/decorRoot.svg';

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks current scroll/slide

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('Service') 
        .select('id, NameAR, DescriptionAR, Users, Photo') 
        .order('id', { ascending: true });

      if (error) console.error("Error fetching services:", error);
      else setServices(data);
      setLoading(false);
    };
    fetchServices();
  }, []);

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <section className="services-viewport">
      {/* LAYER 1: STATIC BACKGROUND DECOR */}
      <div className="silver-roots-overlay">
         <img src={decorRoot} alt="decor" />
      </div>

      {/* LAYER 2: STATIC UI OVERLAYS (Title & Counter) */}
      <h3 className="section-main-title">ماذا نقدم لك؟</h3>
      <span className="service-counter">
        {currentIndex + 1}/{services.length}
      </span>

      {/* LAYER 3: DYNAMIC CONTENT SLIDES */}
      <div className="slides-container">
        {services.map((service, index) => (
          <div key={service.id} className="service-slide">
            
            <div 
              className="service-bg" 
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${service.Photo})` }}
            />

            <div className="service-content">
              {/* Title Bubble */}
              <div className="glass-container title-card">
                 <h2>{service.NameAR}</h2>
              </div>
              
              {/* Description Bubble */}
              <div className="glass-container description-card">
                 <p>{service.DescriptionAR}</p>
              </div>

              {/* Stats Bubble */}
              <div className="glass-container stat-card">
                 <span>{service.Users}+ استشارة</span>
              </div>

              {/* CTA Button */}
              <div className="cta-container">
                 <button className="main-button-placeholder">احجز موعدك الآن</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;