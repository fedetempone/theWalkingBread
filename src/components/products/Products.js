import React, { useState, useEffect } from 'react';
import '../products/products.css';
import Divisors from '../divisors/Divisors';
import { collection, getDocs } from 'firebase/firestore';
import firestoreInstance from 'firebaseConfig';
import { Link } from 'react-router-dom';

function Products() {
  const [sortingOption, setSortingOption] = useState('-');
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProductsFromCollections = async () => {
    try {
      const cachedProducts = localStorage.getItem('cachedProducts');

      if (cachedProducts) {
        // si hay productos en localstorage los utilizo desde ahi
        console.log('productos obtenidos de localstorage: ');
        return JSON.parse(cachedProducts);
      }

      const productsData = [];

      for (const collectionName of collections) {
        const productsCollection = collection(firestoreInstance, collectionName);
        const productsSnapshot = await getDocs(productsCollection);

        const collectionProducts = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          collection: collectionName,
          ...doc.data(),
        }));

        productsData.push(...collectionProducts);
      }

      // guardo los productos en local storage para hacer menos consultas a la base de datos
      localStorage.setItem('cachedProducts', JSON.stringify(productsData));

      return productsData;
    } catch (error) {
      console.error('Error al cargar productos:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchCollectionsFromDatabase = async () => {
      try {
        const collectionsList = ['sandwiches', 'pasteleria', 'panaderia'];
        return collectionsList;
      } catch (error) {
        console.error('Error al cargar colecciones:', error);
        return [];
      }
    };

    fetchCollectionsFromDatabase().then(async (collectionsList) => {
      setCollections(collectionsList);

      fetchProductsFromCollections().then((allProducts) => {
        // convierto los precios de string a números por las dudas
        const productsWithNumericPrice = allProducts.map((product) => ({
          ...product,
          price: parseFloat(product.price),
        }));

        setProducts(productsWithNumericPrice);
        setSortedProducts(productsWithNumericPrice);
        setLoading(false);
      });
    });
  }, []);

  useEffect(() => {
    const sortProducts = () => {
      switch (sortingOption) {
        case 'price-ascending':
          return [...sortedProducts].sort((a, b) => a.price - b.price);
        case 'price-descending':
          return [...sortedProducts].sort((a, b) => b.price - a.price);
        case 'alpha-ascending':
          return [...sortedProducts].sort((a, b) => a.name.localeCompare(b.name));
        case 'alpha-descending':
          return [...sortedProducts].sort((a, b) => b.name.localeCompare(a.name));
        default:
          return [...sortedProducts];
      }
    };

    setSortedProducts(sortProducts());
  }, [sortingOption]);

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <div className="chargingData"></div>
          <p>Cargando Datos</p>
        </div>
      ) : (
        <>
          <Divisors text="PRODUCTOS"></Divisors>
          <div className="sort">
            <label htmlFor="sort">Ordenar Por:</label>
            <select
              id="sort"
              name="sort-by"
              onChange={(event) => setSortingOption(event.target.value)}
              value={sortingOption}
            >
              <option value="-">-</option>
              <option value="price-ascending">Precio de Menor a Mayor</option>
              <option value="price-descending">Precio de Mayor a Menor</option>
              <option value="alpha-ascending">A - Z</option>
              <option value="alpha-descending">Z - A</option>
            </select>
          </div>
          <div className="product-list margin-products">
            {sortedProducts.map((product) => (
              <div key={product.id} className="product-column">
                <div className="imgContainer">
                  <Link to={`/productos/${product.collection}/${product.name}`}>
                    <img src={product.img} alt="imagen de sanguche" className="product-img" />
                  </Link>
                </div>
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p className="product-detailes-price">
                    ${Number(product.price).toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Products;

