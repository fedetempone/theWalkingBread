import './productDetail.css';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import firestoreInstance from 'firebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';
import ZoomImg from 'components/handleMouseLeave/ZoomImg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Divisors from 'components/divisors/Divisors';
import { faWhatsapp, faInstagram, faFacebook, faTwitter, faCcVisa, faCcMastercard, faCcAmex } from '@fortawesome/fontawesome-free-brands';
import RelatedProducts from '../relatedProducts/RelatedProducts';
import SocialMedia from 'components/social-media/SocialMedia';

// recibo como parametros el addproducttocart y el setiscartempty  desde app.js 
// para manejar el estado del carrito.

function ProductDetail({ addProductToCart, setIsCartEmpty }) {
  // con use params voy a obtener el parametro de la ruta actual (url)
  // por ejemplo la ruta es la siguiente: www.paginaweb.com/productos/sandwiches/24%20triples%20tradicionales
  // en este ejemplo cada % significa un espacio. Pero resumidamente 
  // collectionName tomaria como valor "sandwiches" y luego 
  // productName tomaria como valor "24%20triples%20tradicionales"
  const { collectionName, productName } = useParams();

  // ahora en esta linea decodificamos la url para quitar esos espacios en blanco
  // o caracteres especiales si los hubiera. Y le pasamos como parametro productName
  // entonces ahora productName tomaria como valor "24 triples tradicionales"
  const decodedProductName = decodeURIComponent(productName);

  const fetchProductDetails = async () => {
    try {
      // aca obtento la referencia a una coleccion especifica de firestore, en este caso
      // seria collectionName (sabemos que collectionName va a tener el valor 
      // de lo que collectionName traiga a traves de la ruta, que en este caso sabemos q puede ser
      // "sandwiches", "pasteleria" o "panaderia" y estas eequivalen a las 3 colecciones
      // que tenemos en la base de datos. Luego guarda esta referencia en currentCollectionRef
      const currentCollectionRef = collection(firestoreInstance, collectionName);
      // una vez que encuentra la coleccion busca a traves de una consulta
      // un producto especifico cuyo nombre coincida con "decodProductName" que tambien lo 
      // obtuvimos del parametro de la url y lo decodificamos, una vez lo encuentra almacena
      // esta consulta en producQuery.
      const productQuery = query(
        currentCollectionRef,
        where('name', '==', decodedProductName)
      );
      // una vez almacenada la consulta obtenemos una instantanea (a traves de otra consulta)
      // de los resultados, entonces productSnaphot almacenara los documentos que cumplen
      // con la condicion de la consulta.
      const productSnapshot = await getDocs(productQuery);
      
      // aca verificamos que la snapshot haya encontrado documentos coincidentes con la consulta
      // si se encontraron entonces obtenemos todos los detalles del primer documento encontrado
      if (!productSnapshot.empty) {
        // obtengo el primer documento encontrado en la snapshot(en este caso el unico)
        const productDoc = productSnapshot.docs[0];
        // accedo a los datos del documento, generalmente seria un un objeto que contiene los 
        // detalles del producto y lo guardo en productData
        const productData = productDoc.data();

        //posteriormente guardo los detalles del producto en localstorage
        localStorage.setItem(
          `productDetails-${decodedProductName}`,
          JSON.stringify(productData)
        );

        // y si hice la consulta a la base de datos es porque los productos no estaban en localstorage
        // entonces muestro los productos obtenidos a traves de productData
        console.log('Muestro los productos traidos de la base de datos: ', productData);
        setProductDetails(productData);

        // y aca hago una nueva consulta tratando de traer todos los productos dentro de la misma
        // coleccion (currentCollectionRef) que no coinciden con el nombre que trae decodedProductName.
        const relatedProductsQuery = query(
          currentCollectionRef,
          where('name', '!=', decodedProductName)
        );
        const relatedProductsSnapshot = await getDocs(relatedProductsQuery);

        // finalizada la consulta y almacenada en relatedProductsSnapshot lo que hago es
        // mapear relatedproductsnapshot y lo guardo en un nuevo array llamado relatedProductsData 
        // en donde este ultimo va a poseer en cada uno de sus objetos  2 propiedades: id y data
        // donde id es el numero identificador del documento y data que representa
        // los datos reales del documento ( es decir los campos del documento en firestore)
        
        const relatedProductsData = relatedProductsSnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        // muestro los productos relacionados a traves de relatedProductsData
        setRelatedProducts(relatedProductsData);
      } else {
        // si no encuentro el producto muestro el error
        console.error('Producto no encontrado:', decodedProductName);
      }
    } catch (error) {
      // catcheo el error y lo muestro
      console.error('Error al obtener los detalles del producto:', error);
    }
  };

  const [productQuantities, setProductQuantities] = useState(1);
  const [productDetails, setProductDetails] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // recupero los detalles de los productos desde el localstorage y los almaceno en
    // un archivo json dentro de cachedProductDetails
    const cachedProductDetails = localStorage.getItem(
      // le asigno una key unica a cada producto productDetails es
      // solo una etiqueta que utilizo para identificar un valor especifico
      `productDetails-${decodedProductName}`
    );
    console.log('Muestro detalles del producto desde localStorage: ', cachedProductDetails);

    if (cachedProductDetails) {
      // si encontre productos en cachedProductDetails(localstorage) entonces los parseo
      // y luego los guardo en setProductDetails para mostrarlos
      setProductDetails(JSON.parse(cachedProductDetails));
      // actualizo el loadgin a false para que deje de mostrar el mensaje de cargando datos
      setLoading(false);
    } else {
      // si no encuentro los productos en localstorage entonces ejecuto fetchproductdetails
      // para hacer la consulta y obtener los productos de la base de datos. posteriormente
      // cuando se resuelve la promesa actualizo el estado a false para que deje de mostrar 
      // el cargando datos
      fetchProductDetails().then(() => setLoading(false));
    }// si collectionName o decodedProductName cambia, se vuelve a ejecutar el useEffect 
     // para mostrar otro producto con sus respectivos detalles
  }, [collectionName, decodedProductName]);

  const handleAddToCart = () => {
    // agrego el producto al carrito pasandole un objeto que lo representa
    addProductToCart({
      id: productDetails.id,
      name: productDetails.name,
      price: productDetails.price,
      img: productDetails.img,
      quantity: productQuantities,
    });

    // incremento la cantidad en el estado local
    setProductQuantities(productQuantities + 1);
    // despues de agregar un producto, me fijo si el carrito esta vacio
    setIsCartEmpty(false);
    // addedtocart en true para mostrar el cartel con el msje
    setAddedToCart(true);
    // despues de 2 segundos deja de mostrar el cartel
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  // cuando el usuario clickea el boton ver medios de pago ejecuto la
  // funcion togglePayment para mostrar un mensaje de 4 segundos
  // con los medios de pago disponibles.
  const togglePayment = (e) => {
    e.preventDefault();
    setShowPayment(!showPayment);
    if (!showPayment) {
      setTimeout(() => {
        setShowPayment(false);
      }, 4000);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <div className="chargingData"></div>
          <p>Cargando Datos</p>
        </div>
      ) : (
        <>
        {/* renderiza los datos del producto una vez que la promesa se haya resuelto. */}
          <ul className='ul-routes'>
            <Link to='/'>
              <li className='li-hoverable'>Inicio</li>
            </Link>
            <p>&gt;</p>
            <Link to={`/${collectionName}`}>
              <li className='li-hoverable'>{collectionName}</li>
            </Link>
            <p>&gt;</p>
            <li className='li-current'>{productDetails.name}</li>
          </ul>
          <div className='product-detail-container'>
            <div className='product-detail-img-content'>
              <a href={productDetails.img}>
                <ZoomImg src={productDetails.img} propName='zoomimg'></ZoomImg>
              </a>
            </div>
            <div className='product-detail-info'>
              <h5>{productDetails.name}</h5>
              <p className='priceInfo'>${productDetails.price}</p>
              <a className='payment-options' href='#' onClick={togglePayment}>
                {showPayment ? 'Ocultar Medios de Pago' : 'Ver Medios de Pago'}
              </a>
              {showPayment && (
                <div className="payment-container">
                  <h2>Medios de Pago</h2>
                  <div className="payment-icons">
                    <FontAwesomeIcon icon={faCcVisa} />
                    <FontAwesomeIcon icon={faCcMastercard} />
                    <FontAwesomeIcon icon={faCcAmex} />
                  </div>
                  <div className="payment-options">
                    <p>1 cuota sin interés</p>
                    <p>Otros Bancos: 3 cuotas con interés</p>
                  </div>
                </div>
              )}
              <hr className='hr-products-detail' />
              <button className='button-add-to-cart' onClick={handleAddToCart}>
                AÑADIR AL CARRITO
              </button>
              {addedToCart && (
                <div className='added-to-cart-message'>
                  PRODUCTO AÑADIDO CON ÉXITO
                </div>
              )}
              <Link to='/cart'>
                <button className='button-see-cart'>VER CARRITO</button>
              </Link>
              <br />
              <a href="https://wa.me/1130607355?text=Me%20gustaría%20hacerte%20un%20pedido%20" className='anchor-wp-icon-product-detail'>
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  className='product-details-whatsapp-icon'
                />
                <p>Consulta stock antes de pedir !</p>
              </a>
              <p className='text-box'>
                Escribinos por WhatsApp y preguntanos sobre stock, envíos o lo que
                necesites. Recordá que la Pastelería debe pedirse con 48 hs. de
                anticipación.
              </p>
              <p>COMPARTIR:</p>
              <a href='https://instagram.com'>
                <FontAwesomeIcon
                  className='product-detail-social-media-icons'
                  icon={faInstagram}
                />
              </a>
              <a href='https://facebook.com'>
                <FontAwesomeIcon
                  className='product-detail-social-media-icons'
                  icon={faFacebook}
                />
              </a>
              <a href='https://twitter.com'>
                <FontAwesomeIcon
                  className='product-detail-social-media-icons'
                  icon={faTwitter}
                />
              </a>
            </div>
          </div>
          <div className='product-detail-description'>
            <p>{productDetails.description}</p>
          </div>
          <Divisors text='PRODUCTOS RELACIONADOS'></Divisors>
          <RelatedProducts excludeProduct={productDetails} />
          <div className='socialMediaContainerImport'>
            <SocialMedia />
          </div>
        </>
      )}
    </div>
  );
}
export default ProductDetail;
