import { useState,  useRef } from 'react';
import './intro.css';
import image1 from '../Assets/i-pic1.svg';
import image2 from '../Assets/i-pic2.svg';
import image3 from '../Assets/i-pic3.svg';
import image4 from '../Assets/i-pic4.svg';
import { First, Second, Third, Fourth } from './introComps';

function Intro ()  {

var [slideboxpos, setSlideboxpos] = useState(1);
const slideRef = useRef();

const handleScroll = () => {
    const totalwidth = slideRef.current.scrollWidth;
    const scrollAmount = slideRef.current.scrollLeft;

    setSlideboxpos(
     Math.round( 4 *( (scrollAmount + totalwidth/4) /totalwidth ) )
    )

    console.log( slideboxpos) ;
};

// const handleScrollLeft = () => {
//   if (slideboxpos > 1) {
//   setSlideboxpos(slideboxpos -= 1)
//   const totalwidth = slideRef.current.scrollWidth;
//   slideRef.current.scrollLeft -= totalwidth/4
//   }
// } 

// const handleScrollRight = () => {
//   if (slideboxpos < 4) {
//   setSlideboxpos(slideboxpos += 1) 
//   const totalwidth = slideRef.current.scrollWidth;
//   slideRef.current.scrollLeft += totalwidth/4
//   }
// } 

  return (
    <div className='I--page'>

      <div className={`circle ${slideboxpos === 3 && 'active'}`}>

      </div>
      <div className='buttons'>
           {/* <button className='button left' onClick={handleScrollLeft}></button>    
           <button className='button right' onClick={handleScrollRight}></button>  */}
       <div className='slidebox' ref={slideRef} onScroll={handleScroll}>
         
            <span className='slides'>
                 <img src={image1} alt='' className='image mg1'/>
             </span>

             <span className='slides'>
                 <img src={image2} alt='' className='image mg2'/>
             </span>

             <span className='slides'>
                 <img src={image3} alt='' className='image mg3'/>
             </span>

             <span className='slides'>
                 <img src={image4} alt='' className='image mg4'/>
             </span>

      </div>
      </div>

      <div className='dots'>
             <div className= {`dot ${slideboxpos === 1 ? 'active' : ''}`}></div>
             <div className= {`dot ${slideboxpos === 2 ? 'active' : ''}`}></div>
             <div className= {`dot ${slideboxpos === 3 ? 'active' : ''}`}></div>
             <div className= {`dot ${slideboxpos === 4 ? 'active' : ''}`}></div>
      </div>

    <div className='introsDiv'>
      { slideboxpos === 1 && <First />}
      { slideboxpos === 2 && <Second /> }
      { slideboxpos === 3 && <Third /> }
      { slideboxpos === 4 && <Fourth /> }
      
    </div>

    <div className={`getStarted ${slideboxpos === 4 && 'active'}`}>
      <button>Let's Get Started</button>
    </div>

    </div>

  );
};

export default Intro;





