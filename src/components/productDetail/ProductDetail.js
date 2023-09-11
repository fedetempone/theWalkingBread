import './productDetail.css'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// obtengo la ruta con useParams
import firestoreInstance from 'firebaseConfig'; 
// Importo la instancia de la base de datos que está creada en firebase firestore
// y la estoy trayendo del archivo firebaseConfig que creé con toda la importación
// de la base de datos. Así voy a poder interactuar con ella.
import { collection, getDocs, where, query } from 'firebase/firestore';
// Importo funciones pertenecientes a la librería de firebase llamada firestore
// son necesarias para interactuar con la base de datos.
import { Link } from 'react-router-dom';
import ZoomImg from 'components/handleMouseLeave/ZoomImg';
import Layout from 'components/layout/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Divisors from 'components/divisors/Divisors';
import { faWhatsapp, faInstagram, faFacebook, faTwitter } from '@fortawesome/fontawesome-free-brands';
import RelatedProducts from '../relatedProducts/RelatedProducts'
import SocialMedia from 'components/social-media/SocialMedia';
import LoadingFiles from 'components/loadingFiles/LoadingFiles';

function ProductDetail() {
  const { collectionName, productName } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const decodedProductName = decodeURIComponent(productName);

  const fetchProductDetails = async () => {
    try {
      const currentCollectionRef = collection(firestoreInstance, collectionName);
      const productQuery = query(currentCollectionRef, where('name', '==', decodedProductName));
      const productSnapshot = await getDocs(productQuery);

      // Compruebo si se encontro el producto actual
      if (!productSnapshot.empty) {
        const productDoc = productSnapshot.docs[0];
        const productData = productDoc.data();
        setProductDetails(productData);

        // creo la consulta para obtener los productos relacionados
        const relatedProductsQuery = query(currentCollectionRef, where('name', '!=', decodedProductName));
        const relatedProductsSnapshot = await getDocs(relatedProductsQuery);

        // creo un array de objetos a partir de los documentos en el snapshot (relatedProductsSnapshot)
        const relatedProductsData = relatedProductsSnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }));

        // actualizo el estado con los productos relacionados que quiero mostrar
        setRelatedProducts(relatedProductsData);
      } else {
        console.error('Producto no encontrado:', decodedProductName);
      }
    } catch (error) {
      console.error('Error al obtener los detalles del producto:', error);
    }
  };

  useEffect(() => {
    // obtengo los detalles del producto y los productos relacionados llamando a la funcion
    fetchProductDetails();
  }, [collectionName, decodedProductName]);

  return (
    <Layout>
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
                <ZoomImg src={productDetails.img} propName="fotito"></ZoomImg>
              </a>
            </div>
            <div className="product-detail-info">
              <h5>{productDetails.name}</h5>
              <p className='priceInfo'>${productDetails.price}</p>
              <a className='payment-options' href="">Ver medios de pago</a>
              <hr className='hr-products-detail' />
              <input type="submit" className='button-add-to-cart' value="AGREGAR AL CARRITO" />
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
    </Layout>
  );
}

export default ProductDetail;