import "./Login.css"; // imports css
import brain from "../../Assets/brain-icon.svg"; // imports of images, the react way
import google from "../../Assets/google.svg";
import apple from "../../Assets/apple.svg";
import brand from "../../Assets/brand_gold.svg";
import Typewriter from "typewriter-effect"; //This npm package produces the typing effect when you're on the login page
import { Link } from "react-router-dom"; //React package to create links
import { useState } from "react";
import { useNavigate } from "react-router-dom"; //react-dom navigation hook

//The function that returns the html for the login page
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
          setTimeout(() => {
               setClick(false);
          }, 3000);
     }; //This appears when a user clicks the apple icon because it currently doesn't work

     return (
          //The return statement where the html lives
          <div className="Login">
               <div className="Braindiv">
                    <img src={brain} alt="Brain" loading="lazy" />
                    <img src={brand} className="brand" alt="" loading="lazy" />
                    <h1>Welcome</h1>
                    <p>
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
                    </p>
               </div>

               <div className="Authentications">
                    <div className="Auths_SignUP">
                         <button
                              className="Auths google"
                              onClick={handleGoogle}
                         >
                              <div className="Auths-Provider">
                                   <img src={google} alt="" loading="lazy" />
                              </div>
                              <div className="google-apple" loading="lazy">
                                   <p>Login with Google</p>
                              </div>
                         </button>

                         <button className="Auths apple" onClick={appleClicked}>
                              <div className="Auths-Provider">
                                   <img src={apple} alt="" loading="lazy" />
                              </div>
                              <div className="google-apple">
                                   <p>Login with Apple</p>
                              </div>
                         </button>
                         <p className="unavailable">
                              {click === true &&
                                   "This feature is currently unavailable !"}
                         </p>

                         <button
                              className="Auths manual"
                              onClick={handleNavigation}
                         >
                              Sign in
                         </button>

                         <p className="neg-accnt">
                              Don't have an account ? <br />
                              <Link to="/createAccount" className="span">
                                   Sign Up
                              </Link>
                         </p>
                    </div>
               </div>
          </div>
     );
}

export default LogIn; //I export the entire login function using this syntax, then i can access it anywhere else simply by saying import Login from the loaction it is in, check app.js for this
