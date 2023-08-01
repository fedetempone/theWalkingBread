import Navbar from '../navbar/Navbar'
import '../home/home.css'
import Footer from '../footer/Footer';

function Home() {
  return (
    <>  
      <div className='hola'>
          <Navbar/>
            <div className='content banner-container clearfix'>
            {/* la imagen se mete aca adentro desde css */}
            </div>
            <div className="banner-text">
              <p>SABORES QUE DESPIERTAN DE ENTRE LOS MUERTOS</p>
            </div>
      </div>
      <Footer/>
    </>
    
  )
}

export default Home;