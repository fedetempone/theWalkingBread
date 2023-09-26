import './newsletter.css'
function Newsletter() {
  return (
    <>
        <div className="newsletterContainer">
          <p>Inscribite para recibir descuentos <br/> y enterarte de nuestras ofertas !</p>
          <form action="">
            <input htmlFor='username' type="text" id="FormControlInput1" name="username" placeholder="Tu Nombre" className="field" autoComplete='username' required />
            <input type="email" id="FormControlInput2" name="email" placeholder="Tu Email" className="field"  autoComplete='on' required/>
            <input type="submit" name="send" value="INSCRIBIRSE" className="send-button red-button"/>
          </form>
        </div>
    </>
  )
}

export default Newsletter