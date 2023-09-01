import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from 'components/layout/Layout';
import firestoreInstance from 'firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function ProductDetail() {
  const { productName } = useParams(); // Obtenemos el parámetro de la URL
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsCollectionRef = collection(firestoreInstance, 'sandwiches');
        const querySnapshot = await getDocs(productsCollectionRef);
        const productData = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
          .find(product => product.data.name === productName);

        if (productData) {
          setProductDetails(productData.data);
        } else {
          console.error('Producto no encontrado:', productName);
          // Puedes manejar la situación en la que el producto no se encuentra
        }
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
      }
    };

    fetchData();
  }, [productName]);

  return (
    <Layout>
      <div className="product-detail-container">
        <h2>{productDetails.name}</h2>
        <p>{productDetails.description}</p>
        <p>Precio: ${productDetails.price}</p>
        <img src={productDetails.img} alt="" />
        {/* Agrega más contenido y detalles del producto aquí */}
      </div>
    </Layout>
  );
}

export default ProductDetail;
