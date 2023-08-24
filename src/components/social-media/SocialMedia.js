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
                <button className='red-button'>ENVIAR MENSAJE</button>
            </div>
        </div>
            <Divisors text= "SEGUINOS EN LAS REDES"/>
              <div className="socialMediaIcons">
                <a href=""><FontAwesomeIcon className="iconInstagramSocialMedia" icon={faInstagram} /></a>
                <a href=""><FontAwesomeIcon className="iconFacebookSocialMedia" icon={faFacebook} /></a>
                <a href=""><FontAwesomeIcon className="iconTwitterSocialMedia" icon={faTwitter} /></a>
              </div>
            <Triangle/>
            

    </>
  )
}

export default SocialMedia