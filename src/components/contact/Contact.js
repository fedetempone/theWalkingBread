import '../contact/contact.css';
import Swal from 'sweetalert2';

function Contact() {
  const message = `\n Nuestro horario de atención es de Lunes a Viernes de 07:00 a 21hs. Ante consultas o sugerencias, déjanos tu mensaje. ¡Gracias!`;

  const validateForm = () => {
    const username = document.getElementById('FormControlInput1').value;
    const email = document.getElementById('FormControlInput2').value;
    const mensaje = document.getElementById('FormControlTextarea1').value;

    const errors = {};

    if (username === '') {
      errors.username = 'El campo "Nombre" es obligatorio.';
    } else if (!/^[A-Z][a-zA-Z0-9-_. ]+$/.test(username)) {
      errors.username = 'El campo "Nombre" debe comenzar con una letra Mayúscula y no puede contener números, símbolos ni espacios al principio.';
    }

    if (email === '') {
      errors.email = 'El campo "Email" es obligatorio.';
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      errors.email = 'Ingresa un correo electrónico válido.';
    }

    if (mensaje === '') {
      errors.mensaje = 'El campo "Mensaje" es obligatorio y debe tener al menos 10 caracteres.';
    } else if (mensaje.length < 10) {
      errors.mensaje = 'El campo "Mensaje" debe tener al menos 10 caracteres.';
    }

    const errorElements = document.getElementsByClassName('error');
    for (const errorElement of errorElements) {
      errorElement.innerHTML = '';
    }

    for (const fieldName in errors) {
      const errorElement = document.getElementById(`${fieldName}-error`);
      if (errorElement) {
        errorElement.innerHTML = errors[fieldName];
      }
    }

    return Object.keys(errors).length === 0; 
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      Swal.fire({
        icon: 'success',
        title: '¡Mensaje enviado!',
        text: 'Gracias por tu mensaje. Te responderemos pronto.',
        showConfirmButton: true,
        timer: 5000, 
        willClose: () => {
          const form = event.target;
          form.submit();
        },
      });
    }
  };

  return (
    <>
      <section id="container-form">
        <div className="info-form">
          <h2>Contactanos</h2>
          <h3>Trabajamos por pedidos. <div className="new-line">{message}</div></h3>
          <a href="https://instagram.com"><i className="fa-brands fa-instagram"></i> Seguinos en Instagram</a>
          <a href="https://facebook.com"><i className="fa-brands fa-facebook"></i> Seguinos en Facebook </a>
          <a href="https://wa.me/1130607355?text=Me%20gustaría%20hacerte%20un%20pedido%20"><i className="fa fa-phone"></i> 1130607355</a>
          <a href="mailto:fedetempone5@gmail.com"><i className="fa fa-envelope"></i> pedidos@thewalkingbread.com</a>
        </div>

        <form action="https://formspree.io/f/xnqkoaek" method="POST" onSubmit={handleSubmit}>
          <input type="text" id="FormControlInput1" name="username" placeholder="Tu Nombre" className="field" autoComplete="username" required />
          <span id="username-error" className="error"></span>
          <input type="email" id="FormControlInput2" name="email" placeholder="Tu Email" className="field" autoComplete="on" required />
          <span id="email-error" className="error"></span>
          <textarea id="FormControlTextarea1" name="mensaje" placeholder="Tu Mensaje..." required></textarea>
          <span id="mensaje-error" className="error"></span>
          <input type="submit" name="send" value="Enviar Mensaje" className="send-button" />
        </form>
      </section>
    </>
  );
}

export default Contact;







// import '../contact/contact.css';
// import Swal from 'sweetalert2';

// function Contact() {
//   const message = `\n Nuestro horario de atencion es de Lunes a Viernes de 07:00 a 21hs, ante consultas o sugerencias dejanos tu mensaje. Gracias !`;

//   const validateForm = () => {
//     const username = document.getElementById('FormControlInput1').value;
//     const email = document.getElementById('FormControlInput2').value;
//     const mensaje = document.getElementById('FormControlTextarea1').value;

//     const errors = {};

//     if (username === '') {
//       errors.username = 'El campo "Nombre" es obligatorio.';
//     } else if (!/^[A-Z][a-zA-Z0-9-_. ]+$/.test(username)) {
//       errors.username = 'El campo "Nombre" debe comenzar con una letra Mayuscula y no puede contener números, símbolos ni espacios al principio.';
//     }

//     if (email === '') {
//       errors.email = 'El campo "Email" es obligatorio.';
//     } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
//       errors.email = 'Ingresa un correo electrónico válido.';
//     }

//     if (mensaje === '') {
//       errors.mensaje = 'El campo "Mensaje" es obligatorio y debe tener como mínimo 10 caracteres.';
//     } else if (mensaje.length < 10) {
//       errors.mensaje = 'El campo "Mensaje" debe tener como mínimo 10 caracteres.';
//     }

//     // Limpia los errores anteriores
//     const errorElements = document.getElementsByClassName('error');
//     for (const errorElement of errorElements) {
//       errorElement.innerHTML = '';
//     }

//     // Muestra los errores en el formulario
//     for (const fieldName in errors) {
//       const errorElement = document.getElementById(`${fieldName}-error`);
//       if (errorElement) {
//         errorElement.innerHTML = errors[fieldName];
//       }
//     }

//     return Object.keys(errors).length === 0; // Devuelve true si no hay errores
//   };

//   // const handleSubmit = (event) => {
//   //   event.preventDefault();

//   //   if (validateForm()) {
//   //     // Todas las validaciones pasaron, puedes enviar el formulario a Formspree aquí
//   //     const form = event.target;
//   //     form.submit();

//   //     // Muestra una alerta de éxito con SweetAlert
//   //     Swal.fire({
//   //       icon: 'success',
//   //       title: '¡Mensaje enviado!',
//   //       text: 'Gracias por tu mensaje. Te responderemos pronto.',
//   //       showConfirmButton: true,
//   //       timer: 9000,
//   //     });

//   //     // Limpia el formulario
//   //     form.reset();
//   //   }
//   // };
//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     if (!validateForm()) {
//       return;
//     }
  
//     const form = document.querySelector('form');
//     form.submit();
  
//     // Espera a que Formspree complete su acción antes de mostrar el SweetAlert
//     await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos (ajusta este valor según sea necesario)
  
//     // Muestra el SweetAlert
//     Swal.fire({
//       icon: 'success',
//       title: '¡Mensaje enviado!',
//       text: 'Gracias por tu mensaje. Te responderemos pronto.',
//       timer: 5000, // 5000 milisegundos (5 segundos)
//       showConfirmButton: true,
//     });
//   };

//   return (
//     <>
//       <section id="container-form">
//         <div className="info-form">
//           <h2>Contactanos</h2>
//           <h3>Trabajamos por pedidos. <div className="new-line">{message}</div></h3>
//           <a href="https://instagram.com"><i className="fa-brands fa-instagram"></i> Seguinos en Instagram</a>
//           <a href="https://facebook.com"><i className="fa-brands fa-facebook"></i> Seguinos en Facebook </a>
//           <a href="https://wa.me/1130607355?text=Me%20gustaría%20hacerte%20un%20pedido%20"><i className="fa fa-phone"></i> 1130607355</a>
//           <a href="mailto:fedetempone5@gmail.com"><i className="fa fa-envelope"></i> pedidos@thewalkingbread.com</a>
//         </div>

//         <form action="https://formspree.io/f/xnqkoaek"  onSubmit={handleSubmit}>
//           <input type="text" id="FormControlInput1" name="username" placeholder="Tu Nombre" className="field" autoComplete="username" required />
//           <span id="username-error" className="error"></span>
//           <input type="email" id="FormControlInput2" name="email" placeholder="Tu Email" className="field" autoComplete="on" required />
//           <span id="email-error" className="error"></span>
//           <textarea id="FormControlTextarea1" name="mensaje" placeholder="Tu Mensaje..." required></textarea>
//           <span id="mensaje-error" className="error"></span>
//           <input type="submit" name="send" value="Enviar Mensaje" className="send-button" />
//         </form>
//       </section>
//     </>
//   );
// }

// export default Contact;




// import '../contact/contact.css';

// function Contact() {
//   const message = `\n Nuestro horario de atencion es de Lunes a Viernes de 07:00 a 21hs, ante consultas o sugerencias dejanos tu mensaje. Gracias !`;
//   return (
//     <>
//       <section id="container-form">
//         <div className="info-form">
//           <h2>Contactanos</h2>
//           <h3>Trabajamos por pedidos. <div className="new-line">{message}</div></h3>
//           <a href="https://instagram.com"><i className="fa-brands fa-instagram"></i> Seguinos en Instagram</a>
//           <a href="https://facebook.com"><i className="fa-brands fa-facebook"></i> Seguinos en Facebook </a>
//           <a href="https://wa.me/1130607355?text=Me%20gustaría%20hacerte%20un%20pedido%20"><i className="fa fa-phone"></i> 1130607355</a>
//           <a href="mailto:fedetempone5@gmail.com"><i className="fa fa-envelope"></i> pedidos@thewalkingbread.com</a>
//         </div>

//         <form action="">
//           <input type="text" id="FormControlInput1" name="username" placeholder="Tu Nombre" className="field" autoComplete="username" required />
//           <input type="email" id="FormControlInput2" name="email" placeholder="Tu Email" className="field" autoComplete="on" required />
//           <textarea id="FormControlTextarea1" name="mensaje" placeholder="Tu Mensaje..." required></textarea>
//           <input type="submit" name="send" value="Enviar Mensaje" className="send-button" />
//         </form>
//       </section>
//     </>
//   )
// }



// export default Contact;