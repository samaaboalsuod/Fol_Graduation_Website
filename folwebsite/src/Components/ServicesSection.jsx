import { useEffect, useState, useRef } from 'react';
import { supabase } from '../Supabase.jsx'; 
import './ServicesSection.css';
import decorRoot from '../Assets/Icons/decorRoot.svg';

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

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

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / sectionHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  if (loading) return <div className="loader">Loading...</div>;

  // Calculate which service is active and its individual fade
 const activeIndex = Math.min(Math.floor(scrollProgress * services.length), services.length - 1);

  return (
    <div className="scroll-wrapper" ref={sectionRef} style={{ height: `${services.length * 100}vh` }}>
      <section className="services-viewport sticky-container">
        
        {/* FIXED LAYERS - Moved Z-Index up in CSS to stay above photos */}
        <div className="silver-roots-overlay">
           <img src={decorRoot} alt="decor" />
        </div>
        
        <h3 className="section-main-title">ماذا نقدم لك؟</h3>
        <span className="service-counter">{activeIndex + 1}/{services.length}</span>

        {/* DISSOLVING SLIDES */}
        {services.map((service, index) => {
          const step = 1 / services.length;
          const start = index * step;
          const end = (index + 1) * step;
          
          let opacity = 0;
          
          // Logic: If it's the last item and we are at the end of the scroll, keep it visible
          if (index === services.length - 1 && scrollProgress >= start) {
            opacity = 1;
          } else if (scrollProgress >= start && scrollProgress < end) {
            opacity = 1;
          }

          return (
            <div 
              key={service.id} 
              className="service-slide dissolve-layer"
              style={{ 
                opacity: opacity,
                visibility: opacity > 0 ? 'visible' : 'hidden',
                zIndex: opacity > 0 ? 5 : 1 // Bring the active slide to the front
              }}
            >
              <div 
                className="service-bg" 
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${service.Photo})` }}
              />

              <div className="service-content">
                <div className="glass-container title-card animate-pop">
                   <h2>{service.NameAR}</h2>
                </div>
                <div className="glass-container description-card animate-pop delay-1">
                   <h2>{service.DescriptionAR}</h2>
                </div>
                <div className="glass-container stat-card animate-pop delay-2">
                   <p>{service.Users}+ استشارة</p>
                </div>
                <div className="cta-container animate-pop delay-3">
                   <button className="main-button-placeholder">احجز موعدك الآن</button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default ServicesSection;