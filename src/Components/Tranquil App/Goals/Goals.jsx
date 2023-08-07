import "./Goals.css";
import Goal from "../Assets/Goals.svg";
import Spinner from "../../Spinner";
import { useState, useEffect } from "react";
import { preloadImages } from "../../Globals";

function Goals() {
     var [isImagesLoading, setImagesLoaded] = useState(false);
     useEffect(() => {
          const imagesToPreload = [Goal];
          preloadImages(imagesToPreload)
               .then(() => {
                    const imageTimer = setTimeout(() => {
                         setImagesLoaded(true);
                    }, 1000);

                    return () => {
                         clearTimeout(imageTimer);
                    };
               })
               .catch((error) => {
                    console.log("Error Loading Images", error);
               });
     }, []);

     return (
          <div className="Goals">
               {isImagesLoading === false ? <Spinner /> : null}
               <header>
                    <h1>Goal Setting</h1>
               </header>
               <div className="Image">
                    <img src={Goal} alt="" />
               </div>
               <div className="Paragraph">
                    <p>
                         Setting goals is an important part of achieving success
                         and happiness in life. By setting clear, specific
                         goals, you can focus your energy and efforts on the
                         things that matter most to you, and make steady
                         progress towards achieving your dreams.
                    </p>
                    <button>Add a goal</button>
               </div>
          </div>
     );
}

export default Goals;
