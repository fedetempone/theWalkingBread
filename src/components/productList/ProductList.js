import './productList.css';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../firebaseConfig';
import LoadingFiles from 'components/loadingFiles/LoadingFiles';
import Divisors from 'components/divisors/Divisors';

// defino una funcion asincrona fuera del componente para que tenga un alcance global abajo explico porque..
// esta funcion recibe 2 argumentos, el primero es collectionName va a ser el nombre de la coleccion
// de productos a consultar y setLoading es para atualizar el estado de carga de los datos obtenidos.

const fetchProductsFromCollection = async (collectionName, setLoading) => {
  try {
    // en esta parte del codigo simplemente accedo a la base de datos, primero se crea una referencia
    // a la coleccion de firestore que corresponde a collectionName, "db" es la instancia de firestore
    // no le tengo que dar mucha bola a db porque esta dentro de firebaseconfig y ese archivo lo trae
    // la base de datos de firebase firestore, pero entre lineas solo me estoy conectando a la base de datos..
    const productsCollection = collection(db, collectionName);
    const productsSnapshot = await getDocs(productsCollection);

    // al definir esta funcion como asincrona puedo trabajar con promesas y con el await, 
    // es decir que producSnapshot primeramente va a obtener una instantanea de 
    // los documentos de la base de datos a traves de getDocs, pero va a esperar a que se resuelva
    // la promesa antes de seguir ejecutando codigo, por eso el "await". La instantea trae 
    // datos y metadatos en tiempo real de esa consulta a mi base de datos en un objeto medio complicado de leer.

    const collectionProducts = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // agarro esa instantanea que obtuve recien y la proceso para mapearla a un formato mas legible
    // productSnapshot.docs seria un array que tiene los documentos dentro de la instantanea, cada elemento
    // en este array, seria un documento de firestore. Con el .map itero el array de productSnapshot y
    // almaceno por cada iteracion un objeto que contiene la info del documento, como el id.
    // con id: doc.id creo una propiedad id para el id unico que traigo de cada documento.
    // el ... es un operador de propagacion  lo uso para desestructurar los datos del documento
    // es decir en un solo paso agarro el objeto doc.data() y tomo todos sus campos y valores y los 
    // pongo en un nuevo objeto y lo pongo dentro del array collectionproducts como un objeto nuevo

    return collectionProducts;
  } catch (error) {
    console.error('Error proviniente de la base de datos, error al cargar productos:', error);
    return [];
  }
};

function ProductList() {
  const { collectionName } = useParams();
  //este es el valor del parametro de la ruta
  const [products, setProducts] = useState([]);
  // defino products como array vacio para ir cargandolo mas adelante
  const [loading, setLoading] = useState(true);
  // inicializo loading en true cuando se inicia el componente y luego lo paso a false
  // cuando obtengo todos los datos, mientras este en true carga el circulito de cargando datos
  // cuando pasa a false muestra los productos y no se actualiza hasta que
  // useEffect detecte un cambio en el parametro de la ruta.

  useEffect(() => {
    const localStorageKey = `products-${collectionName}`;
    const storedProducts = localStorage.getItem(localStorageKey);
    if (storedProducts) {
      console.log('Obteniendo productos de localStorage');
      setProducts(JSON.parse(storedProducts));
      setLoading(false);
    } else {
      fetchProductsFromCollection(collectionName, setLoading)
        // ejecuto la funcion que me trae los datos y le paso como parametro la ruta de la url y el setloading
        .then((collectionProducts) => {
          // si la promesa se resuelve con exito le paso los productos que arme en el array collectionproducts
          setProducts(collectionProducts);
          // y actualizo setProducts con el nuevo array que cree con todos los datos de la base de datos ya cargados.
          setLoading(false);
          // por ultimo como quedo todo funcionando establezco el loading en false para que muestre los productos y
          // deje de mostrar el circulito de carga...
          localStorage.setItem(localStorageKey, JSON.stringify(collectionProducts));
        });
    }
  }, [collectionName]);


  return (
    <LoadingFiles promise={() => fetchProductsFromCollection(collectionName, setLoading)}>
      {/* aca a la funcion fecthproducts le paso los mismos parametros que recibe cuando esta declarada arriba */}
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <>
        <Divisors text={collectionName}></Divisors>
        <div className="products-container">
          <div className="product-list">

            {products.map((product) => (
              <div key={product.id} className="product-column">
                <div className="imgContainer">

                  <Link to={`/productos/${collectionName}/${product.name}`} state={{ product }}>
                    <img src={product.img} alt="imagen de producto" className="product-img" />
                  </Link>
                </div>
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p className='product-detailes-price'>${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </>
      )}
    </LoadingFiles>
  );
}

export default ProductList;

// este componente lo renderizo en app.js path="/:collectionName" element={(<Layout><ProductList/></Layout>)}
// y en el componente description.js <Link to="/pasteleria" className='anchorPasteleria'>
// si otro componente por ej, productDetails tiene el link /detailproducts y en app no especifico que
// para la ruta /detailproducts se renderice algun componente especifico, y en su lugar renderizo productList
// productList no va a mostrar nada, porque va a analizar la ruta y va a buscar una coleccion en la base de datos
// que coincida con el parametro del a ruta "productdetails" y como no tengo una coleccion con ese nombre
// no va a mostrar nada.
