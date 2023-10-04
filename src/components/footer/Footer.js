import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import img_logo from '../../images/donaazombiee-black.jpg';
import './footer.css';

function Footer() {
  const location = useLocation();

  return (
    <footer className='clearfix'>
      <nav className="navFooter">
        <div className="navLinksFooter">
          <ul>
            <li>
              <Link to={location.pathname === '/about' ? '/' : '/about'}>
                {location.pathname === '/about' ? 'Home' : 'About Us'}
              </Link>
            </li>
            <li>
              <a href="https://drive.google.com/file/d/1BiQmkwr3ZuW_Ice4fHbfElLnxDYaMx6D/view?usp=sharing">
                Quality Politics
              </a>
            </li>
            <li>
              <a href="https://drive.google.com/file/d/1b9CPbSH5T121HJAxQUFJosyrPEVuMBpB/view?usp=sharing">
                Terms and Conditions
              </a>
            </li>
            <li>
              <Link to={location.pathname === '/contact' ? '/' : '/contact'}>
                {location.pathname === '/contact' ? 'Home' : 'Contact'}
              </Link>
            </li>
          </ul>
        </div>
        <div className="logoFooter">
          <img src={img_logo} alt="" />
        </div>
      </nav>
      <p>All Rights reserved 2023 - Federico Tempone &copy;</p>
    </footer>
  );
}

export default Footer;


// import './footer.css'
// import img_logo from '../../images/navlogo.png'

// function Footer() {
//   return (
//     <>
//      <footer className='clearfix'>
//         <nav className="navFooter">
//             <div className="navLinksFooter">
//                 <ul>
//                     <li><a href="/#/about">ABOUT US</a></li>
//                     <li><a href="https://drive.google.com/file/d/1BiQmkwr3ZuW_Ice4fHbfElLnxDYaMx6D/view?usp=sharing">QUALITY POLITICS</a></li>
//                     <li><a href="https://drive.google.com/file/d/1b9CPbSH5T121HJAxQUFJosyrPEVuMBpB/view?usp=sharing">TERMINOS Y CONDICIONES</a></li>
//                     <li><a href="/#/contact">CONTACT</a></li>
//                 </ul>
//             </div>
//             <div className="logoFooter">
//                 <img src={img_logo} alt=""/>
//             </div>
//         </nav>
//         <p>All Rights reserved 2023 - Federico Tempone &copy;</p>
//     </footer>
//     </>
//   )
// }

// export default Footer