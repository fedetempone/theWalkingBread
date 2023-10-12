import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firestoreInstance from 'firebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function RelatedProducts() {
  // con useparams obtengo el parametro de la ruta, y almaceno una parte en
  // collectionName y la otra en productName. Si la ruta es. 
  // www.paginaweb.com/productos/sandwiches/nombredelproducto, collectionname deberia
  // tomar productos y produtName sandwiches, porque useparams toma siempre las rutas
  // dinamicas, pero yo en app,js estoy definiendo lo siguiente:
  // <Route path="/productos/:collectionName/:productName" entonces con esto me garantizo
  // de que productos es una ruta estatica, mientras que collecionName y productName
  // son rutas dinamicas por eso es que en este codigo collectionName toma el valor de 
  // sandwiches y productName toma el valor de "nombredelproducto".
  const { collectionName, productName } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
  const fetchRelatedProducts = async () => {
    try {
        const currentCollectionRef = collection(firestoreInstance, collectionName);
        
        // consulta para obtener los productos relacionados cuyo nombre no coincida con productname
        // que seria el nombre del producto que esta seleccionado en la pagina.
        const relatedProductsQuery = query(currentCollectionRef, where('name', '!=', productName));
        // ejecuto y guardo en realtedproductsSnapshot una snapshot que contiene los documentos
        // que hayan coincido con la busqueda anterior (relatedproductsquery)
        const relatedProductsSnapshot = await getDocs(relatedProductsQuery);
        
        // creo un array de objetos a partir de los documentos en el snapshot (relatedProductsSnapshot)
        const relatedProductsData = relatedProductsSnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }));
        
        // actualizo el estado con los productos relacionados que quiero mostrar
        setRelatedProducts(relatedProductsData);
      } catch (error) {
        console.error('Error al obtener los productos relacionados:', error);
      }
    };
    
    // una vez finalizada la declaracion de la funcion fetchRelatedProducts, utilizo
    // el llamado a esta funcion "fetchRelatedProducts();" para cada vez que collectionName
    // o productName cambien, se realice denuevo la consulta. tranquilamente podria haber separado
    // el const fetcReltedProducts por un lado, y el useEffect con el fecthReltaedProducts() por otro lado
    fetchRelatedProducts();
  }, [collectionName, productName]);

  return (
    <div className="containerDescription">
      {relatedProducts.map(product => (
        // quito carateres especiales o espacios con encodeURIComponent
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


