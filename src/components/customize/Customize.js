import cupcakes from '../../images/cupcakes2.jpg'
import '../customize/customize.css'

function Customize() {
  return (
    <>
      <div className="budget">
        <img src={cupcakes} alt="" />
        <div className="module-text">
          <h3>PRESUPUESTOS EN EL ACTO</h3>
          <p>Te asesoramos y armamos los pedidos a tu medida !</p>
          <a href="#contact"><button className='red-button'>CUSTOMIZE</button></a>
        </div>
      </div>
    </>
  )
}

export default Customize;