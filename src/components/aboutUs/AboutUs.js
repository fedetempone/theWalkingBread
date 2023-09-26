import '../aboutUs/aboutUs.css'
import panaderiaImg from '../../images/medialunas.jpg';
import ScrollToImage from '../ScrollToImage/ScrollToImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css'; 
import { faWhatsapp, faInstagram, faFacebook , faTwitter} from '@fortawesome/fontawesome-free-brands';
import { Link } from 'react-router-dom';
import donaZombie from '../../images/donaazombiee.jpg'


function AboutUs() {
  return (
    <>    
      <div className="aboutUsContainer">
        <div className="titleAbout">
          <h4 className="title">Sobre la Panaderia</h4>
          <div className="underline"></div>
        </div>

        <section className="panaderiaContent">
          <div className="image">
            <img src={panaderiaImg} alt="Imagen de la panaderia" />
          </div>
          <div className="text">
            <h4 className='zombieTextCorrection'>NUESTRA EMPRESA</h4>
            <div className='descriptionAbout'>
              En el corazón de nuestra comunidad, donde los sueños de pan recién horneado se mezclan con una fascinante obsesión por lo macabro, nace "TheWalkingBread". Fundada en los oscuros días del año 20XX, nuestra panadería se ha convertido en un lugar icónico donde los sabores y la creatividad se fusionan en un mundo completamente único.<br />

              <p className='zombieTextCorrection'>Los Inicios</p>

              <p>Nuestra historia comenzó cuando un grupo de amigos amantes del pan, apasionados por las películas de zombis y los cómics de terror, decidió que era hora de llevar su obsesión por lo macabro al mundo de la panadería. En un pequeño rincón de la ciudad, con hornos humeantes y una visión audaz, nació "TheWalkingBread".</p>

              <p className='zombieTextCorrection'>La Tematica Unica</p>

              <p>Desde el principio, nuestra misión ha sido simple pero audaz: crear productos deliciosos con un toque zombi. Nos inspiramos en el arte, la cultura pop y la imaginación ilimitada de los apocalipsis zombis para dar vida a nuestros productos. Desde panes con forma de cerebro hasta galletas en forma de zombi, cada elemento de nuestro menú está diseñado para llevar a nuestros clientes a un mundo de sabor y diversión única.</p>

              <p className='enjoyAbout'>¡Come, disfruta y prepárate para el apocalipsis zombi... con un toque de sabor!</p>
            </div>
          </div>
        </section>

        <section className="panaderiaContent">
          <div className="FinalTextAbout ">
            <p className='zombieTextCorrection'>Trabajamos continuamente con nuestros clientes, y juntos creamos grandes cosas logrando resultados positivos y una plena satisfaccion.</p>
          </div>
        </section>
        <ScrollToImage />
        <section className='mediaAboutContent'>
          <div className="mediaContainer">
            <div className="FirstResponsiveContainerAbout">
              <div className="mediaAboutDescription">
                <div className="iconMedia">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className='textMediaAboutDescription'>
                  <h3>LLAMANOS</h3>
                  <p>11- 3060-7355</p>
                </div>
              </div>
              
              <div className="mediaAboutDescription">
                <div className="iconMedia">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className='textMediaAboutDescription'>
                  <h3>EMAIL</h3>
                  <p>PEDIDOS@THEWALKINGBREAD.COM</p>
                </div>
              </div>
            </div>

            <div className="SecondResponsiveContainerAbout">
              <div className="mediaAboutDescription responsiveHideBorder">
                <div className="iconMedia">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <div className='textMediaAboutDescription'>
                  <h3>VISITANOS</h3>
                  <p>AV. SIEMPRE VIVA 742</p>
                </div>
              </div>

              <div className="mediaAboutDescription" style={{borderRight:'none'}}> 
                <div className="iconMedia">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div className='textMediaAboutDescription'>
                  <h3>HORARIOS</h3>
                  <p>LUN A VIE DE 07:00 A 21:00 hs.</p>
                </div>
              </div>       
            </div>   
          </div>
        </section>
        <hr className='hrCustom'/>

        <section className='aboutFinalContentSocialMedia'>
          <Link to='https://wa.me/1130607355?text=Me%20gustaría%20hacerte%20un%20pedido%20' className='noneStyle'><FontAwesomeIcon icon={faWhatsapp} /></Link>
          <Link to='https://facebook.com' className='noneStyle'><FontAwesomeIcon icon={faFacebook} /></Link>
          <Link to='https://instagram.com' className='noneStyle'><FontAwesomeIcon icon={faInstagram} /></Link>
          <Link to='https://twitter.com' className='noneStyle'><FontAwesomeIcon icon={faTwitter} /></Link>
          <div className="finalContentImg">
            <img src={donaZombie} alt="" />
            <h3>THE WALKING BREAD</h3>
          </div>
        </section>
      </div>
    </>    
  );
}

export default AboutUs