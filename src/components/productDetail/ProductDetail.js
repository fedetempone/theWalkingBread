




// este codigo funciona pero carga los productos muchas veces en la consola lo tengo que modificar !!!!






import './productDetail.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firestoreInstance from 'firebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import ZoomImg from 'components/handleMouseLeave/ZoomImg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Divisors from 'components/divisors/Divisors';
import { faWhatsapp, faInstagram, faFacebook, faTwitter } from '@fortawesome/fontawesome-free-brands';
import RelatedProducts from '../relatedProducts/RelatedProducts';
import SocialMedia from 'components/social-media/SocialMedia';
import LoadingFiles from 'components/loadingFiles/LoadingFiles';
import { useCart } from 'components/cartProvider/CartProvider';

function ProductDetail() {
  const { collectionName, productName } = useParams();
  const decodedProductName = decodeURIComponent(productName);
  const { addProductToCart } = useCart();

  const fetchProductDetails = async () => {
    try {
      const currentCollectionRef = collection(firestoreInstance, collectionName);
      const productQuery = query(currentCollectionRef, where('name', '==', decodedProductName));
      const productSnapshot = await getDocs(productQuery);

      if (!productSnapshot.empty) {
        const productDoc = productSnapshot.docs[0];
        const productData = productDoc.data();

        localStorage.setItem(`productDetails-${decodedProductName}`, JSON.stringify(productData));
        console.log('Detalles del producto guardados en localStorage:', productData);
        setProductDetails(productData);

        const relatedProductsQuery = query(currentCollectionRef, where('name', '!=', decodedProductName));
        const relatedProductsSnapshot = await getDocs(relatedProductsQuery);

        const relatedProductsData = relatedProductsSnapshot.docs.map(doc => ({
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

  const [productQuantities, setProductQuantities] = useState({});
  const [productDetails, setProductDetails] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const cachedProductDetails = localStorage.getItem(`productDetails-${decodedProductName}`);
    console.log('Detalles del producto recuperados desde localStorage:', cachedProductDetails);
    if (cachedProductDetails) {
      setProductDetails(JSON.parse(cachedProductDetails));
    } else {
      fetchProductDetails();
    }
  }, [collectionName, decodedProductName]);

  const handleAddToCart = (product) => {
    addProductToCart(product);
    const updatedQuantities = { ...productQuantities };
    updatedQuantities[product.id] = (updatedQuantities[product.id] || 0) + 1;
    setProductQuantities(updatedQuantities);
  };

  return (
      <LoadingFiles promise={fetchProductDetails}>
        <>
          <ul className='ul-routes'>
            <Link to="/">
              <li className='li-hoverable'>Inicio</li>
            </Link>
            <p>&gt;</p>
            <Link to={`/${collectionName}`}>
              <li className='li-hoverable'>{collectionName}</li>
            </Link>
            <p>&gt;</p>
            <li className='li-current'>{productDetails.name}</li>
          </ul>
          <div className="product-detail-container">
            <div className="product-detail-img-content">
              <a href="">
                <ZoomImg src={productDetails.img} propName="zoomimg"></ZoomImg>
              </a>
            </div>
            <div className="product-detail-info">
              <h5>{productDetails.name}</h5>
              <p className='priceInfo'>${productDetails.price}</p>
              <a className='payment-options' href="">Ver medios de pago</a>
              <hr className='hr-products-detail' />
              <button className='button-add-to-cart' onClick={() => handleAddToCart(productDetails)}>AÑADIR AL CARRITO</button>
              <Link to="/cart"><button className='button-see-cart'>VER CARRITO</button></Link>
              {/* <input type="submit" className='button-add-to-cart' value="AGREGAR AL CARRITO" /> */}
              <br />
              <a href="" className='anchor-wp-icon-product-detail'>
                <FontAwesomeIcon icon={faWhatsapp} className="product-details-whatsapp-icon" /> <p>Consulta stock antes de pedir !</p>
              </a>
              <p className='text-box'>Escribinos por whatsapp y preguntanos sobre stock, envíos o lo que necesites. Recordá que la Pastelería debe pedirse con 48 hs. de anticipación.</p>
              <p>COMPARTIR:</p>
              <a href=""><FontAwesomeIcon className="product-detail-social-media-icons" icon={faInstagram} /></a>
              <a href=""><FontAwesomeIcon className="product-detail-social-media-icons" icon={faFacebook} /></a>
              <a href=""><FontAwesomeIcon className="product-detail-social-media-icons" icon={faTwitter} /></a>
            </div>
          </div>
          <div className="product-detail-description">
            <p>{productDetails.description}</p>
          </div>
          <Divisors text="PRODUCTOS RELACIONADOS"></Divisors>
          <RelatedProducts excludeProduct={productDetails} />
          <div className="socialMediaContainerImport">
            <SocialMedia />
          </div>
        </>
      </LoadingFiles>
  );
}

export default ProductDetail;

