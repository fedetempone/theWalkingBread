import React, { useState, useEffect } from 'react';
import "./sandwiches.css"
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faTwitter, faFacebook, faInstagram } from '@fortawesome/fontawesome-free-brands';

function SandwichesPage() {
  //traigo los productos de la base de datos usando useEffect y fetch
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <>
      <Navbar />
      <div className="products-container">
        {products.map(product => (
          <div key={product.id} className="product-column">
            <div className="imgContainer">
              <a href="">
                <img src={product.img} alt="imagen de sanguche" className="product-img" />
              </a>
            </div>
            <div className="product-details">
              <h3>{product.name}</h3>
              <p className='product-detailes-price'>${product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default SandwichesPage;

            // <li key={product.id}>
            //   <h2>{product.name}</h2>
            //   <p>Precio: {product.price}</p>
            //   <p>Descripción: {product.description}</p>
            //   <img src={product.img} alt="" />
            // </li>