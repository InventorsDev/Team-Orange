import "./Login.css"; // imports css
import brain from "../../Assets/brain-icon.svg";
import google from "../../Assets/google.svg";
import apple from "../../Assets/apple.svg";
import brand from "../../Assets/brand_gold.svg"; // imports of images, the react way
import Typewriter from "typewriter-effect"; //This npm package produces the typing effect when you're on the login page
import { Link } from "react-router-dom"; //React package to create links
import { useRef } from "react"; // A little bit complicated, this is a react hook used to access attributes of a given element

//The function that returns the html for the login page
function LogIn() {
     const unavailable = useRef();
     const appleClicked = () => {
          unavailable.current.innerText =
               "This feature is Currently Unavailable !";
          setTimeout(() => {
               unavailable.current.innerText = "";
          }, 3000);
     }; //This appears when a user clicks the apple icon because it currently doesn't work

     return (
          //The return statement where the html lives
          <div className="Login">
               <div className="Braindiv">
                    {/*My naming can be funny ikr, this div has the tranquil app logo and the brain background*/}
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
               {/* Forthe various sign in methods, you"ll see the styles in the login.css file*/}
               <div className="Authentications">
                    <div className="Auths_SignUP">
                         <button className="Auths google">
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
                         <p className="unavailable" ref={unavailable}></p>

                         <p className="or">or</p>

                         <button className="Auths manual">Sign in</button>

                         <p className="neg-accnt">
                              Don't have an account ? <br />
                              <Link to="/getStarted" className="span">
                                   Sign Up
                              </Link>
                         </p>
                    </div>
               </div>
          </div>
     );
}

export default LogIn; //I export the entire login function using this syntax, then i can access it anywhere else simply by saying import Login from the loaction it is in, check app.js for this
