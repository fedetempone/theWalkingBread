import React, { useState } from 'react';

function ZoomImg({src, propName}) {
  const [transform, setTransform] = useState('scale(1)');
    const handleMouseMove = (e) => {
        const image = e.currentTarget;
        const { left, top, width, height } = image.getBoundingClientRect();
        const mouseX = e.clientX - left;
        const mouseY = e.clientY - top;
        const centerX = width / 2;
        const centerY = height / 2;
        const xOffset = (mouseX - centerX) / centerX;
        const yOffset = (mouseY - centerY) / centerY;
    
        const scale = 1.5; // escala
        const translateX = -xOffset * 150; // velocidad de desplazamiento
        const translateY = -yOffset * 150; // velocidad de desplazamiento
    
        setTransform(`scale(${scale}) translate(${translateX}px, ${translateY}px)`);
      };
    
    
      const handleMouseLeave = () => {
        // Restablece el zoom cuando saco el mouse de arriba de la foto
        setTransform('scale(1) translate(0, 0)');
      };
    
  return (
    <img className='img-product-detail zoom-img'
      src={src}
      alt={propName}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
}

export default ZoomImg;