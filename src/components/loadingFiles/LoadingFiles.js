import './loadingFiles.css'
import React, { useState, useEffect } from 'react';

function LoadingFiles({ promise, children }) {
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
  }, [promise]);

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
