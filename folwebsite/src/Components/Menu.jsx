import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useCart } from '../CartContext';
import { ShoppingCartSimple, UserCircle } from '@phosphor-icons/react';
import './Menu.css';

import search from '../Assets/Icons/search.svg'; 
import close from '../Assets/Icons/x.svg'; 


const Menu = ({ closeMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, requireAuth } = useAuth();
  const { cartItems, openCart } = useCart();
  
  const menuItems = [
    { title: "الرئيسية", link: "/Home" },
    { title: "عن فل", link: "/About" },
    { title: "تواصل مع فل", link: "/Contact" },
    { title: "تسوق مشتلنا", link: "/Shop" },
    { title: "الوظائف", link: "#" },
    { 
      title: "خدماتنا", 
      link: "#",
      subItems: [
        { title: "استشارات واقعية وافتراضية", link: "/ServiceDetail/1" },
        { title: "الرحلة تبدأ بعد الشراء", link: "/ServiceDetail/2" },
        { title: "العناية أثناء غيابك", link: "/ServiceDetail/3" },
        { title: "تنسيق الحدائق", link: "/ServiceDetail/4" },
        { title: "تنسيق الهدايا", link: "/ServiceDetail/5" }
      ]
    },
    { title: "اسأل خبيرًا", link: "/Asking#ask-expert" },
    { title: "محفوظاتي", link: "/Save", isProtected: true },
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
        <div className="menu-header-utils">
          <div className="menu-util-icon" onClick={() => requireAuth(() => console.log('Profile'))}>
            {user?.Photo ? (
              <img src={user.Photo} alt="Profile" className="menu-avatar" />
            ) : (
              <UserCircle size="24" color="#082F19" weight="thin" />
            )}
          </div>
          <div className="menu-util-icon cartIconWrapper" onClick={() => { closeMenu(); openCart(); }}>
            <ShoppingCartSimple size="24" color="#082F19" weight="thin" />
            {cartItems.length > 0 && (
              <span className="cartBadge">{cartItems.length}</span>
            )}
          </div>
        </div>
        <div className="menu-header-actions">
           <button> <img src={search} alt="search" /> </button>
           <button onClick={closeMenu}> <img src={close} alt="close" /> </button>
        </div>
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
              <a 
                href={item.isProtected ? "#" : item.link} 
                onClick={(e) => {
                  e.preventDefault();
                  const action = () => {
                    closeMenu();
                    navigate(item.link);
                  };
                  if (item.isProtected) {
                    requireAuth(action);
                  } else {
                    action();
                  }
                }} 
                className="menu-title"
              >
                {item.title}
              </a>
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