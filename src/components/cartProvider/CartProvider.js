import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});

  // Cuando el componente se monta, verifica si hay datos en localStorage y úsalos para inicializar el carrito.
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    const storedProductQuantities = JSON.parse(localStorage.getItem('productQuantities'));

    if (storedCart) {
      setCart(storedCart);
    }

    if (storedProductQuantities) {
      setProductQuantities(storedProductQuantities);
    }
  }, []);

  // Función para guardar el carrito y las cantidades en localStorage cada vez que cambien.
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('productQuantities', JSON.stringify(productQuantities));
  }, [cart, productQuantities]);

  // Función para agregar un producto al carrito
  const addProductToCart = (product) => {
    // Verifica si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      // El producto ya está en el carrito, aumenta la cantidad
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // El producto no está en el carrito, agrégalo
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Función para eliminar un producto del carrito
  const removeProductFromCart = (productToRemove) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productToRemove.id));
  };

  return (
    <CartContext.Provider value={{ cart, addProductToCart, removeProductFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export { CartProvider, CartContext };

