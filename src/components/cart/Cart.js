import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './cart.css'

// estoy trayendo las props de app.js
// cartitems es un array con todos los productos del carrito
// nadleQuantityChange maneja la cantidad unitaria que tiene cada producto
// removeProductFromCart para eliminar un producto del carrito
// isCartEmpty para comprobar si el carrito esta vacio o no.
function Cart({ cartItems, handleQuantityChange, removeProductFromCart, isCartEmpty}) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEmptyCartMessage, setShowEmptyCartMessage] = useState(false);

  const handleStartPurchase = () => {
    // verifico si el carrito esta vacío
    if (cartItems.length === 0) {
      // si esta vacio, muestra el mensaje "el carrito de compras esta vacio"
      setShowEmptyCartMessage(true);
      // le seteo un time out para que el mensaje dure solo unos segundos en pantalla
      setTimeout(() => {
        setShowEmptyCartMessage(false);
      }, 3000);
    } else {
      // si no esta vacio, y toco el boton de iniciar compra entonces muestra el mensaje de confirmacion de compra
      setShowConfirmation(true);
      // le seteo un time out para que el mensaje dure solo unos segundos en pantalla
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    }
  };

  // recorro el array, en cada iteracion veo el elemento actual (item) pero no me detengo en 
  // el item sino que me detengo en el item.price que es el precio del elemento, 
  // en este caso es un producto. luego multiplico ese precio, por la cantidad que tiene ese producto, 
  // ya sea 1,2,3 etc. una vez que se multiplicaron los valores, reduce los guarda automaticamente en acc 
  // que inicialmente es 0. y asi va acumulando la sumatoria de precio de cada producto en el carrito,
  // asignandome un total de compra. 
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
                  {/* cuando hago click en el boton de - ejecuto la funcion handlequantitychange sobre
                      el producto acutal que es seleccionado a traves de su id que
                      esta en app.js, la misma se encarga de modificar la cantidad del producto
                      en esta ocasion cuando toco el boton le estoy restando 1 a esta cantidad pero
                      utilizando Math.max(product.quantity - 1, 1), a la cantidad le resto 1
                      pero la cantidad se va a limitar a 1. Nunca podra ser 0 o numero negativo
                */}
                  <button className='substract' onClick={() => handleQuantityChange(product.id, Math.max(product.quantity - 1, 1))}>
                    -
                  </button>

                  {/* cartitems viene como prop de app, cuando lo recorro me encuentro que dentro de cartitems
                      estan los objetos que dentro tienen la propiedad quantity, por eso es que puedo acceder
                      a esta variable. entonces en el value del input pongo product.quantity, si agrego 2 veces
                      el mismo producto la quantity va a cambiar por eso es necesario tener este valor
                      actualizado. Luego le asigne el atributo readonly para que el usuario no pueda ingresar 
                      ningun valor manualmente. Y ademas le asigne un evento onchange el cual toma el valor actualizado
                      del input y lo parsea a entero (porque este valor generalmente es string) guardandolo
                      en la variable newQuantity, para luego ejecutar la funcion handlequantitychange a la que
                      se le pasa el id del producto actual, y la newQuantity del producto actual.
                      (luego en app explico bien lo que hace la funcion pero basicamente como nosotros aca
                      le pasamos el id y la nuevaCantidad lo que hace la funcion es buscar el producto que
                      coincida con ese id y cuando lo encuentra le dice che me dijeron desde cart.js que te actualice
                      la cantidad)
                  */}
                  <input
                    id='productQuantity'
                    type="number"
                    value={product.quantity}
                    min="1"
                    readOnly
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      handleQuantityChange(product.id, newQuantity);
                    }}
                  />
                  {/* aca tambien sumo la cantidad a traves del id del product (sin limite) */}
                  <button className='add' onClick={() => handleQuantityChange(product.id, product.quantity + 1)}>
                    +
                  </button>
                </div>
              </div>
              {/* aca simplemente cuando toco el boton de eliminar ejecuto la funcion de app.js que se encarga
                  de actualizar el estado del carrito eliminando el que coincida con el id 
              */}
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
        {/* aca muestro el mensaje de compra realizada o no, ejecutando la funcion handleSartPurchase en este componente */}
          <button onClick={handleStartPurchase} className='button-add-to-cart' style={{ width: '85vw', margin: ' 0 auto' }}>INICIAR COMPRA</button>
          <a className='showMoreProductsLink' href="#productos">Ver más productos</a>
        </div>
        {/* showConfirmation se actualiza dependiendo la funcion handleStartPurchase, esta funcion pone en true o en
            false el showconfirmation dependiendo si el carrito esta vacio o no. entonces si showconfirmation es true
            le asigna a la clase confirmationMessage otra clase show, la cual muestra un cartel de compraconfirmada
        */}
          {showConfirmation && (
          <div className={`confirmationMessage ${showConfirmation ? 'show' : ''}`}>
            <h4>COMPRA INICIADA, RECIBIRÁS UN MAIL DE CONFIRMACIÓN</h4>
            <p>¡ GRACIAS POR ELEGIRNOS !</p>
            <Link to='/productos'><button className='red-button'>SEGUIR COMPRANDO</button></Link>
          </div>
        )}

        {/* showEmptyCartMessage se actualiza dependiendo la funcion handleStartPurchase, esta funcion pone en true o en
            false el showEmptyCartMessage dependiendo si el carrito esta vacio o no. entonces si showEmptyCartMessage es true
            le asigna a la clase emptyCartMessage otra clase show, la cual muestra un cartel de carrito vacio
        */}
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
