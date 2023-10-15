import React, { useState } from 'react';
import './newsletter.css'

const Newsletter = () => {
  // defino estado para chequear si esta suscripto o no
  const [subscribed, setSubscribed] = useState(false);
  // defino estado para para almacenar los datos del formulario
  const [formData, setFormData] = useState({ username: '', email: '' });
  // defino estado para almacenar los errores
  const [formErrors, setFormErrors] = useState({});

  // actualizo el estado de formadata creando una copia del mismo
  // y pasandole los nuevos valores que ingresa el usuario en tiempo real
  const handleChange = (e) => {
    // e.target representa el elemnto que descadena el evento
    // en este caso el campo de entrada
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // funcion para validar el formulario
  const validateForm = () => {
    const errors = {};

    // si el usuario ingreso un nombre incorrecto entonces muestra el error
    // en este caso no puede ingresar numeros
    if (!/^[a-zA-Z]+$/.test(formData.username)) {
      errors.username = 'El nombre de usuario no puede contener numeros.';
    }

    // si el usuario ingresa un mail incorrecto entonces muestra el erorr
    // en este caso debe incluir el arroba.
    if (!formData.email.includes('@')) {
      errors.email = 'El Email no es valido.';
    }

    return errors;
  };

  // esta funcion se ejecuta cuando el usuario valida el formulario
  const handleSubmit = (e) => {
    // para que no se actualice la pagina cancelando el comportamiento
    // predeterminado del formulario
    e.preventDefault();
    // llamo a validateform para validar datos y almaceno los errores
    // si es que se obtuvieron en la variable errors.
    const errors = validateForm();

    // si la variable error esta vacia
    if (Object.keys(errors).length === 0) {
      // entonces muestro el mensaje de suscripcion exitosa
      setSubscribed(true);
    } else {
      // si la variable contiene errores entonces muestro el
      // mensaje de error correspondiente
      setFormErrors(errors);
    }
  };

  return (
    <>
      <div className="newsletterContainer">
        {/* si la sucsripcion es exitosa muestro el mensaje correspondiente */}
        {subscribed ? (
          <div className="thankYouMessage">
            <p>¡Gracias por suscribirte a nuestro boletín informativo!</p>
            <p>Como agradecimiento, te ofrecemos un descuento exclusivo.</p>
            <p>Para obtenerlo, simplemente haz clic en el enlace que te hemos enviado por correo electrónico.</p>
            <p>¡Estamos emocionados de tenerte como parte de nuestra comunidad!</p>
          </div>
          // si aun no ha sido validado muestro los campos para suscribirse
        ) : (
          <>
            <p>Inscríbete para recibir descuentos y enterarte de nuestras ofertas!</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="FormControlInput1"
                name="username"
                placeholder="Tu Nombre"
                className="field"
                autoComplete="username"
                required
                value={formData.username}
                onChange={handleChange}
              />
              {/* campo para mostrar errores si es que los hay */}
              {formErrors.username && <span className="error">{formErrors.username}</span>}
              <input
                type="email"
                id="FormControlInput2"
                name="email"
                placeholder="Tu Email"
                className="field"
                autoComplete="on"
                required
                value={formData.email}
                onChange={handleChange}
              />
              {/* campo para mostrar errores si es que los hay */}
              {formErrors.email && <span className="error">{formErrors.email}</span>}
              <input
                type="submit"
                name="send"
                value="INSCRIBIRSE"
                className="send-button red-button"
              />
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default Newsletter;