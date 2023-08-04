import homeBlack from "../Assets/homeBlack.svg";
import resourcesBlack from "../Assets/resourcesBlack.svg";
import goalsGreen from "../Assets/goalsGreen.svg";
import communityBlack from "../Assets/communityBlack.svg";
import profileBlack from "../Assets/profileBlack.svg";
import Goal from "../Assets/Goals.svg";
import Spinner from "../../Spinner";
import Footer from "../Footer";
import { useState, useEffect } from "react";
import { preloadImages } from "../../Globals";
import "./Goals.css";

function Goals() {
     var [isImagesLoading, setImagesLoaded] = useState(false);
     useEffect(() => {
          const imagesToPreload = [
               homeBlack,
               resourcesBlack,
               goalsGreen,
               communityBlack,
               profileBlack,
          ];
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

     var images = {
          home: homeBlack,
          resources: resourcesBlack,
          goals: goalsGreen,
          community: communityBlack,
          profile: profileBlack,
     };

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
               </div>
               <button disabled>Coming Soon !</button>

               <Footer currentPage="goals" image={images} />
          </div>
     );
}

export default Goals;
