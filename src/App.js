import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from 'components/layout/Layout';
import Home from 'components/home/Home';
import Contact from 'components/contact/Contact';
import Cart from 'components/cart/Cart';
import Products from 'components/products/Products';
import AboutUs from 'components/aboutUs/AboutUs';
import PanaderiaPage from '../src/components/panaderia/PanaderiaPage';
import SandwichesPage from '../src/components/sandwiches/SandwichesPage';
import PasteleriaPage from '../src/components/pasteleria/PasteleriaPage';
import ProductDetail from 'productDetail/ProductDetail';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" 
        element={(
          <Layout>
            <Home />
          </Layout>
        )}
          exact
        />
        <Route
          path="/contact"
          element={(
            <Layout>
              <Contact />
            </Layout>
          )}
        />
        <Route
          path="/cart"
          element={(
            <Layout>
              <Cart />
            </Layout>
          )}
        />
        <Route
          path="/productos"
          element={(
            <Layout>
              <Products />
            </Layout>
          )}
        />
        <Route
          path="/about"
          element={(
            <Layout>
              <AboutUs />
            </Layout>
          )}
        />
        <Route
          path="/panaderia"
          element={(
            <Layout>
              <PanaderiaPage />
            </Layout>
          )}
        />
        <Route
          path="/sandwich"
          element={(
            <Layout>
              <SandwichesPage />
            </Layout>
          )}
        />
        <Route
          path="/pasteleria" element={(<Layout><PasteleriaPage /></Layout>)}
        />
        <Route path="/productos/:productName" element={<ProductDetail />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
