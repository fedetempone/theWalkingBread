import './loadingFiles.css'
import React, { useState, useEffect } from 'react';

function LoadingFiles({ promise, children }) {
  // a la funcion loading files le paso 2 props
  // el primer prop va a ser la promesa que necesito que se resuelva, 
  //mientras la promesa no es resuelta el loading
  // va a tener un valor de true y se va a mostrar el return cargando datos
  // cuando la promesa sea resuelta ya sea con o sin errores, el loading va a pasar a false
  // y se mostrara el resto del codigo sin el cargando datos.

  // el segundo prop es el children y este va a ser todo lo que ejecute dentro del componente
  // por ejemplo cuando quiera utilizar el loading voy a poner :
  //<LoadingFiles promise={() => "promesa a ejecutar"}>
  //  { loading ? codigo : codigo}
  //</LoadingFiles>
  // dentro de promise estoy ejecutando la primer prop
  // y dentro de {loading blablabla } estoy ejecutando el children. "ejemplo random"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    promise()
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [promise]);// aca le paso promise entre corchetes para cambiar el estado cada vez que la promise cambia.
                // es decir que estoy observando si hay cambios en la promesa y si los detecto entonces
                // ejecuto el efecto nuevamente.
 
  return loading ? (
    <>
      <div className="loading-container">
        <div className="chargingData"></div>
        <p>Cargando Datos</p>
      </div>
    </>
  ) : (
    children
  );
}

export default LoadingFiles;

