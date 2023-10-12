import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetail from 'components/productDetail/ProductDetail';
import Cart from 'components/cart/Cart';
import Layout from 'components/layout/Layout';
import Home from 'components/home/Home';
import Contact from 'components/contact/Contact';
import Products from 'components/products/Products';
import AboutUs from 'components/aboutUs/AboutUs';
import ProductList from 'components/productList/ProductList';
import ScrollToTop from 'components/scrollToTop/ScrollToTop';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(true); 

  // funcion para agregar un producto al carrito
  const addProductToCart = (product) => {
    // verifica si el producto ya está en el carrito
    const existingProductIndex = cartItems.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      // si el producto ya esta en el carrito, incrementa la cantidad
      const updatedCart = [...cartItems];
      updatedCart[existingProductIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      // si el producto no esta en el carrito, agrégalo
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setIsCartEmpty(false);
  };

  // funcion para eliminar un producto del carrito
  function removeProductFromCart(productId) {
    // filtro los productos en el carrito para eliminar el que coincide con el productId
    const updatedCartItems = cartItems.filter((product) => product.id !== productId);

    // actualizo el estado con el nuevo array de cartItems sin el producto eliminado
    setCartItems(updatedCartItems);
    setIsCartEmpty(updatedCartItems.length === 0);
  }

  function handleQuantityChange(productId, newQuantity) {
    // copio el array de cartItems para no mutar el estado directamente
    const updatedCartItems = [...cartItems];

    // busco el producto en el carrito por su ID
    const productIndex = updatedCartItems.findIndex((product) => product.id === productId);

    // si se encuentra el producto en el carrito, entonces actualizo su cantidad
    if (productIndex !== -1) {
      updatedCartItems[productIndex].quantity = newQuantity;
      setCartItems(updatedCartItems); // atualizo el estado con el nuevo carrito
    }
  }


  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/productos/:collectionName/:productName" element={<ProductDetail cartItems={cartItems} addProductToCart={addProductToCart} setIsCartEmpty={setIsCartEmpty} />} />
              <Route path="/cart" element={
                <Cart cartItems={cartItems} handleQuantityChange={handleQuantityChange} removeProductFromCart={removeProductFromCart} isCartEmpty={isCartEmpty} setIsCartEmpty={setIsCartEmpty} />
              } />
              <Route path="/productos/:collectionName/:productName" element={<ProductDetail cartItems={cartItems} addProductToCart={addProductToCart} setIsCartEmpty={setIsCartEmpty} />} />
              <Route path="/cart" element={<Cart cartItems={cartItems} handleQuantityChange={handleQuantityChange} removeProductFromCart={removeProductFromCart} isCartEmpty={isCartEmpty} setIsCartEmpty={setIsCartEmpty} />} />
              <Route path="/" element={(<Home />)} />
              <Route path="/contact" element={(<Contact />)} />
              <Route path="/productos" element={(<Products />)} />
              <Route path="/about" element={(<AboutUs />)} />
              {/* ↓↓↓ esto muestra los links de /sandwiches, /pasteleria, /panaderia ↓↓↓ */}
              <Route path="/:collectionName" element={(<ProductList />)} />
            </Routes>
          </Layout>
        }
        />
      </Routes>
    </Router>
  );
}

export default App;

// EN RESUMEN EN ESTE COMPONENTE ESTOY HACIENDO LO SIGUIENTE:

// me estoy comunicando con los otros componentes , por ejemplo en el componente productDetail 
// hago toda la funcionalidad de traer los productos y los voy añadiendo al carrito con los 
// respectivos botones y demas, pero la funcion principal la termina ejecutando
// desde app.js, es decir por ejemplo en productDetail tengo el producto y 
// cuando clickeo en agregar al carrito le paso una funcion con un onclick la cual se llama
// handleToAddCart y dentro de la funcion handleaddtocart le digo a la funcion addproducttocart(enapp.js) 
// que voy a mandarle el producto detallado con su id y datos. entonces la funcion addproducttocart se 
// termina de actualizar desde el componente app. 