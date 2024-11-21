import React from 'react';
import Logo from './ui/Logo';
import Icon from './ui/Icon';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="IconContainer">
        <Icon height={80} width={80} />
      </div>
      <div className="LogoContainer">
        <Logo height={30} width={100} />
      </div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
