import "./SignIn.css";
import tranquil from "../../../Assets/brand_gold.svg";
import { useState } from "react";
function SignIn() {
     const [state, setState] = useState({
          email: "",
          password: "",
     });

     var [emailValidated, setEmailVal] = useState();
     const validateEmail = () => {
          var emailValidator = String(state.email)
               .toLowerCase()
               .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
               );
          if (emailValidator === null) {
               setEmailVal(false);
               return false;
          } else {
               setEmailVal(true);
               return true;
          }
     };

     function Clearform() {
          setState({
               ...state,
               email: "",
               password: "",
          });
     }
     return (
          <>
               <div className="SignIn">
                    <div className="user">
                         <div className="hiThere">
                              <img
                                   className="brand"
                                   src={tranquil}
                                   alt="Tranquil Logo"
                              />
                              <h1>Welcome Back</h1>
                              <p>Input your details to continue</p>
                         </div>
                         <form className="signInForm">
                              <fieldset>
                                   <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={state.email}
                                        onChange={(e) => {
                                             e.preventDefault();
                                             setState({
                                                  ...state,
                                                  email: e.target.value,
                                             });
                                        }}
                                        onFocus={(e) => {
                                             e.preventDefault();
                                             setEmailVal(true);
                                        }}
                                        onBlur={(e) => {
                                             e.preventDefault();
                                             validateEmail();
                                        }}
                                   />
                              </fieldset>
                              <p className="valids">
                                   {emailValidated === false &&
                                        "*Enter a valid email address*"}
                              </p>
                              <fieldset>
                                   <input
                                        type="password"
                                        disabled={!emailValidated}
                                        placeholder="Enter your password"
                                        value={state.password}
                                        onChange={(e) => {
                                             e.preventDefault();
                                             setState({
                                                  ...state,
                                                  password: e.target.value,
                                             });
                                        }}
                                   />
                              </fieldset>

                              <button
                                   disabled={!emailValidated}
                                   onClick={(e) => {
                                        e.preventDefault();
                                        Clearform();
                                   }}
                              >
                                   Submit
                              </button>

                              <p>Forgot password ?</p>
                         </form>
                    </div>
               </div>
          </>
     );
}

export default SignIn;
