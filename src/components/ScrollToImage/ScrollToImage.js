import React, { Component } from 'react';
import panaderiaVideo from '../../videos/bakery.mp4';
import './ScrollToImage.css';

class ScrollToImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrolled: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  // cuando el usuario scrollea hacia abajo y llega al breakpoint comienza el efecto
  // breakpoint es el punto de quiebre vertical de la pagina donde su valor es 300px
  // entonces de arriba hacia abajo cuando comienza el scroll y supera los 300px
  // aplica el efecto cambiando el valor de isScrolled a true
  handleScroll = () => {
    const breakpoint = 300;

    if (window.scrollY >= breakpoint) {
      this.setState({ isScrolled: true });
    } else {
      this.setState({ isScrolled: false });
    }
  };

  render() {
    const { isScrolled } = this.state;

    return (
      // si isScrolled es true entonces aplico la clase scrolled al containerScrollEffect
      // si es false entonces no hago nada. obviamente el efecto lo esta haciendo la clase
      // scrolled. Desde este codigo solo controlamos cuando y como controlar el scroll.
      <div className={`containerScrollEffect ${isScrolled ? 'scrolled' : ''}`}>
        <div className="background-image"></div>
        <div className="video">
            <h2 className='zombieTextCorrection'>VIDEO PRESENTACION</h2>
            <div className="underline"></div>
            <iframe title="Video de Presentación" src={panaderiaVideo} allowFullScreen />
        </div>
      </div>
    );
  }
}

export default ScrollToImage;
