import homeBlack from "../Assets/homeBlack.svg";
import resourcesBlack from "../Assets/resourcesBlack.svg";
import goalsGreen from "../Assets/goalsGreen.svg";
import communityBlack from "../Assets/communityBlack.svg";
import profileBlack from "../Assets/profileBlack.svg";
import Spinner from "../../Spinner";
import Footer from "../Footer";
import { useState, useEffect } from "react";
import { preloadImages } from "../../Globals";

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
          <div>
               {isImagesLoading === false ? <Spinner /> : null}
               <p>Goals</p>;
               <Footer currentPage="goals" image={images} />
          </div>
     );
}

export default Goals;
