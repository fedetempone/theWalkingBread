import Home from './components/home/Home';
import Contact from './components/contact/Contact';
import Cart from './components/cart/Cart';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Products from './components/products/Products';
import AboutUs from './components/aboutUs/AboutUs';
import PanaderiaPage from './components/panaderia/PanaderiaPage';
import SandwichesPage from './components/sandwiches/SandwichesPage';
import PasteleriaPage from './components/pasteleria/PasteleriaPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/panaderia" element={<PanaderiaPage/>} />
        <Route path="/sandwich" element={<SandwichesPage/>} />
        <Route path="/pasteleria" element={<PasteleriaPage/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
