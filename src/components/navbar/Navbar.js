import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import img_logo from '../../images/donaazombiee-black.jpg';
import icon_cart from '../../images/icon_shopping_cart.svg';
import './navbar.css';
import Toggle_menu from '../menu toggle/Toggle_menu';
import { useState } from 'react';


// primero clicked esta en false para que quede cerrado
// luego cuando lo clickeo (el click lo detecto desde el togglemenu)
// se le agrega la clase open y se muestra abierto.

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };

  const location = useLocation();
  const isContactPage = location.pathname === '/contact';
  const isProductsPage = location.pathname === '/productos';
  const isHomePage = location.pathname === '/';
  const isAboutUsPage = location.pathname === '/about';

  // con uselocation (location.pathname) obtengo la ubicacion actual de la pagina

  return (
    <>
    {/* boton de whatsapp deberia haberlo puesto en otro componente pero me dio fiaca*/}
      <div className="whatsapp-button">
        <a href="https://wa.me/1130607355?text=Me%20gustaría%20hacerte%20un%20pedido%20" className="whatsapp" target="_blank">
          <i className="fa fa-whatsapp whatsapp-icon"></i>
        </a>
      </div>
      <header className="topheader clearfix">
        <nav className="topnav">
          <img className="imgLogo" src={img_logo} alt="imagen logo" />
          {/* si clicked es true al ul le pongo la clase active (quedaria menu active) 
              es decir que si clickeo el menuhamburguesa al ul se le agrega la clase active
              y muestra el menu. si no lo clickeo no pasa nada.
          */}
          <ul className={`menu ${clicked ? 'active' : ''}`}>
            {/* Bueno a partir de aca hago comprobaciones para que no hay reduncancias en la navegacion */}
            {!isContactPage && !isAboutUsPage && (
              // aca estoy haciendo lo siguiente
              // la locacion actual es contactpage ? y la locacion actual es aboutuspage ? 
              // entonces si las 2 son verdaderas muestro about us porque quiere decir
              // que no estoy en la pagina de about us no puedo mostrar el link about us
              // en teoria contactpage tampoco se deberia mostrar pero mas abajo le estoy diciendo
              // que si lo muestre. 

              <li>
                <Link to="/about" onClick={() =>setClicked(false)}>About Us</Link>
                {/* establezco el setclicked en false porque cuando hago un click en uno de los links 
                    que estan en el menu desplegable entonces este menu se tiene que cerrar.
                    si pusiiera el setclicked en true o no lo setearia entonces el menu queda abierto.
                */}
              </li>
            )}
            {!isProductsPage && !isHomePage && ( 
              // si no estoy en la pagina de productos y no estoy en la pagina de inicio (home)
              // entonces si ambas son correcta muestro el link home
              <li>
                <Link to="/" onClick={() =>setClicked(false)}>Home</Link>
                  {/* establezco el setclicked en false porque cuando hago un click en uno de los links 
                    que estan en el menu desplegable entonces este menu se tiene que cerrar.
                    si pusiiera el setclicked en true o no lo setearia entonces el menu queda abierto.
                */}
              </li>
            )}
            
            {!isProductsPage ? (
              <li>
                <Link to="/productos" onClick={() =>setClicked(false)}>Products</Link>
              </li>
            ): <li>
                <Link to="/" onClick={() =>setClicked(false)}>Home</Link>
              </li>}

            {!isContactPage && (
              <li>
                <Link to="/contact" onClick={() =>setClicked(false)}>Contact</Link>
              </li>
            )}
            {isContactPage && (
              <li>
                <Link to="/about" onClick={() =>setClicked(false)}>About Us</Link>
              </li>
            )}
            <li className="navbar-shopping-cart">
              <Link to="/cart" onClick={() =>setClicked(false)}>
                <img className="imgCart" src={icon_cart} alt="shopping cart" />
              </Link>
              {/* <div>{cartItemCount}</div> */}
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
