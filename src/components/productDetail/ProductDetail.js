import './productDetail.css';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import firestoreInstance from 'firebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';
import ZoomImg from 'components/handleMouseLeave/ZoomImg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Divisors from 'components/divisors/Divisors';
import { faWhatsapp, faInstagram, faFacebook, faTwitter ,faCcVisa, faCcMastercard, faCcAmex} from '@fortawesome/fontawesome-free-brands';
import RelatedProducts from '../relatedProducts/RelatedProducts';
import SocialMedia from 'components/social-media/SocialMedia';

function ProductDetail({ addProductToCart, setIsCartEmpty }) {
  const { collectionName, productName } = useParams();
  const decodedProductName = decodeURIComponent(productName);

  const fetchProductDetails = async () => {
    try {
      const currentCollectionRef = collection(firestoreInstance, collectionName);
      const productQuery = query(
        currentCollectionRef,
        where('name', '==', decodedProductName)
      );
      const productSnapshot = await getDocs(productQuery);

      if (!productSnapshot.empty) {
        const productDoc = productSnapshot.docs[0];
        const productData = productDoc.data();

        localStorage.setItem(
          `productDetails-${decodedProductName}`,
          JSON.stringify(productData)
        );

        console.log('Muestro los productos traidos de la base de datos: ', productData);
        setProductDetails(productData);

        const relatedProductsQuery = query(
          currentCollectionRef,
          where('name', '!=', decodedProductName)
        );
        const relatedProductsSnapshot = await getDocs(relatedProductsQuery);

        const relatedProductsData = relatedProductsSnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        setRelatedProducts(relatedProductsData);
      } else {
        console.error('Producto no encontrado:', decodedProductName);
      }
    } catch (error) {
      console.error('Error al obtener los detalles del producto:', error);
    }
  };

  const [productQuantities, setProductQuantities] = useState(1);
  const [productDetails, setProductDetails] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);


  useEffect(() => {
    const cachedProductDetails = localStorage.getItem(
      `productDetails-${decodedProductName}`
    );
    console.log('Muestro detalles del producto desde localStorage: ', cachedProductDetails);
    if (cachedProductDetails) {
      setProductDetails(JSON.parse(cachedProductDetails));
    } else {
      fetchProductDetails();
    }
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
    <>
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
          <a href=''>
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
  );
}

export default ProductDetail;