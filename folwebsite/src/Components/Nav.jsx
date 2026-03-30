import React from 'react';
import { useState } from 'react';
import './Nav.css';
import Menu from './Menu';



import logo from '../Assets/Icons/logo.svg';
import burger from '../Assets/Icons/burgerMenu.svg';

const Nav = () => {

  const [isOpen, setIsOpen] = useState(false);
  // Mapping 5 flowers
  const flowers = [
    { id: 1, left: '8%', scale: 0.6, delay: '0.1s' },
    { id: 2, left: '22%', scale: 0.9, delay: '0.3s' },
    { id: 3, left: '50%', scale: 0.7, delay: '0.2s' },
    { id: 4, left: '78%', scale: 1.1, delay: '0.4s' },
    { id: 5, left: '90%', scale: 0.8, delay: '0.15s' },
  ];

  return (
    <nav>
        
     {/* 1. The Full-Screen Menu Overlay */}
      {isOpen && <Menu closeMenu={() => setIsOpen(false)} />}

      {/* 2. Your Wave and Flowers (only show when menu is closed) */}
      {!isOpen && <div className="nav-wave-bg">...</div>}

      <div className="nav-wave-bg">
        <svg viewBox="0 0 1280 80" preserveAspectRatio="none">
           <path d="M0 0H1280V59.6865C1280 59.6865 1182.97 79.6865 1120 79.6865C1057.03 79.6865 1022.97 59.6865 960 59.6865C897.03 59.6865 862.97 79.6865 800 79.6865C737.03 79.6865 702.97 59.6865 640 59.6865C577.03 59.6865 542.97 79.6865 480 79.6865C417.03 79.6865 382.97 59.6865 320 59.6865C257.03 59.6865 222.97 79.6865 160 79.6865C97.0299 79.6865 0 59.6865 0 59.6865V0Z" fill="#FAFAEA"/>
        </svg>
      </div>

      
      {flowers.map((f) => (
        <div key={f.id} className="flower-layer" style={{ left: f.left, transform: `scale(${f.scale})`, transitionDelay: f.delay }}>
          <svg width="32" height="31" viewBox="0 0 32 31" fill="none">
            <path d="M15.7617 0.228516C17.9362 0.245912 20.1124 1.46662 20.9395 3.88574C21.5714 5.73473 21.4006 8.24344 19.8975 11.3936C22.1698 8.83072 24.2842 7.75766 26.0742 7.69043C28.4331 7.60194 30.1269 9.25927 30.7764 11.3203C31.4257 13.3813 31.0529 15.9001 29.2402 17.6104C27.841 18.9304 25.6172 19.7374 22.4229 19.5137C25.2838 20.654 26.7396 22.1588 27.1846 23.7285C27.7662 25.7803 26.5873 27.8073 24.8408 29.0518C23.0917 30.298 20.6908 30.8222 18.7178 29.7979C17.1969 29.0081 15.9888 27.3295 15.5225 24.4824C15.0181 27.3364 13.7909 29.0034 12.2627 29.7705C10.2817 30.7649 7.89707 30.1956 6.17383 28.915C4.45293 27.6362 3.31065 25.5832 3.9209 23.5371C4.38638 21.9768 5.84963 20.4968 8.69727 19.4053C5.53004 19.5764 3.34032 18.7383 1.97559 17.4004C0.201553 15.6612 -0.122345 13.1336 0.561523 11.082C1.24535 9.03061 2.96125 7.3995 5.30859 7.53027C7.08937 7.62963 9.1725 8.74303 11.3857 11.3525C9.95062 8.16664 9.83489 5.6488 10.5068 3.80664C11.3858 1.39712 13.5871 0.211234 15.7617 0.228516Z" fill="#177333" stroke="#FAFAEA" stroke-width="0.456927"/>
          </svg>
        </div>
      ))}

      
      <header>
        <img src={logo} alt="logo" />
        <img 
          src={burger} 
          alt="menu" 
          className="nav-item" 
          onClick={() => setIsOpen(true)} 
          style={{ cursor: 'pointer' }}
        />
      </header>
    </nav>
  );
};

export default Nav;