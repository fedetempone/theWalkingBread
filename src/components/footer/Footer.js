import './footer.css'
import img_logo from '../images/navlogo.png'

function Footer() {
  return (
    <>
     <footer className='clearfix'>
        <nav className="navFooter">
            <div className="navLinksFooter">
                <ul>
                    <li><a href="./html/shop.html">ABOUT US</a></li>
                    <li><a href="./html/login.html">QUALITY POLITICS</a></li>
                    <li><a href="./html/login.html">NEWSLETTER</a></li>
                    <li><a href="./html/contact.html">CONTACT</a></li>
                </ul>
            </div>
            <div className="logoFooter">
                <img src={img_logo} alt=""/>
            </div>
        </nav>
        <p>All Rights reserved 2023 - Joaco Rivas and Federico Tempone &copy;</p>
    </footer>
    </>
  )
}

export default Footer