import React, { useState, useEffect } from 'react';
import "./sandwiches.css"
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faTwitter, faFacebook, faInstagram } from '@fortawesome/fontawesome-free-brands';

import firestoreInstance from 'firebaseConfig';

// Importo la instancia de la base de datos que está creada en firebase firestore
// y la estoy trayendo del archivo firebaseConfig que creé con toda la importación
// de la base de datos. Así voy a poder interactuar con ella.

import { collection, getDocs } from 'firebase/firestore';
// Importo 2 funciones pertenecientes a la librería de firebase llamada firestore
// son necesarias para interactuar con la base de datos.

function SandwichesPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Obtengo los datos de la base de datos  con la funcion fetchdata
    const fetchData = async () => {
      const productsCollectionRef = collection(firestoreInstance, 'sandwiches');
      // con productsCollectionRef obtengo una referencia a la coleccion de la base de datos
      // collection recibe 2 paramettros, el primero es la instancia de la basededatos
      // y la segunda es el nombre de la coleccion a la que quiero acceder
      // en este caso la coleccion en la base de datos se llama products.
      const querySnapshot = await getDocs(productsCollectionRef);
      // con querySnapshot obtengo una snapshot(instantanea o captura de momento especifico)
      // de los datos almacenados en la basededatos en tiempo real. 
      const productsData = [];
      // declaro un arreglo productsData que se utilizara para almacenar los
      // datos obtenidos de la base de datos 
      querySnapshot.forEach((doc) => {
        // itero a traves de cada documento de la snapshot o instantanea (cada documento
        // contiene el producto con su nombre descripcion precio etc.) y para 
        // cada documento se ejecuta una funcion flecha que pushea un nuevo objeto
        // con los datos que va a obteniendo
        productsData.push({
          id: doc.id,
          data: doc.data(), // esta es la funcion que termina devolviendo un objeto con todos los campos de la base de datos
        });
      });

      setProducts(productsData);
      // una ves que se armo el arreglo con todos los datos, le actualizo
      // el estado a products a traves de setProducts y ya me quedan los datos
      // procesados y listos para mostrarlos
    };

    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="products-container">
        {products.map(product => (
          <div key={product.id} className="product-column">
            <div className="imgContainer">
              <a href="">
                <img src={product.data.img} alt="imagen de sanguche" className="product-img" />
              </a>
            </div>
            <div className="product-details">
              <h3>{product.data.name}</h3>
              <p className='product-detailes-price'>${product.data.price}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default SandwichesPage;

