import './products.css';
import React, { useState, useEffect } from 'react';
import Divisors from '../divisors/Divisors';
import { collection, getDocs } from 'firebase/firestore';
import firestoreInstance from 'firebaseConfig';
import { Link } from 'react-router-dom';
import LoadingFiles from 'components/loadingFiles/LoadingFiles';

// declaro la funcion para obtener los productos de la base de datos.
const fetchCollectionsFromDatabase = async (setError) => {
  try {
    const collectionsList = ['sandwiches', 'pasteleria', 'panaderia'];
    return collectionsList;
  } catch (error) {
    console.error('Error al cargar colecciones de la base de datos:', error);
    setError('Error al obtener productos de la base de datos');
    return [];
  }
};

function Products() {
  const [sortingOption, setSortingOption] = useState('-');
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ejecuto la funcion para obtener los productos de la base de datos ( siempre y cuando no esten ya cargados en localstorage )
    fetchCollectionsFromDatabase(setError).then(async (collectionsList) => {
      setCollections(collectionsList);
      // verifico si los productos estan en localStorage
      const cachedProducts = localStorage.getItem('cachedProducts');

      // si hay productos en localstorage, los utilizo
      if (cachedProducts) {
        console.log('los productos han sido obtenidos a traves de localStorage');
        const parsedProducts = JSON.parse(cachedProducts);
        setProducts(parsedProducts);
        setLoading(false);
      } else {
        console.log('los productos han sido obtenidos a traves de la base de datos, para luego guardarlos en localstorage')
        // si no están en localstorage, los obtengo de la base de datos
        try {
          // esta es la logica de siempre para obterner los productos de la base de datos de firebase
          // resumidamente hace la consulta trae todos los productos y los guarda en productsData
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

          // reccoro el producsData que tiene todos los productos que trajimos recientemente de la base de datos 
          // y le convierto los precios a flotantes para poder ordenarlos cuando uso el sortproducts
          const productsWithNumericPrice = productsData.map((product) => ({
            ...product,
            price: parseFloat(product.price),
          }));

          setProducts(productsWithNumericPrice);
          // guardo los productos en localstorage para luego usarlos sin hacer una consulta a la base de datos
          localStorage.setItem('cachedProducts', JSON.stringify(productsWithNumericPrice));
          setLoading(false);
        } catch (error) {
          console.error('Error al cargar productos:', error);
          setError('Error al obtener productos');
          setLoading(false);
        }
      }
    });
  }, []);

  useEffect(() => {
    // ordena los productos según la opción solicitada cada ves que selecciono una opcion.
    const sortProducts = () => {
      switch (sortingOption) {
        case 'price-ascending':
          return [...products].sort((a, b) => a.price - b.price);
          // el return esta haciendo un sort 
          // esto hace que todos los productos se comparen entre si para realizar la ordenacion
          // en este caso por ejemplo si a.price es menor que b price devuelve numero negativo esto quiere 
          // decir que a va antes que b. si a es mayor que b entonces primero debe ir b y si son iguales
          // entonces devuelve 0 y no se cambia el orden.
        case 'price-descending':
          return [...products].sort((a, b) => b.price - a.price);
        case 'alpha-ascending':
          return [...products].sort((a, b) => a.name.localeCompare(b.name));
          // localeCompare es una funcion de js que compara strings segun idioma y cultura,
          // en este caso en ningun lado le insinue que tendria que tomar idioma y cultra de es-AR
          // por lo tanto js utiliza el idioma y las configuraciones regionales del navegador o del entorno
          // en el que se esta ejecutando. Si quisiera cerciorarme de que tome es-AR como localizacion
          // podria  instalar react-intl y usar IntlProvider, FormattedNumber, haciendo que 
          // intprovider sea ar "IntlProvider locale="es-AR" y formattednumber sea 
          // <FormattedNumber (style="currency" currency="ARS")/>  
          // asi que si una persona en otro pais abre la pagina la puede llegar a ver formateada
          // segun su idioma porque yo no setie nada de esto. Para este proyecto lo dejo asi pero
          // tengo que tenerlo en cuenta para un futuro proyecto mas desarollado o con un alcanze mas global.
              
        case 'alpha-descending':
          return [...products].sort((a, b) => b.name.localeCompare(a.name));
        default:
          return [...products]; // este seria el orden predeterminado o cuando no hay opción seleccionada
      }
      // en cada reutrn utilizo "..products" para crear una copia superficial de el array de productos original
      // porque hago esto ? porque sino al tocar las opciones para ordenar los productos, estaria reemplazando
      // el array original. por eso es que hago una copia y el array original se mantiene intacto.
    };

    setProducts(sortProducts());
  }, [sortingOption]);

  return (
    // aca reutilizo el loading files y le digo que se va a ejecutar cuando se resuelva la promesa de fetchcollectionsfromdatabase
    // la cual esta definida en un scope global y trae los productos de la base de datos.
    <LoadingFiles promise={fetchCollectionsFromDatabase}>
      {loading ? (
        // el loading por defecto es true, asi que mientras el loading sea true se ejecuta este codigo y muestra
        // el mensaje cargando datos
        <div className="loading-container">
          <div className="chargingData"></div>
          <p>Cargando productos...</p>
        </div>
      ) : (
        // luego cuando la funcion fetchcollectionsfromdatabase hace todo el laburo de traer los productos
        // el loading pasa a false y procede a ejecutar todo el codigo que sigue aca abajo.
        <>
          <Divisors text="PRODUCTOS"></Divisors>
          {error ? (
            // si en el medio del proceso detecta un error lo va a mostrar en pantalla
            <p className='errorFromDatabase'>{error}</p>
          ) : (
            // si no detecta ningun error sigue con el codigo de aca abajo el cual muestra los productos
            <div>
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
                {products.map((product) => (
                  <div key={product.id} className="product-column">
                    <div className="imgContainer">
                      <Link to={`/productos/${product.collection}/${product.name}`}>
                        <img src={product.img} alt="imagen de sanguche" className="product-img" />
                      </Link>
                    </div>
                    <div className="product-details">
                      <h3>{product.name}</h3>
                      <p className="product-detailes-price">
                        {/* aca hago que los numeros se ajusten al formato de precios de argentina */}
                        ${Number(product.price).toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </LoadingFiles>
  );
}


export default Products;
