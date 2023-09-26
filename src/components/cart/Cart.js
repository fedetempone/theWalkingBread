import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './cart.css'

function Cart({ cartItems, handleQuantityChange, removeProductFromCart, isCartEmpty, setIsCartEmpty }) {

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
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
        <button className='button-add-to-cart' style={{ width: '85vw', margin: ' 0 auto' }}>INICIAR COMPRA</button>
        <a href="/">Ver más productos</a>
      </div>
    </div>
  );
}

export default Cart;