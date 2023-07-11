import { useState, useRef } from "react";
import "./Slides.css"; //css as usual
import image1 from "../../../Assets/i-pic1.svg";
import image2 from "../../../Assets/i-pic2.svg";
import image3 from "../../../Assets/i-pic3.svg";
import image4 from "../../../Assets/i-pic4.svg";
import { First, Second, Third, Fourth } from "./SlideTexts"; //these are whar we call react jsx elements. they return html, you,ll find their syntax in the slidesText.jsx file
import { Link } from "react-router-dom"; //A neccessary import for navigation

function Slides() {
     var [slideboxpos, setSlideboxpos] = useState(1);
     const slideRef = useRef();

     const handleScroll = () => {
          const totalwidth = slideRef.current.scrollWidth;
          const scrollAmount = slideRef.current.scrollLeft;

          setSlideboxpos(
               Math.round(4 * ((scrollAmount + totalwidth / 4) / totalwidth))
          );
     }; //These are some maths logic to handle scrolling of the images . They're quite complex to be frank but this had to be done so that it would work

     const handleScrollLeft = (e) => {
          e.preventDefault();
          if (slideboxpos > 1) {
               setSlideboxpos((slideboxpos -= 1));
               const totalwidth = slideRef.current.scrollWidth;
               slideRef.current.scrollLeft -= totalwidth / 4;
          }
     };

     const handleScrollRight = (e) => {
          e.preventDefault();
          if (slideboxpos < 4) {
               setSlideboxpos((slideboxpos += 1));
               slideRef.current.scrollLeft += slideRef.current.scrollWidth / 4;
          }
     };

     var content;

     switch (slideboxpos) {
          case 1:
               content = <First />;
               break;
          case 2:
               content = <Second />;
               break;
          case 3:
               content = <Third />;
               break;
          case 4:
               content = <Fourth />;
               break;
          default:
               content = "";
     } //I'm switching the content to be displayed under the images depending on whcih image it is

     return (
          <div className={`Slides ${slideboxpos === 4 && "show"} `}>
               {/* You should be familiar with this right? Anyways, I set the classname show to hwne the slidebox is in number 4. Then i toggle the css properties of normal the div by putting some styles to Slides and another to Slides.show the classnmae becomes Slides.show when the box is no 4, shey you get*/}
               <div className={`circle ${slideboxpos === 3 && "active"}`}></div>
               <div className="ImageSlides">
                    <button
                         className="button left"
                         onClick={handleScrollLeft}
                    ></button>
                    <button
                         className="button right"
                         onClick={handleScrollRight}
                    ></button>
                    <div
                         className="slidebox"
                         ref={slideRef}
                         onScroll={handleScroll}
                    >
                         <span className="slides">
                              <img
                                   src={image1}
                                   alt="Say Hi"
                                   className="image mg1"
                                   loading="lazy"
                              />
                         </span>

                         <span className="slides">
                              <img
                                   src={image2}
                                   alt="Set Your Goals"
                                   className="image mg2"
                                   loading="lazy"
                              />
                         </span>

                         <span className="slides">
                              <img
                                   src={image3}
                                   alt="Discover Exercises"
                                   className="image mg3"
                                   loading="lazy"
                              />
                         </span>

                         <span className="slides">
                              <img
                                   src={image4}
                                   alt="Track your Progress"
                                   className="image mg4"
                                   loading="lazy"
                              />
                         </span>
                    </div>
               </div>
               <div className={slideboxpos === 4 ? "background" : ""}>
                    {/* The four dots and functions to set corresponding image when clicked*/}
                    <div className="dots">
                         <div
                              className={`dot ${
                                   slideboxpos === 1 ? "active" : ""
                              }`}
                              onClick={() => {
                                   setSlideboxpos(1);
                                   slideRef.current.scrollLeft = 0;
                              }}
                         ></div>
                         <div
                              className={`dot ${
                                   slideboxpos === 2 ? "active" : ""
                              }`}
                              onClick={() => {
                                   setSlideboxpos(2);
                                   slideRef.current.scrollLeft =
                                        slideRef.current.scrollWidth / 4;
                              }}
                         ></div>
                         <div
                              className={`dot ${
                                   slideboxpos === 3 ? "active" : ""
                              }`}
                              onClick={() => {
                                   setSlideboxpos(3);
                                   slideRef.current.scrollLeft =
                                        slideRef.current.scrollWidth / 2;
                              }}
                         ></div>
                         <div
                              className={`dot ${
                                   slideboxpos === 4 ? "active" : ""
                              }`}
                              onClick={() => {
                                   setSlideboxpos(4);
                                   slideRef.current.scrollLeft =
                                        slideRef.current.scrollWidth;
                              }}
                         ></div>
                    </div>

                    <div className="introsDiv">{content}</div>

                    <div
                         className={`getStarted ${
                              slideboxpos === 4 && "active"
                         }`}
                    >
                         <Link to="/createAccount">
                              <button
                                   disabled={slideboxpos === 4 ? false : true}
                              >
                                   Let's Get Started
                              </button>
                         </Link>
                    </div>
               </div>
          </div>
     );
}

export default Slides;
