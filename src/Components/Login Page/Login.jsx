import "./Login.css"; // imports css
import brain from "../../Assets/brain-icon.svg"; // imports of images, the react way
import google from "../../Assets/google.svg";
import apple from "../../Assets/apple.svg";
import brand from "../../Assets/brand_gold.svg";
import Typewriter from "typewriter-effect"; //This npm package produces the typing effect when you're on the login page
import { Link } from "react-router-dom"; //React package to create links
import { useState } from "react";
import { useNavigate } from "react-router-dom"; //react-dom navigation hook

function LogIn() {
     const [click, setClick] = useState(false);

     const navigate = useNavigate(); //navigation syntax

     const handleNavigation = (e) => {
          e.preventDefault();
          navigate("/signIn");
     };

     const handleGoogle = () => {
          var requestOptions = {
               method: "GET",
               redirect: "follow",
          };

          fetch(
               "https://tranquil.skrind.com/api/v1/auth/login/google",
               requestOptions
          )
               .then((response) => response.json())
               .then((result) => {
                    console.log(result);
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

     return (
          //The return statement where the html lives
          <div className="Login">
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
