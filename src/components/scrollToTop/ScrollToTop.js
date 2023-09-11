import { useLocation } from 'react-router-dom';
import React from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;

// utilizo este componente para que cada vez que se carga una ruta
// se cargue siempre de arriba hacia abajo para visualizar bien el contenido.
// lo estoy usando en app.js