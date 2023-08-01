import homeBlack from "../Assets/homeBlack.svg";
import resourcesBlack from "../Assets/resourcesBlack.svg";
import goalsBlack from "../Assets/goalsBlack.svg";
import communityGreen from "../Assets/communityGreen.svg";
import profileBlack from "../Assets/profileBlack.svg";
import Spinner from "../../Spinner";
import Footer from "../Footer";
import { useState, useEffect } from "react";
import { preloadImages } from "../../Globals";

function Community() {
     var [isImagesLoading, setImagesLoaded] = useState(false);
     useEffect(() => {
          const imagesToPreload = [
               homeBlack,
               resourcesBlack,
               goalsBlack,
               communityGreen,
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
          goals: goalsBlack,
          community: communityGreen,
          profile: profileBlack,
     };

     return (
          <div>
               {isImagesLoading === false ? <Spinner /> : null}
               <p>Community</p>;
               <Footer currentPage="community" image={images} />
          </div>
     );
}

export default Community;
