import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../firebaseConfig';
import LoadingFiles from 'components/loadingFiles/LoadingFiles';
import { Link } from 'react-router-dom';

function ProductList({ category }) {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      let collectionRef;

      if (category === 'sandwiches') {
        collectionRef = collection(db, 'sandwiches');
      } else if (category === 'pasteleria') {
        collectionRef = collection(db, 'pasteleria');
      } else if (category === 'panaderia') {
        collectionRef = collection(db, 'panaderia');
      } else {
        return;
      }

      const querySnapshot = await getDocs(collectionRef);

      const productsData = [];
      querySnapshot.forEach((doc) => {
        productsData.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setProducts(productsData);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, [category]);

  return (
      <LoadingFiles promise={fetchData}>
      {products.map(product => (
            <div key={product.id} className="product-column">
              <div className="imgContainer">
                <Link to={`/productos/${category}/${product.data.name}`}> 
                {/* me recuerdo que utilizo .data porque anteriormente forme el 
                productsData creando para cada elemento un objeto con un id y un data, 
                este ultimo obtiene los datos del documento como ser name description price
                en este caso en particular. */}
                  <img src={product.data.img} alt="imagen de sanguche" className="product-img" />
                </Link>
              </div>
              <div className="product-details">
                <h3>{product.data.name}</h3>
                <p className='product-detailes-price'>${product.data.price}</p>
              </div>
            </div>
          ))}
      </LoadingFiles>
  );
}

export default ProductList;

