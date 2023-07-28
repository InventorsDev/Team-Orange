import "./User.css";
import { useNavigate, Route, Routes } from "react-router";
import homeBlack from "./Assets/homeBlack.svg";
import homeGreen from "./Assets/homeGreen.svg";
import resourcesBlack from "./Assets/resourcesBlack.svg";
import resourcesGreen from "./Assets/resourcesGreen.svg";
import goalsBlack from "./Assets/goalsBlack.svg";
import goalsGreen from "./Assets/goalsGreen.svg";
import communityBlack from "./Assets/communityBlack.svg";
import communityGreen from "./Assets/communityGreen.svg";
import profileBlack from "./Assets/profileBlack.svg";
import profileGreen from "./Assets/profileGreen.svg";
import Home from "./Home/Home.jsx";
import Resources from "./Resources/Resources.jsx";
import Goals from "./Goals/Goals.jsx";
import Community from "./Community/Community.jsx";
import Profile from "./Profile/Profile.jsx";
import { UserDetails } from "./UserContext";
import { useEffect, useState } from "react";

function User() {
     var navigate = useNavigate();
     var { component, setComponent } = UserDetails();

     var [isImagesLoading, setImagesLoaded] = useState(false);
     useEffect(() => {
          const images = [
               homeBlack,
               homeGreen,
               resourcesGreen,
               resourcesBlack,
               goalsBlack,
               goalsGreen,
               communityBlack,
               communityGreen,
               profileBlack,
               profileGreen,
          ];
          const preloadImages = (imageArray) => {
               const promises = imageArray.map((images) => {
                    return new Promise((resolve, reject) => {
                         const image = new Image();
                         image.src = images;
                         image.onload = resolve;
                         image.onerror = reject;
                    });
               });
               return Promise.all(promises);
          };

          preloadImages(images)
               .then(() => {
                    setImagesLoaded(true);
               })
               .catch((error) => {
                    console.log("Error Loading Images", error);
               });
     }, []);

     if (!isImagesLoading) {
          return <div>Loading . . .</div>;
     }
     const Footer = (
          <footer>
               <div className="flexes">
                    <div
                         className="currentFlex"
                         onClick={() => {
                              setComponent("home");
                              navigate("");
                         }}
                    >
                         <img
                              src={component === "home" ? homeGreen : homeBlack}
                              alt=""
                         />
                         <p
                              style={{
                                   color: `${
                                        component === "home"
                                             ? "#3bcd84"
                                             : "#000"
                                   }`,
                              }}
                         >
                              Home
                         </p>
                    </div>

                    <div
                         className="currentFlex"
                         onClick={() => {
                              setComponent("resources");
                              navigate("resources");
                         }}
                    >
                         <img
                              src={
                                   component === "resources"
                                        ? resourcesGreen
                                        : resourcesBlack
                              }
                              alt=""
                         />
                         <p
                              style={{
                                   color: `${
                                        component === "resources"
                                             ? "#3bcd84"
                                             : "#000"
                                   }`,
                              }}
                         >
                              Resources
                         </p>
                    </div>

                    <div
                         className="currentFlex"
                         onClick={() => {
                              setComponent("goals");
                              navigate("goals");
                         }}
                    >
                         <img
                              src={
                                   component === "goals"
                                        ? goalsGreen
                                        : goalsBlack
                              }
                              alt=""
                         />
                         <p
                              style={{
                                   color: `${
                                        component === "goals"
                                             ? "#3bcd84"
                                             : "#000"
                                   }`,
                              }}
                         >
                              Goals
                         </p>
                    </div>

                    <div
                         className="currentFlex"
                         onClick={() => {
                              setComponent("community");
                              navigate("community");
                         }}
                    >
                         <img
                              src={
                                   component === "community"
                                        ? communityGreen
                                        : communityBlack
                              }
                              alt=""
                         />
                         <p
                              style={{
                                   color: `${
                                        component === "community"
                                             ? "#3bcd84"
                                             : "#000"
                                   }`,
                              }}
                         >
                              Community
                         </p>
                    </div>

                    <div
                         className="currentFlex"
                         onClick={() => {
                              setComponent("profile");
                              navigate("profile");
                         }}
                    >
                         <img
                              src={
                                   component === "profile"
                                        ? profileGreen
                                        : profileBlack
                              }
                              alt=""
                         />
                         <p
                              style={{
                                   color: `${
                                        component === "profile"
                                             ? "#3bcd84"
                                             : "#000"
                                   }`,
                              }}
                         >
                              Profile
                         </p>
                    </div>
               </div>
          </footer>
     );

     return (
          <div>
               <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="resources" element={<Resources />} />
                    <Route path="goals" element={<Goals />} />
                    <Route path="community" element={<Community />} />
                    <Route path="profile" element={<Profile />} />
               </Routes>

               {Footer}
          </div>
     );
}

export default User;
