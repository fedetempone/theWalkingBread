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
  const [isCartEmpty, setIsCartEmpty] = useState(true); // Agrega el estado isCartEmpty

  // Función para agregar un producto al carrito
  const addProductToCart = (product) => {
    // Verifica si el producto ya está en el carrito
    const existingProductIndex = cartItems.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, incrementa la cantidad
      const updatedCart = [...cartItems];
      updatedCart[existingProductIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      // Si el producto no está en el carrito, agrégalo
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setIsCartEmpty(false);
  };

  // Función para eliminar un producto del carrito
  function removeProductFromCart(productId) {
    // Filtra los productos en el carrito para eliminar el que coincide con el productId
    const updatedCartItems = cartItems.filter((product) => product.id !== productId);
    
    // Actualiza el estado con el nuevo array de cartItems sin el producto eliminado
    setCartItems(updatedCartItems);
    setIsCartEmpty(updatedCartItems.length === 0);
  }

  function handleQuantityChange(productId, newQuantity) {
    // Copia el array de cartItems para no mutar el estado directamente
    const updatedCartItems = [...cartItems];
  
    // Busca el producto en el carrito por su ID
    const productIndex = updatedCartItems.findIndex((product) => product.id === productId);
  
    // Si se encuentra el producto en el carrito, actualiza su cantidad
    if (productIndex !== -1) {
      updatedCartItems[productIndex].quantity = newQuantity;
      setCartItems(updatedCartItems); // Actualiza el estado con el nuevo carrito
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