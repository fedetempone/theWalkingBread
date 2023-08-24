import '../contact/contact.css';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

function Contact() {
    const message = `\n Nuestro horario de atencion es de Lunes a Viernes de 07:00 a 21hs, ante consultas o sugerencias dejanos tu mensaje. Gracias !`;
  return (
    <>  
    <Navbar/>    
        <section id="container-form">
            <div className="info-form">
                <h2>Contactanos</h2>
                <h3>Trabajamos por pedidos. <div className="new-line">{message}</div></h3>
                <a href=""><i className="fa-brands fa-instagram"></i> Seguinos en Instagram</a>
                <a href=""><i className="fa-brands fa-facebook"></i> Seguinos en Facebook </a>
                <a href=""><i className="fa fa-phone"></i> 1130607355</a>
                <a href=""><i className="fa fa-envelope"></i> pedidos@thewalkingbread.com</a>
            </div>

            <form action="">
                <input type="text" id="FormControlInput1" name="name" placeholder="Tu Nombre" className="field" required />
                <input type="email" id="FormControlInput2" name="email" placeholder="Tu Email" className="field" required/>
                <textarea id="FormControlTextarea1" name="mensaje" placeholder="Tu Mensaje..." required></textarea>
                <input type="submit" name="send" value="Enviar Mensaje" className="send-button"/>
            </form>
        </section>
    <Footer/>
    </>
  )
}



export default Contact;