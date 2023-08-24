import cupcakes from '../images/cupcakes2.jpg'
import Divisors from '../divisors/Divisors';
import '../customize/customize.css'

function Customize() {
  return (
    <>  
        <div className="budget">
            <img src={cupcakes} alt="" />
            <div className="module-text">
            <h3>PRESUPUESTOS EN EL ACTO</h3>
            <p>Te asesoramos y armamos los pedidos a tu medida !</p>
            <a href=""><button className='red-button'>CUSTOMIZE</button></a>
            </div>
        </div>
    </>
  )
}

export default Customize;