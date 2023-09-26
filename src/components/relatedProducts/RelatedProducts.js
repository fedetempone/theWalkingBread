
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firestoreInstance from 'firebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function RelatedProducts() {
  const { collectionName, productName } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const currentCollectionRef = collection(firestoreInstance, collectionName);
        const productQuery = query(currentCollectionRef, where('name', '==', productName));
        const productSnapshot = await getDocs(productQuery);

        if (!productSnapshot.empty) {
          const productDoc = productSnapshot.docs[0];
          const productData = productDoc.data();
          setProductDetails(productData);

          // creo la consulta para obtener los productos relacionados
          const relatedProductsQuery = query(currentCollectionRef, where('name', '!=', productName));
          const relatedProductsSnapshot = await getDocs(relatedProductsQuery);

          // creo un array de objetos a partir de los documentos en el snapshot (relatedProductsSnapshot)
          const relatedProductsData = relatedProductsSnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }));

          // actualizo el estado con los productos relacionados que quiero mostrar
          setRelatedProducts(relatedProductsData);
        } else {
          console.error('Producto no encontrado:', productName);
        }
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
      }
    };

    // obtengo los detalles del producto y los productos relacionados llamando a la funcion
    fetchProductDetails();
  }, [collectionName, productName]);

  return (
    <div className="containerDescription">
      {relatedProducts.map(product => (
        <Link key={product.id} to={`/productos/${collectionName}/${encodeURIComponent(product.data.name)}`} className='anchorRelatedProduct'>
          <div className="containerImgDescription relatedProductsImgDescription">
            <img src={product.data.img} alt={`Imagen descriptiva de ${product.data.name}`} />
            <div className="text-overlay textOverlay-relatedProducts">
              <div className="textShape"></div>
              <p className='relatedProductsName'>{product.data.name}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default RelatedProducts;


