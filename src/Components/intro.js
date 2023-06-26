import React, { useState } from 'react';
import './intro.css';
import image1 from '../Assets/i-pic1.svg';
import image2 from '../Assets/i-pic2.svg';
import image3 from '../Assets/i-pic3.svg';
import image4 from '../Assets/i-pic3.svg';

function Intro ()  {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };
  const images =[
    image1, image2, image3, image4
 ]


  return (
    // <div className="image-slider">
    //   <div className="slider-container">
    //     {images.map((image, index) => (
    //       <div
    //         className={`slide ${index === activeIndex ? 'active' : ''}`}
    //         key={index}
    //       >
    //         <img src={image} alt={`Slide ${index + 1}`} />
    //       </div>
    //     ))}
    //   </div>
    //   <div className="dots-container">
    //     {images.map((_, index) => (
    //       <div
    //         className={`dot ${index === activeIndex ? 'active' : ''}`}
    //         key={index}
    //         onClick={() => handleDotClick(index)}
    //       ></div>
    //     ))}
    //   </div>
    // </div>

    <div>
      <div> Stuff happened
         <div><img /></div>
         <div><img /></div>
         <div><img /></div>
         <div><img /></div>
      </div>
    </div>
  );
};

export default Intro;





