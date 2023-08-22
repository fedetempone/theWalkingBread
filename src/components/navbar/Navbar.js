import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import img_logo from '../images/navlogo.png';
import icon_cart from '../images/icon_shopping_cart.svg';
import './navbar.css';
import Toggle_menu from '../menu toggle/Toggle_menu';
import { useState } from 'react';

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };

  const location = useLocation();
  const isContactPage = location.pathname === '/contact';
  const isProductsPage = location.pathname === '/products';
  const isHomePage = location.pathname === '/';
  const isAboutUsPage = location.pathname === '/about';

  return (
    <>
      <div className="whatsapp-button">
        <a href="https://wa.me/1130607355?text=Me%20gustaría%20hacerte%20un%20pedido%20" className="whatsapp" target="_blank">
          <i className="fa fa-whatsapp whatsapp-icon"></i>
        </a>
      </div>

      <header className="topheader clearfix">
        <nav className="topnav">
          <img className="imgLogo" src={img_logo} alt="imagen logo" />
          <ul className={`menu ${clicked ? 'active' : ''}`}>
            {!isContactPage && !isAboutUsPage && (
              <li>
                <Link to="/about">About Us</Link>
              </li>
            )}
            {!isProductsPage && !isHomePage && (
              <li>
                <Link to="/">Home</Link>
              </li>
            )}
            
            {!isProductsPage ? (
              <li>
                <Link to="/products">Products</Link>
              </li>
            ): <li>
                <Link to="/">Home</Link>
              </li>}

            {!isContactPage && (
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            )}
            {isContactPage && (
              <li>
                <Link to="/about">About Us</Link>
              </li>
            )}
            <li className="navbar-shopping-cart">
              <Link to="/cart">
                <img className="imgCart" src={icon_cart} alt="shopping cart" />
              </Link>
              <div>0</div>
            </li>
            
          </ul>
          <div className="togglemenu_container">
            <Toggle_menu clicked={clicked} handleClick={handleClick} />
          </div>
        </nav>
        <div className={`menu-active ${clicked ? 'active' : ''}`}></div>
      </header>
    </>
  );
}

export default Navbar;
