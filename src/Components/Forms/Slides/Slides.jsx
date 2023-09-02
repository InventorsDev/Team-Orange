import { useState, useRef } from "react";
import "./Slides.css";
import image1 from "../../../Assets/i-pic1.svg";
import image2 from "../../../Assets/i-pic2.svg";
import image3 from "../../../Assets/i-pic3.svg";
import image4 from "../../../Assets/i-pic4.svg";
import { First, Second, Third, Fourth } from "./SlideTexts";
import { Link } from "react-router-dom";

function Slides() {
    var [slideboxpos, setSlideboxpos] = useState(1);
    var content;
    var slideRef = useRef();

    const handleScroll = () => {
        const totalwidth = slideRef.current.scrollWidth;
        const scrollAmount = slideRef.current.scrollLeft;

        setSlideboxpos(
            Math.round(4 * ((scrollAmount + totalwidth / 4) / totalwidth))
        );
    };

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
    }

    return (
        <div className="Slides">
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
                        <img src={image1} alt="Say Hi" className="image mg1" />
                    </span>

                    <span className="slides">
                        <img
                            src={image2}
                            alt="Set Your Goals"
                            className="image mg2"
                        />
                    </span>

                    <span className="slides">
                        <img
                            src={image3}
                            alt="Discover Exercises"
                            className="image mg3"
                        />
                    </span>

                    <span className="slides">
                        <img
                            src={image4}
                            alt="Track your Progress"
                            className="image mg4"
                        />
                    </span>
                </div>
            </div>

            <div className="dots">
                <div
                    className={`dot ${slideboxpos === 1 ? "active" : ""}`}
                    onClick={() => {
                        if (window.innerWidth > 770) {
                            setSlideboxpos(1);
                            slideRef.current.scrollLeft = 0;
                        }
                    }}
                ></div>
                <div
                    className={`dot ${slideboxpos === 2 ? "active" : ""}`}
                    onClick={() => {
                        if (window.innerWidth > 770) {
                            setSlideboxpos(2);
                            slideRef.current.scrollLeft =
                                slideRef.current.scrollWidth / 4;
                        }
                    }}
                ></div>
                <div
                    className={`dot ${slideboxpos === 3 ? "active" : ""}`}
                    onClick={() => {
                        if (window.innerWidth > 770) {
                            setSlideboxpos(3);
                            slideRef.current.scrollLeft =
                                slideRef.current.scrollWidth / 2;
                        }
                    }}
                ></div>
                <div
                    className={`dot ${slideboxpos === 4 ? "active" : ""}`}
                    onClick={() => {
                        if (window.innerWidth > 770) {
                            setSlideboxpos(4);
                            slideRef.current.scrollLeft =
                                slideRef.current.scrollWidth;
                        }
                    }}
                ></div>
            </div>

            <div className="introsDiv">{content}</div>

            <div className={`getStarted ${slideboxpos === 4 && "active"}`}>
                <Link to="/tranquil/home">
                    <button disabled={slideboxpos === 4 ? false : true}>
                        Let's Get Started
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Slides;
