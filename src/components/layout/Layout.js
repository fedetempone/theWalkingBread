import Navbar from 'components/navbar/Navbar';
import Footer from 'components/footer/Footer';
import './layout.css'

function Layout({ children }) {
  return (
    <div>
      <Navbar /> 
      <div className="contentLayout">
        {children} 
      </div>
      <Footer /> 
    </div>
  );
}

export default Layout;
