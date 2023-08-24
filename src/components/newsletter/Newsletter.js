import './newsletter.css'
function Newsletter() {
  return (
    <>
        <div className="newsletterContainer">
          <p>Inscribite para recibir descuentos <br/> y enterarte de nuestras ofertas !</p>
          <form action="">
            <input type="text" id="FormControlInput1" name="name" placeholder="Tu Nombre" className="field" required />
            <input type="email" id="FormControlInput2" name="email" placeholder="Tu Email" className="field" required/>
            <input type="submit" name="send" value="INSCRIBIRSE" className="send-button red-button"/>
          </form>
        </div>
    </>
  )
}

export default Newsletter