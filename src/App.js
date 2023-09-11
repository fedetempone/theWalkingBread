import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from 'components/scrollToTop/ScrollToTop';
import Layout from 'components/layout/Layout';
import Home from 'components/home/Home';
import Contact from 'components/contact/Contact';
import Cart from 'components/cart/Cart';
import Products from 'components/products/Products';
import AboutUs from 'components/aboutUs/AboutUs';
import PanaderiaPage from '../src/components/panaderia/PanaderiaPage';
import SandwichesPage from '../src/components/sandwiches/SandwichesPage';
import PasteleriaPage from '../src/components/pasteleria/PasteleriaPage';
import ProductDetail from 'components/productDetail/ProductDetail';

function App() {
  return (
    //utilizo el hashrouter porque el browserrouter no es compatible con github
    <HashRouter>
       <ScrollToTop /> {/*hago que la pagina siempre cargue con el scroll de arriba hacia abajo */}
      <Routes>
        <Route path="/" element={(<Layout><Home/></Layout>
        )}
          exact
          // aca si no pongo el exact siempre se me renderizaria el componente que
          // que contenga (path="/") entonces si estoy en la page /sandwich 
          // con path=/sandwich, renderizando el componente sandwichesPage
          // el componente sandwichesPage nunca se mostraria y en su lugar se mostraria
          // el componente que este dentro de "path=/" en este caso Home. 
        />
        <Route
          path="/contact" element={(<Layout><Contact/></Layout>
          )}
        />
        <Route
          path="/cart" element={(<Layout><Cart/></Layout>
          )}
        />
        <Route
          path="/productos" element={(<Layout><Products/></Layout>
          )}
        />
        <Route
          path="/about" element={(<Layout><AboutUs/></Layout>
          )}
        />
        <Route
          path="/panaderia" element={(<Layout><PanaderiaPage/></Layout>)}
        />
        <Route
          path="/sandwiches" element={(<Layout><SandwichesPage/></Layout>)}
        />
        <Route
          path="/pasteleria" element={(<Layout><PasteleriaPage/></Layout>)}
        />
        <Route path="/productos/:collectionName/:productName" element={<ProductDetail/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
