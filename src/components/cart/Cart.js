import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './cart.css'

function Cart({ cartItems, handleQuantityChange, removeProductFromCart, isCartEmpty, setIsCartEmpty }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEmptyCartMessage, setShowEmptyCartMessage] = useState(false);

  const handleStartPurchase = () => {
    // Verifica si el carrito está vacío
    if (cartItems.length === 0) {
      // Si está vacío, muestra el mensaje de carrito vacío
      setShowEmptyCartMessage(true);
    } else {
      // Si no está vacío, realiza aquí las acciones necesarias para iniciar la compra, como enviar un correo de confirmación, etc.

      // Luego, muestra el mensaje de confirmación
      setShowConfirmation(true);

      // Puedes agregar un temporizador para ocultar automáticamente el mensaje después de cierto tiempo si lo deseas
      setTimeout(() => {
        setShowConfirmation(false);
      }, 498495195195); // Ocultar el mensaje después de 5 segundos (ajusta este valor según tus necesidades)
    }
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div className="cart">
        <div className="cartContainer">
          <h5 className={isCartEmpty ? 'emptyCart' : 'hideEmptyCart'}>EL CARRITO DE COMPRAS ESTA VACIO</h5>
          {cartItems.map((product) => (
            <div className='cartItem' key={product.id}>
              <div className="cartImg">
                <img src={product.img} alt="imagen de producto" />
              </div>
              <div className="cartQuantityContainer">
                <div className="inputQuantity">
                  <p>{product.name}</p>
                  <button className='substract' onClick={() => handleQuantityChange(product.id, Math.max(product.quantity - 1, 1))}>
                    -
                  </button>
                  <input
                    id='productQuantity'
                    type="number"
                    value={product.quantity}
                    min="1"
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      handleQuantityChange(product.id, newQuantity);
                    }}
                  />
                  <button className='add' onClick={() => handleQuantityChange(product.id, product.quantity + 1)}>
                    +
                  </button>
                </div>
              </div>
              <div className="cartSubtotal">
                <a href="#" onClick={(e) => { e.preventDefault(); removeProductFromCart(product.id); }}>
                  <FontAwesomeIcon icon={faTrash} />
                </a>
                <p>Total: ${product.price * product.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="buy">
          <hr />
          <h2>TOTAL</h2>
          <p className="cartTotal">${total}</p>
          <hr />
          <button onClick={handleStartPurchase} className='button-add-to-cart' style={{ width: '85vw', margin: ' 0 auto' }}>INICIAR COMPRA</button>
          <a href="/">Ver más productos</a>
        </div>

          {showConfirmation && (
          <div className={`confirmationMessage ${showConfirmation ? 'show' : ''}`}>
            <h4>COMPRA INICIADA, RECIBIRÁS UN MAIL DE CONFIRMACIÓN</h4>
            <p>¡ GRACIAS POR ELEGIRNOS !</p>
            <Link to='/productos'><button className='red-button'>SEGUIR COMPRANDO</button></Link>
          </div>
        )}

        {/* Mensaje de carrito vacío */}
        {showEmptyCartMessage && (
          <div className={`emptyCartMessage ${showEmptyCartMessage ? 'show' : ''}`}>
            El carrito está vacío. Debe agregar un producto primero.
          </div>
        )}

      </div>
    </>
  );
}

export default Cart;

// onClick={<Componente/>}