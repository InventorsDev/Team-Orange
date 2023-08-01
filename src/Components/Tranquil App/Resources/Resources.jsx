import homeBlack from "../Assets/homeBlack.svg";
import resourcesGreen from "../Assets/resourcesGreen.svg";
import goalsBlack from "../Assets/goalsBlack.svg";
import communityBlack from "../Assets/communityBlack.svg";
import profileBlack from "../Assets/profileBlack.svg";
import Spinner from "../../Spinner";
import Footer from "../Footer";
import { preloadImages } from "../../Globals";
import { useEffect, useState } from "react";

function Resources() {
     var [isImagesLoading, setImagesLoaded] = useState(false);
     useEffect(() => {
          const imagesToPreload = [
               homeBlack,
               resourcesGreen,
               goalsBlack,
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
          resources: resourcesGreen,
          goals: goalsBlack,
          community: communityBlack,
          profile: profileBlack,
     };
     return (
          <div>
               {isImagesLoading === false ? <Spinner /> : null}
               <p>Resource</p>
               <Footer currentPage="resources" image={images} />
          </div>
     );
}

export default Resources;
