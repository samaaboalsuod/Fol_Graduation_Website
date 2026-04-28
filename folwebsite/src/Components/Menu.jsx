import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';

import search from '../Assets/Icons/search.svg'; 
import close from '../Assets/Icons/x.svg'; 


const Menu = ({ closeMenu }) => {
  const navigate = useNavigate();
  const menuItems = [
    "عن فل", "تواصل مع فل", "تسوق مشتلنا", "الوظائف", "خدماتنا", "اسأل خبيرًا", "الاستدامة"
  ];

  const handleStartQuiz = () => {
    closeMenu();
    navigate('/Questions');
  };

  return (
    <div className="menu-overlay">
      <div className="menu-header">
        <button> <img src={search} alt="" /> </button>
        <button onClick={closeMenu}> <img src={close} alt="" /> </button>
      </div>

      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item">
            {item === "تواصل مع فل" ? (
              <a href="/Contact" onClick={closeMenu}>{item}</a>
            ) : item === "اسأل خبيرًا" ? (
              <a href="/Asking#ask-expert" onClick={closeMenu}>{item}</a>
            ) : (
              item
            )}
            <hr className="menu-divider" />
          </li>
        ))}
      </ul>

      <button className="cta-button" onClick={handleStartQuiz}>لنختر ما يناسبك معًا</button>
    </div>
  );
};

export default Menu;