import "./Resources.css";
import backwards from "../Assets/backwardsArrow.svg";
import Articles from "../Assets/Articles.svg";
import Videos from "../Assets/Videos.svg";
import Materials from "../Assets/Materials.svg";
import Listen from "../Assets/Listen.svg";
import Spinner from "../../Spinner";
import { preloadImages } from "../../Globals";
import { useEffect, useState } from "react";

function Resources() {
     var [isImagesLoading, setImagesLoaded] = useState(false);
     useEffect(() => {
          const imagesToPreload = [
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

     return (
          <div className="ResourcesPage">
               {isImagesLoading === false ? <Spinner /> : null}

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

                    <div className="group">
                         <div>
                              <img src={Videos} alt="" />
                         </div>
                         <p>Videos</p>
                    </div>

                    <div className="group">
                         <div>
                              <img src={Materials} alt="" />
                         </div>
                         <p>Materials</p>
                    </div>

                    <div className="group">
                         <div>
                              <img src={Listen} alt="" />
                         </div>
                         <p>Listen</p>
                    </div>
               </div>
          </div>
     );
}

export default Resources;
