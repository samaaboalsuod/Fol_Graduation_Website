import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';

import search from '../Assets/Icons/search.svg'; 
import close from '../Assets/Icons/x.svg'; 


const Menu = ({ closeMenu }) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { title: "عن فل", link: "#" },
    { title: "تواصل مع فل", link: "/Contact" },
    { title: "تسوق مشتلنا", link: "/Shop" },
    { title: "الوظائف", link: "#" },
    { 
      title: "خدماتنا", 
      link: "#",
      subItems: [
        { title: "استشارات واقعية وافتراضية", link: "#" },
        { title: "الرحلة تبدأ بعد الشراء", link: "#" },
        { title: "العناية أثناء غيابك", link: "#" },
        { title: "تنسيق الحدائق", link: "#" },
        { title: "تنسيق الهدايا", link: "#" }
      ]
    },
    { title: "اسأل خبيرًا", link: "/Asking#ask-expert" },
    { title: "الاستدامة", link: "#" },
    { title: "تطبيق فل", link: "#" }
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
          <li key={index} className={`menu-item ${item.subItems ? 'has-submenu' : ''}`}>
            {item.subItems ? (
              <div className="submenu-container">
                <span className="menu-title">{item.title}</span>
                <ul className="sub-menu">
                  {item.subItems.map((sub, subIdx) => (
                    <li key={subIdx} className="sub-menu-item">
                      <a href={sub.link} onClick={closeMenu}>{sub.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <a href={item.link} onClick={closeMenu} className="menu-title">{item.title}</a>
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