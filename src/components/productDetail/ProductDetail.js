import './productDetail.css';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import firestoreInstance from 'firebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';
import ZoomImg from 'components/handleMouseLeave/ZoomImg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Divisors from 'components/divisors/Divisors';
import { faWhatsapp, faInstagram, faFacebook, faTwitter } from '@fortawesome/fontawesome-free-brands';
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
    // Agrego el producto al carrito pasando un objeto que lo representa
    addProductToCart({
      id: productDetails.id,
      name: productDetails.name,
      price: productDetails.price,
      img: productDetails.img,
      quantity: productQuantities,
    });

    // incremento la cantidad en el estado local
    setProductQuantities(productQuantities + 1);
    // despues de agregar un producto, me fijo si el carrito está vacío
    setIsCartEmpty(false);
    // Establece addedToCart en true para mostrar el mensaje
    setAddedToCart(true);

    // Después de un tiempo, establece addedToCart en false para ocultar el mensaje
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000); // Cambia el valor a tu preferencia
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
          <a className='payment-options' href=''>
            Ver medios de pago
          </a>
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
          <a href='' className='anchor-wp-icon-product-detail'>
            <FontAwesomeIcon
              icon={faWhatsapp}
              className='product-details-whatsapp-icon'
            />{' '}
            <p>Consulta stock antes de pedir !</p>
          </a>
          <p className='text-box'>
            Escribinos por WhatsApp y preguntanos sobre stock, envíos o lo que
            necesites. Recordá que la Pastelería debe pedirse con 48 hs. de
            anticipación.
          </p>
          <p>COMPARTIR:</p>
          <a href=''>
            <FontAwesomeIcon
              className='product-detail-social-media-icons'
              icon={faInstagram}
            />
          </a>
          <a href=''>
            <FontAwesomeIcon
              className='product-detail-social-media-icons'
              icon={faFacebook}
            />
          </a>
          <a href=''>
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