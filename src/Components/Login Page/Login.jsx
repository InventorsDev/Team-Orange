// imports css
import "./Login.css";
// imports of images
import brain from "../../Assets/brain-icon.svg";
import google from "../../Assets/google.svg";
import apple from "../../Assets/apple.svg";
import brand from "../../Assets/brand_gold.svg";
//Typing Effect
import Typewriter from "typewriter-effect";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
//context

import { preloadImages, api } from "../Globals";
import Spinner from "../Spinner";
function LogIn() {
     const [click, setClick] = useState(false);

     const navigate = useNavigate();
     const handleNavigation = (e) => {
          e.preventDefault();
          navigate("/signIn");
     };
     const handleGoogle = () => {
          var requestOptions = {
               method: "GET",
               redirect: "follow",
          };

          fetch(`${api}/auth/login/google`, requestOptions)
               .then((response) => response.json())
               .then((result) => {
                    window.location.href = result.data.link;
               })
               .catch((error) => console.log("error", error));
     };

     const appleClicked = () => {
          setClick(true);
          const clickTimer = setTimeout(() => {
               setClick(false);
          }, 3000);
          return () => {
               clearTimeout(clickTimer);
          };
     }; //This appears when a user clicks the apple icon because it currently doesn't work
     var [isImagesLoading, setImagesLoaded] = useState(false);
     useEffect(() => {
          const imagesToPreload = [brain, google, apple, brand];
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
          //The return statement where the html lives
          <div className="Login">
               {isImagesLoading === false ? <Spinner /> : null}
               <img src={brain} alt="" className="brain" />
               <div className="head">
                    <img src={brand} alt="" />
                    <h1>Welcome !</h1>
                    <div>
                         <Typewriter
                              onInit={(typewriter) => {
                                   typewriter
                                        .changeDelay(20)
                                        .typeString(
                                             "Have a better Mindful Experience"
                                        )
                                        .start(); //So this is how i implement the typewriter effect
                              }}
                         />
                    </div>
               </div>

               <div className="loginOptions">
                    <button className="auths google" onClick={handleGoogle}>
                         <div className="authImageDiv">
                              <img src={google} alt="" />
                         </div>
                         <div className="textDiv">
                              <p>Continue with Google</p>
                         </div>
                    </button>

                    <button className="auths apple" onClick={appleClicked}>
                         <div className="authImageDiv">
                              <img src={apple} alt="" />
                         </div>
                         <div className="textDiv">
                              <p>Continue with Apple</p>
                         </div>
                    </button>

                    {click === true && (
                         <p className="appleUnavailable">
                              This feature is currently unavailable !
                         </p>
                    )}
                    <button
                         className="auths tranquil"
                         onClick={handleNavigation}
                    >
                         Sign in
                    </button>
               </div>

               <div className="newAccount">
                    <p>Don't have an account ?</p>
                    <Link to="/signUp" className="span">
                         Sign Up
                    </Link>
               </div>
          </div>
     );
}

export default LogIn; //I export the entire login function using this syntax, then i can access it anywhere else simply by saying import Login from the loaction it is in, check app.js for this
