import React, { Component } from 'react';
import './Nav.css';
import logo from "../Assets/Icons/logo.svg"
import burger from "../Assets/Icons/burgerMenu.svg"
const Nav = () => {
    return ( <>
    
    <nav>
        <header>
          <img src={logo} alt="" />
          <img src={burger} alt="" />
        </header>



    </nav>

    
    </> );
}
 
export default Nav;