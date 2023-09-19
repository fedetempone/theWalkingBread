import { HashRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from 'components/scrollToTop/ScrollToTop';
import Layout from 'components/layout/Layout';
import Home from 'components/home/Home';
import Contact from 'components/contact/Contact';
import Cart from 'components/cart/Cart';
import Products from 'components/products/Products';
import AboutUs from 'components/aboutUs/AboutUs';
import ProductDetail from 'components/productDetail/ProductDetail';
import { CartProvider } from 'components/cartProvider/CartProvider';
import ProductList from 'components/productList/ProductList';


function App() {
  return (
    <CartProvider>
      {/* //utilizo el hashrouter porque el browserrouter no es compatible con github */}
        <HashRouter>
          <ScrollToTop /> {/*hago que la pagina siempre cargue con el scroll de arriba hacia abajo */}
          <Routes>
            <Route path="/" element={(<Layout><Home/></Layout>)}
              exact
              // aca si no pongo el exact siempre se me renderizaria el componente que
              // que contenga (path="/") entonces si estoy en la page /sandwiches
              // con path=/sandwiches, renderizando el componente productList
              // el componente nunca se mostraria y en su lugar se mostraria
              // el componente que este dentro de "path=/" en este caso Home. 
            />
            <Route
              path="/contact" element={(<Layout><Contact/></Layout>)}
            />
            <Route
              path="/cart" element={(<Layout><Cart/></Layout>)}
            />
            <Route
              path="/productos" element={(<Layout><Products/></Layout>)}
            />
            <Route
              path="/about" element={(<Layout><AboutUs/></Layout>)}
            />
            {/* ↓↓↓ esto muestra los links de /sandwiches, /pasteleria, /panaderia ↓↓↓ */}
            <Route 
              path="/:collectionName" element={(<Layout><ProductList/></Layout>)} 
            /> 
            <Route path="/productos/:collectionName/:productName" element={<Layout><ProductDetail/></Layout>} />
          </Routes>
        </HashRouter>
    </CartProvider>
  );
}

export default App;