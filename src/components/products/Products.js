import React, { useState, useEffect } from 'react';
import '../products/products.css';
import Divisors from '../divisors/Divisors';
import { collection, getDocs } from 'firebase/firestore';
import firestoreInstance from 'firebaseConfig';
import { Link } from 'react-router-dom';

function Products() {
  const [sortingOption, setSortingOption] = useState('-'); // Opción predeterminada
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]); // Nuevo estado para productos ordenados
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

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

      // Verificar si los productos están en localStorage
      const cachedProducts = localStorage.getItem('cachedProducts');

      if (cachedProducts) {
        // Si hay productos en localstorage, los utilizamos
        console.log('productos obtenidos de localStorage: ', cachedProducts);
        const parsedProducts = JSON.parse(cachedProducts);
        setProducts(parsedProducts);
        setSortedProducts(parsedProducts);
        setLoading(false);
      } else {
        console.log('productos obtenidos de la base de datos, para luego guardarlos en localstorage')
        // Si no están en localstorage, los obtenemos de la base de datos
        const fetchProductsFromCollections = async () => {
          try {
            const productsData = [];

            for (const collectionName of collectionsList) {
              const productsCollection = collection(firestoreInstance, collectionName);
              const productsSnapshot = await getDocs(productsCollection);

              const collectionProducts = productsSnapshot.docs.map((doc) => ({
                id: doc.id,
                collection: collectionName,
                ...doc.data(),
              }));

              productsData.push(...collectionProducts);
            }

            return productsData;
          } catch (error) {
            console.error('Error al cargar productos:', error);
            return [];
          }
        };

        fetchProductsFromCollections().then((allProducts) => {
          // convierto los precios de string a numeros por las dudas
          const productsWithNumericPrice = allProducts.map((product) => ({
            ...product,
            price: parseFloat(product.price), 
          }));

          setProducts(productsWithNumericPrice);
          setSortedProducts(productsWithNumericPrice); //al principio los productos ordenados son iguales a los productos cargados
          setLoading(false);
          // guardo los productos en localStorage la primera vez q los traigo de la base de datos para cachearlos en otra oportunidad sin hacer otra consulta a la base de datos
          localStorage.setItem('cachedProducts', JSON.stringify(productsWithNumericPrice));
        });
      }
    });
  }, []);

  useEffect(() => {
    // ordeno los productos segun la opcion solicitada
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
          return [...sortedProducts]; // este seria el orden predeterminado o cuando no hay opcion seleccionada
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
