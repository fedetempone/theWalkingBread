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
