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
    // el e.target toma el elemento del DOM que descandeno el cambio
    // en este caso el input. En este caso en particular el input tiene un name "username"
    // entonces name va a equivaler a "username" o name va a equivaler a "email" porque
    // ambos input tanto el que tiene el name username como el que tiene el name email estan
    // invocando a la misma funcion. Y value sera lo que el usuario vaya ingresando en este input.
    const { name, value } = e.target;
    // entonces aca hago un condicional y pregunto, che el input que desencadeno la funcion
    // tiene en su atributo name "username" ? si es afirmativo entonces vuelvo a preguntar
    // y ademas lo que esta ingresando actualmente el usuario en el input (value) NO coincide con
    // la condicion que estoy poniendo en "lettersOnlyPattern"? (que sean solo letras), si es afirmativo
    // entonces muestro el error porque lo que escribio el usuario SI tiene que coincidir con letersonlypattern. 
    // el error lo muestro actualizando setFormErros creando una copia del mismo.
    if (name === 'username' && !lettersOnlyPattern.test(value)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        username: 'No puedes ingresar números en el nombre.',
      }));
      // si la condicion no se cumple entonces quiere decir que el usuario no ingreso numeros y en su lugar
      // ingreso los datos correctamente. Entonces borro los errores si es que habian sido ejecutados.
      // y nuevamente creo una copia del objeto setFormErrors para actualizarlo.
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        username: '',
      }));
    }
    // por ultimo creo una copia del objeto formData y actualizo al mismo con 
    // esta nueva copia, pasandole los nuevos valores que ha ingresado el usuario.
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // funcion para validar el formulario al principio el formulario sera valido hasta que
  // se detecte algun error.
  const validateForm = () => {
    let isValid = true;
    // creo una variable newFormErrors para detectar potenciales errores.
    const newFormErrors = {
      username: '',
      email: '',
    };

    // empiezo con la validacion. si el campo username esta en blanco a la hora de enviar
    // el formulario entonces actualizo la variable newformerrors con el error correspondiente
    // y luego actualizo la variable isValid a false para que el formulario no se valide porque
    // se detectaron errores.
    if (formData.username.trim() === '') {
      newFormErrors.username = 'POR FAVOR INGRESÁ UN NOMBRE VÁLIDO';
      isValid = false;
    }

    // si el email esta en blanco entonces hace lo mismo actualiza isValid a false y newformerrors
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (formData.email.trim() === '') {
      newFormErrors.email = 'EL EMAIL ES REQUERIDO';
      isValid = false;
      // si el campo no esta vacio el email tiene que tener el formato que correpsonde a la expresion 
      // regular emailPattern, si no coincide entonces otra vez actualiza todo con su error y demas.
    } else if (!emailPattern.test(formData.email)) {
      newFormErrors.email = 'EL EMAIL NO ES VALIDO';
      isValid = false;
    }

    // terminada la validacion actualiza el setFormErrors con o sin nuevos errores.
    setFormErrors(newFormErrors);
    // y finalmente devuelve el formulario validado en true o false dependiendo si se encontraron
    // o no se encontraron errores.
    return isValid;
  };

  // cuando se envia el formulario ejecuto esta funcion para corroborar si la funcion de
  // validacion devolvio true o false, si devolvio true entonces actualizo el estado de 
  // setSuscribed para mostrar el mensaje de suscripcion exitosa. En cambio si devuelve
  // false no se muestra ninung mensaje de suscripcion exitosa y en su lugar se van a 
  // mostrar los mensajes de error dentro de validateForm.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubscribed(true);
    }
  };

  return (
    <>
      <div className="newsletterContainer">
        {/* si suscribed es true entonces muestro el mensajito de suscripcion */}
        {subscribed ? (
          <div className="thankYouMessage">
            <p>¡Gracias por suscribirte a nuestro boletín informativo!</p>
            <p>Como agradecimiento, te ofrecemos un descuento exclusivo.</p>
            <p>Para obtenerlo, simplemente haz clic en el enlace que te hemos enviado por correo electrónico.</p>
            <p>¡Estamos emocionados de tenerte como parte de nuestra comunidad!</p>
          </div>
          // si suscribed es false entonces muestro estos elementos.
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
              {/* si formErrors.username esta vacia no muestro el span de error, si formErrores tiene errores
                  entonces muestro renderizo el elemento span mostrando el error de formErorrs
              */}
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
              {/* si formErrors.username esta vacia no muestro el span de error, si formErrores tiene errores
                  entonces muestro renderizo el elemento span mostrando el error de formErorrs
              */}
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
