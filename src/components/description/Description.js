import React from 'react';
import { Link } from 'react-router-dom';
import img_panaderia from '../images/panaderia.jpg';
import img_pasteleria from '../images/pasteleria.jpg';
import img_sandwich from '../images/sandwich.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/fontawesome-free-solid';
import { faWhatsapp } from '@fortawesome/fontawesome-free-brands';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css'; 
import Customize from '../customize/Customize';
import '../description/description.css';

function Description() {
  return (
    <>
      <div className="containerServices">
        <div className="services services-border">
          <div className='servicesDescription'>
            <FontAwesomeIcon icon={faWhatsapp} /> 
            <span style={{ marginLeft: '10px' }}>HACE TU PEDIDO</span>
            <div className="servicesLine"></div>
          </div>
          <p className='servicesDescriptionSchedule'>Horario de atención de 7 a 21 hs.</p>
        </div>
        <div className="services cardServices services-border">
          <div className="servicesDescription">
            <FontAwesomeIcon icon={faCreditCard} />
            <div className="servicesLine"></div>
            <span style={{ marginLeft: '10px' }}>PAGA CON TARJETA</span>
          </div>
          <p className='servicesDescriptionSchedule'>Tarjeta de crédito, débito, efectivo o MercadoPago.</p>
        </div>
        <div className="services orderServices">
          <div className='servicesDescription'>
            <FontAwesomeIcon icon={faShoppingBag} />
            <span style={{ marginLeft: '10px' }}>TAKE AWAY</span>
          </div>
          <p className='servicesDescriptionSchedule'>Consultá los métodos de entrega disponibles según sucursal!</p>
        </div>
      </div>
      <div className="containerDescription">
        <Link to="/sandwich" className='anchorSandwiches'>
          <div className="containerImgDescription">
            <img src={img_sandwich} alt="Imagen descriptiva sandwiches" />
            <div className="text-overlay">
              <div className="textShape"></div>
              <p>SANDWICHES DE MIGA</p>
            </div>
          </div>
        </Link>
        <Link to="/panaderia" className='anchorPanaderia'>
          <div className="containerImgDescription">
            <img src={img_panaderia} alt="Imagen descriptiva panaderia" />
            <div className="text-overlay">
              <div className="textShape"></div>
              <p>PANADERIA</p>
            </div>
          </div>
        </Link>
        <Link to="/pasteleria" className='anchorPasteleria'>
          <div className="containerImgDescription">
            <img src={img_pasteleria} alt="Imagen descriptiva pasteleria" />
            <div className="text-overlay">
              <div className="textShape"></div>
              <p>PASTELERIA</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Description;