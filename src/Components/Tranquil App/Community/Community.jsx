// import Spinner from "../../Spinner";

// import { useState, useEffect } from "react";
// import { preloadImages } from "../../Globals";

function Community() {
     // var [isImagesLoading, setImagesLoaded] = useState(false);
     // useEffect(() => {
     //      const imagesToPreload = [
     //
     //      ];
     //      preloadImages(imagesToPreload)
     //           .then(() => {
     //                const imageTimer = setTimeout(() => {
     //                     setImagesLoaded(true);
     //                }, 1000);

     //                return () => {
     //                     clearTimeout(imageTimer);
     //                };
     //           })
     //           .catch((error) => {
     //                console.log("Error Loading Images", error);
     //           });
     // }, []);

     return (
          <div>
               {/* {isImagesLoading === false ? <Spinner /> : null} */}
               <p>Community</p>;
          </div>
     );
}

export default Community;
