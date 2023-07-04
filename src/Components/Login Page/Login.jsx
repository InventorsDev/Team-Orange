import "./Login.css";
import brain from "../../Assets/brain-icon.svg";
import google from "../../Assets/google.svg";
import apple from "../../Assets/apple.svg";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import { useRef } from "react";

function LogIn() {
     const unavailable = useRef();
     const appleClicked = () => {
          unavailable.current.innerText =
               "This feature is Currently Unavailable !";
          setTimeout(() => {
               unavailable.current.innerText = "";
          }, 3000);
     };

     return (
          <div className="Login">
               <div className="Braindiv">
                    <img src={brain} alt="Brain" />
                    <p className="brand">Tranquil</p>
                    <h1>Welcome</h1>
                    <p>
                         <Typewriter
                              onInit={(typewriter) => {
                                   typewriter
                                        .changeDelay(20)
                                        .typeString(
                                             "Have a better Mindful Experience"
                                        )
                                        .start();
                              }}
                         />
                    </p>
               </div>

               <div className="Authentications">
                    <div className="Auths_SignUP">
                         <button className="Auths google">
                              <div className="Auths-Provider">
                                   <img src={google} alt="" />
                              </div>
                              <div className="google-apple">
                                   <p>Login with Google</p>
                              </div>
                         </button>

                         <button className="Auths apple" onClick={appleClicked}>
                              <div className="Auths-Provider">
                                   <img src={apple} alt="" />
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
                              <br />
                              <Link to="/getStarted" className="span">
                                   Sign Up
                              </Link>
                         </p>
                    </div>
               </div>
          </div>
     );
}

export default LogIn;
