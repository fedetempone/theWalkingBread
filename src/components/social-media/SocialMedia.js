import './socialMedia.css'
import Divisors from '../divisors/Divisors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faFacebook , faTwitter} from '@fortawesome/fontawesome-free-brands';
import Triangle from '../triangle/Triangle';

function SocialMedia() {
  return (
    <>
        <div className="socialMediaContainer">        
            <div className="whatsappMessage">
                <FontAwesomeIcon className="iconWhatsappSocialMedia" icon={faWhatsapp} />   
                <p>TU CONSULTA NO MOLESTA</p>
                <a href="https://wa.me/1130607355?text=Me%20gustaría%20hacerte%20un%20pedido%20"><button className='red-button'>ENVIAR MENSAJE</button></a>
            </div>
        </div>
            <Divisors text= "SEGUINOS EN LAS REDES"/>
              <div className="socialMediaIcons">
                <a href="https://instagram.com"><FontAwesomeIcon className="iconInstagramSocialMedia" icon={faInstagram} /></a>
                <a href="https://facebook.com"><FontAwesomeIcon className="iconFacebookSocialMedia" icon={faFacebook} /></a>
                <a href="https://twitter.com"><FontAwesomeIcon className="iconTwitterSocialMedia" icon={faTwitter} /></a>
              </div>
            <Triangle/>
            

    </>
  )
}

export default SocialMedia