import React, { useState, useEffect } from 'react';
import './sandwiches.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faTwitter, faFacebook, faInstagram } from '@fortawesome/fontawesome-free-brands';

import firestoreInstance from 'firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom'; // Agrega la importación de Link

function SandwichesPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsCollectionRef = collection(firestoreInstance, 'sandwiches');
      const querySnapshot = await getDocs(productsCollectionRef);
      const productsData = [];
      querySnapshot.forEach((doc) => {
        productsData.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setProducts(productsData);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="products-container">
        {products.map(product => (
          <div key={product.id} className="product-column">
            <div className="imgContainer">
              {/* Cambia el enlace a utilizar Link */}
              <Link to={`/productos/${product.data.name}`}> 
                <img src={product.data.img} alt="imagen de sanguche" className="product-img" />
              </Link>
            </div>
            <div className="product-details">
              <h3>{product.data.name}</h3>
              <p className='product-detailes-price'>${product.data.price}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SandwichesPage;
