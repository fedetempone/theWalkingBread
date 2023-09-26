import './footer.css'
import img_logo from '../../images/navlogo.png'

function Footer() {
  return (
    <>
     <footer className='clearfix'>
        <nav className="navFooter">
            <div className="navLinksFooter">
                <ul>
                    <li><a href="/about">ABOUT US</a></li>
                    <li><a href="/">QUALITY POLITICS</a></li>
                    <li><a href="/">NEWSLETTER</a></li>
                    <li><a href="/contact">CONTACT</a></li>
                </ul>
            </div>
            <div className="logoFooter">
                <img src={img_logo} alt=""/>
            </div>
        </nav>
        <p>All Rights reserved 2023 - Federico Tempone &copy;</p>
    </footer>
    </>
  )
}

export default Footer