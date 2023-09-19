import React, { useEffect } from 'react';
import { useCart } from '../cartProvider/CartProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './cart.css';

function Cart() {
  const { removeProductFromCart } = useCart();
  const [ cart, setCart] = useState([]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        item.quantity = newQuantity;
      }
      return item;
    });

    // Actualiza el carrito con las cantidades actualizadas
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  return (
    <div className='cart'>
      <h4>PRODUCTOS EN CARRITO</h4>
      {cart.map((product) => {
        const productId = product.id;

        return (
          <div className='cartContainer' key={productId}>
            <div className="cartImg">
              <img src={product.img} alt="imagen de producto" />
            </div>
            <div className="cartQuantityContainer">
              <div className="inputQuantity">
                <p>{product.name}</p>
                <button className='substract' onClick={() => handleQuantityChange(productId, product.quantity - 1)}>
                  -
                </button>
                <input
                  type="number"
                  value={product.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(productId, e.target.value)}
                />
                <button className='add' onClick={() => handleQuantityChange(productId, product.quantity + 1)}>
                  +
                </button>
              </div>
            </div>
            <div className="cartSubtotal">
              <a href="#" onClick={() => removeProductFromCart(product)}>
                <FontAwesomeIcon icon={faTrash} />
              </a>
              <p>Total: ${product.price * product.quantity}</p>
            </div>
          </div>
        );
      })}

      <div className="buy">
        <hr />
        <h2>TOTAL</h2>
        <hr />
        <button className='button-add-to-cart' style={{ width: '85vw', margin: ' 0 auto' }}>INICIAR COMPRA</button>
        <a href="/">Ver más productos</a>
      </div>
    </div>
  );
}

export default Cart;

// ultima funcionalidad buena antes de parencomponent
// import { useCart } from '../cartProvider/CartProvider';
// import { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import './cart.css'

// function Cart() {
//   const { cart, removeProductFromCart } = useCart();
  
//   // Estado para las cantidades de productos en el carrito
//   const [productQuantities, setProductQuantities] = useState([]);

//   // Cuando el componente se monta, verifica si hay datos en localStorage y úsalos para inicializar el carrito.
//     useEffect(() => {
//       const storedCart = JSON.parse(localStorage.getItem('cart'));
//       if (storedCart) {
//         setProductQuantities(storedCart.map((item) => item.quantity || 0));
//       }
//     }, []);

//   // Función para guardar el carrito en localStorage cada vez que cambie.
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart.map((item, index) => ({ ...item, quantity: productQuantities[index] })) ));
//   }, [cart, productQuantities]);

//   // Función para manejar el cambio de cantidad
//   function handleQuantityChange(productId, newQuantity) {
//     // Clona el estado actual de las cantidades
//     const updatedQuantities = { ...productQuantities };
//     // Actualiza la cantidad del producto seleccionado
//     updatedQuantities[productId] = newQuantity;

//     // Verifica si la nueva cantidad es válida (mayor o igual a 0)
//     if (newQuantity >= 0) {
//       // Actualiza el estado solo si la cantidad es válida
//       setProductQuantities(updatedQuantities);
//     }
//   }
  
//   return (
//     <div className='cart'>
//       <h4>PRODUCTOS EN CARRITO</h4>
//       {cart.map((product) => {
//         const productId = product.id;
//         const currentQuantity = productQuantities[productId] || 1;
//         const totalPrice = product.price * currentQuantity;

//         return (
//           <div className='cartContainer' key={productId}>
//             <div className="cartImg">
//               <img src={product.img} alt="imagen de producto" />
//             </div>
//             <div className="cartQuantityContainer">
//               <div className="inputQuantity">
//                 <p>{product.name}</p>
//                 <button className='substract' onClick={() => {
//                   if (currentQuantity > 0) {
//                     handleQuantityChange(productId, currentQuantity - 1);
//                   }
//                 }}>
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   value={currentQuantity}
//                   min="1"
//                   onChange={(e) => handleQuantityChange(productId, e.target.value)}
//                 />
//                 <button className='add' onClick={() => handleQuantityChange(productId, currentQuantity + 1)}>+</button>
//               </div>
//             </div>
//             <div className="cartSubtotal">
//               <a href="" onClick={() => removeProductFromCart(product)}><FontAwesomeIcon icon={faTrash} /></a>
//               <p>Total: ${totalPrice}</p>
//             </div>
//           </div>
//         );
//       })}

//       <div className="buy">
//         <hr />
//         <h2>TOTAL</h2>
//         <hr />
//         <button className='button-add-to-cart' style={{ width: '85vw', margin: ' 0 auto' }}>INICIAR COMPRA</button>
//         <a href="/">Ver más productos</a>
//       </div>
//     </div>
//   );
// }

// export default Cart;
