import { useState,  useRef } from 'react';
import './intro.css';
import image1 from '../Assets/i-pic1.svg';
import image2 from '../Assets/i-pic2.svg';
import image3 from '../Assets/i-pic3.svg';
import image4 from '../Assets/i-pic3.svg';


function Intro ()  {

const [slideboxpos, setSlideboxpos] = useState(0);
const slideRef = useRef();

const handleScroll = () => {
    const totalwidth = slideRef.current.scrollWidth;
    const scrollAmount = slideRef.current.scrollLeft;

    setSlideboxpos(
     Math.round( 4 *( (scrollAmount + totalwidth/4) /totalwidth ) )
    )

    return slideboxpos ;
};



  return (
    <div className='I--page'>

       <div className='slidebox' ref={slideRef} onScroll={handleScroll}>

           {/* <button className='button left' onClick={handleScrollLeft}></button>    
           <button className='button right' onClick={handleScrollRight}></button> */}
         
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

      <div className='dots'>
             <div className='dot dt1'></div>
             <div className='dot dt2'></div>
             <div className='dot dt3'></div>
             <div className='dot dt3'></div>
      </div>

    </div>

  );
};

export default Intro;





