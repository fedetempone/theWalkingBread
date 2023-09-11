import Navbar from '../navbar/Navbar'
import '../products/products.css'
import Footer from '../footer/Footer'

function Products() {
  return (
    <>
      <div className="content">
          <h1>productos</h1>
          <h1>productos</h1>
          {/* <div className="responseContainer">        
            {products.map(product => (
              <div className="products_container">
                <div className="imgContainer">
                  <a href="">
                    <img src={product.img} alt="imagen de sanguche" />
                  </a>
                </div>
                <div className="productForm">
                  <h3>{product.name}</h3>
                  <p>{'$'+ product.price}</p>
                  <a href="">Medios de pago</a>
                  <hr />
                  <button>AGREGAR AL CARRITO</button>
                  <FontAwesomeIcon icon={faWhatsapp} /> No te olvides de consultar stock ! 
                  <p>Contáctanos a través de WhatsApp para consultarnos sobre disponibilidad de productos, opciones de envío y cualquier otra pregunta que tengas. Ten en cuenta que las solicitudes para productos de Pastelería deben realizarse con al menos 48 horas de anticipación.</p>
                  <p>COMPARTIR:</p>
                  <FontAwesomeIcon icon={faWhatsapp} />
                  <FontAwesomeIcon icon={faTwitter} />
                  <FontAwesomeIcon icon={faFacebook} />
                  <FontAwesomeIcon icon={faInstagram} />
                </div>
              </div>
            ))}
        </div> */}
      </div>
    </>
  )
}

export default Products