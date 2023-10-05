import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './sliderBanner.css';
import img_1 from '../../images/bannerzombiemain.jpg';
import img_2 from '../../images/bannerpanlactal.png';
import img_3 from '../../images/bannerrealistic.jpg';

const SliderBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-wrapper">
      <Carousel
        autoPlay={false}
        infiniteLoop={true}
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        selectedItem={currentSlide}
        onChange={(index) => setCurrentSlide(index)}
      >
        <div className="slide-item">
          <img src={img_1} alt="Imagen 1" />
          <div className="text-overlay-banner">
            <p>Sabores que Despiertan de Entre los Muertos</p>
          </div>
        </div>
        <div className="slide-item">
          <img src={img_2} alt="Imagen 2" />
          <div className="text-overlay-banner">
            <p>La Panaderia que Abraza lo Sobrenatural</p>
          </div>
        </div>
        <div className="slide-item">
          <img src={img_3} alt="Imagen 3" />
          <div className="text-overlay-banner">
            <p>Sabor Unico, Tematica Aterradora TheWalkingBread</p>
          </div>
        </div>
      </Carousel>
      <div className="slide-indicator">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}  

export default SliderBanner;
