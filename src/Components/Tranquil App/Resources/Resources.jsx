import "./Resources.css";
import backwards from "../Assets/backwardsArrow.svg";
import Articles from "../Assets/Articles.svg";
import Videos from "../Assets/Videos.svg";
import Materials from "../Assets/Materials.svg";
import Listen from "../Assets/Listen.svg";
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
               backwards,
               Articles,
               Videos,
               Materials,
               Listen,
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

     var [showAlert, setShowAlert] = useState(false);
     return (
          <div className="ResourcesPage">
               {isImagesLoading === false ? <Spinner /> : null}
               {showAlert ? (
                    <div className="alert">
                         <p>Coming Soon !</p>
                    </div>
               ) : null}
               <div className="nav">
                    <img src={backwards} alt="" />
                    <div></div>
               </div>
               <header>
                    <h1>Resources</h1>
               </header>
               <div className="sections">
                    <div className="group">
                         <div>
                              <img src={Articles} alt="" />
                         </div>
                         <p>Articles</p>
                    </div>

                    <div
                         className="group"
                         onClick={() => {
                              setShowAlert(true);
                              var timer = setTimeout(() => {
                                   setShowAlert(false);
                              }, 1000);

                              return () => {
                                   clearTimeout(timer);
                              };
                         }}
                    >
                         <div>
                              <img src={Videos} alt="" />
                         </div>
                         <p>Videos</p>
                    </div>

                    <div
                         className="group"
                         onClick={() => {
                              setShowAlert(true);
                              var timer = setTimeout(() => {
                                   setShowAlert(false);
                              }, 2000);

                              return () => {
                                   clearTimeout(timer);
                              };
                         }}
                    >
                         <div>
                              <img src={Materials} alt="" />
                         </div>
                         <p>Materials</p>
                    </div>

                    <div
                         className="group"
                         onClick={() => {
                              setShowAlert(true);
                              var timer = setTimeout(() => {
                                   setShowAlert(false);
                              }, 2000);

                              return () => {
                                   clearTimeout(timer);
                              };
                         }}
                    >
                         <div>
                              <img src={Listen} alt="" />
                         </div>
                         <p>Listen</p>
                    </div>
               </div>
               <Footer currentPage="resources" image={images} />
          </div>
     );
}

export default Resources;
