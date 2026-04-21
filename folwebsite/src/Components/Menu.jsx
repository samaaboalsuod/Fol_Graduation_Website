import React from 'react';
import './Menu.css';

import search from '../Assets/Icons/search.svg'; 
import close from '../Assets/Icons/x.svg'; 


const Menu = ({ closeMenu }) => {
  const menuItems = [
    "عن فل", "تواصل مع فل", "تسوق مشتلنا", "الوظائف", "خدماتنا", "اسأل خبيرًا", "الاستدامة"
  ];

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
            ) : (
              item
            )}
            <hr className="menu-divider" />
          </li>
        ))}
      </ul>

      <button className="cta-button">لنختر ما يناسبك معًا</button>
    </div>
  );
};

export default Menu;