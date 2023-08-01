import Home from './components/home/Home';
import Contact from './components/contact/Contact';
import Cart from './components/cart/Cart';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Products from './components/products/Products';
import AboutUs from './components/aboutUs/AboutUs';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </HashRouter>
  );
}

export default App;


// import Home from './components/home/Home';
// import Contact from './components/contact/Contact'
// import Cart from './components/cart/Cart';
// import {Routes, Route, HashRouter } from 'react-router-dom';
// import Products from './components/products/Products';
// import AboutUs from './components/aboutUs/AboutUs';

// function App() {
//   return (
//       <HashRouter>
//         <Routes>
//           <Route path="#" element={<Home/>} />  
//           <Route path="#contact" element={<Contact/>} />  
//           <Route path="#cart" element={<Cart/>} />  
//           <Route path="#products" element={<Products/>} />  
//           <Route path="#about" element={<AboutUs/>} />  
//         </Routes>
//       </HashRouter>
//   );
// }

// export default App;
