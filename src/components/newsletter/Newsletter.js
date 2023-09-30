import React, { useState } from 'react';
import './newsletter.css'

function Newsletter() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
  });

  const [subscribed, setSubscribed] = useState(false);

  const handleInputChange = (e) => {
    const lettersOnlyPattern = /^[A-Za-z]+$/;
    const { name, value } = e.target;
    if (name === 'username' && !lettersOnlyPattern.test(value)) {
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newFormErrors = {
      username: '',
      email: '',
    };

    if (formData.username.trim() === '') {
      newFormErrors.username = 'POR FAVOR INGRESÁ UN NOMBRE VÁLIDO';
      isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (formData.email.trim() === '') {
      newFormErrors.email = 'EL EMAIL ES REQUERIDO';
      isValid = false;
    } else if (!emailPattern.test(formData.email)) {
      newFormErrors.email = 'EL EMAIL NO ES VALIDO';
      isValid = false;
    }

    setFormErrors(newFormErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubscribed(true);
    }
  };

  return (
    <>
      <div className="newsletterContainer">
        {subscribed ? (
          <div className="thankYouMessage">
            <p>¡Gracias por suscribirte a nuestro boletín informativo!</p>
            <p>Como agradecimiento, te ofrecemos un descuento exclusivo.</p>
            <p>Para obtenerlo, simplemente haz clic en el enlace que te hemos enviado por correo electrónico.</p>
            <p>¡Estamos emocionados de tenerte como parte de nuestra comunidad!</p>
          </div>
        ) : (
          <>
            <p>Inscribite para recibir descuentos <br /> y enterarte de nuestras ofertas !</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="FormControlInput1"
                name="username"
                placeholder="Tu Nombre"
                className="field"
                autoComplete="username"
                required
                onChange={handleInputChange}
              />
              {formErrors.username && <span className="error">{formErrors.username}</span>}
              <input
                type="email"
                id="FormControlInput2"
                name="email"
                placeholder="Tu Email"
                className="field"
                autoComplete="on"
                required
                onChange={handleInputChange}
              />
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
}

export default Newsletter;
