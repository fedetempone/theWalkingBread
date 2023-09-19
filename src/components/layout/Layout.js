import Navbar from 'components/navbar/Navbar';
import Footer from 'components/footer/Footer';
import { useCart } from 'components/cartProvider/CartProvider';
import './layout.css'


// creo un contenedor llamado layout que envuelve los componentes que inserte en el
// y siempre va a contener el navbar y el footer, es para tener contenido dinamico
// saco a children como prop y cuando utilizo <Layout><componente/></Layout> 
// el componente seria el children de layout.
// es decir esto lo uso para envolver y mostrar un contenido especifico 
// pero a su vez mostrar tambien siempre el navbar y el footer .
function Layout({ children }) {
  const { cartItems } = useCart();
  return (
    <div>
      <Navbar cartItems={cartItems} />
      <div className="contentLayout">
        {children} 
      </div>
      <Footer /> 
    </div>
  );
}

export default Layout;
