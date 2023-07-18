import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //using font awesome in react requires the imports, I'd downloaded the packages via npm
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import google from "./../../Assets/google.svg";
import apple from "./../../Assets/apple.svg";
import tranquil from "./../../Assets/brand_gold.svg";
import { Link } from "react-router-dom";

function Credentials() {
     const navigate = useNavigate();
     //contains all the states to be managed by the form
     var [state, setState] = useState({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
     });

     var [fullNameValidated, setFullNameVal] = useState();
     var [emailValidated, setEmailVal] = useState();
     var [passwordValidated, setPasswordVal] = useState();
     var [confirmPasswordValidated, setConfirmPasswordVal] = useState();

     const validateFullName = () => {
          if (state.fullName.length > 1) {
               setFullNameVal(true);
          } else {
               setFullNameVal(false);
          }
     };

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

     // const validatePassword = () => {
     //      if (state.password.length < 8) {
     //           setPasswordVal(false);
     //      } else {
     //           setPasswordVal(true);
     //      }
     // };

     // const validateConfirmPassword = () => {
     //      if (state.confirmPassword === state.password) {
     //           setConfirmPasswordVal(true);
     //      } else {
     //           setConfirmPasswordVal(false);
     //      }
     // };

     const handleSubmit = (e) => {
          e.preventDefault();
          var userDetails;
          userDetails = {
               full_Name: `${state.fullName}`,
               email: `${state.email}`,
               password: `${state.password}`,
          };

          console.log(userDetails);
          // var postContent = {
          //      method: "POST",
          //      body: JSON.stringify(userDetails),
          //      redirect: "follow",
          // };

          // fetch("http://127.0.0.1:8000/api/v1/auth/register", postContent)
          //      .then((response) => response.text())
          //      .then((result) => console.log(result))
          //      .catch((error) => console.log("error"));
          navigate("/otp");
     };

     var [eyeclick, setEyeclick] = useState(false);
     var [eyeclick2, setEyeclick2] = useState(false);
     var [click, setClick] = useState(false);

     const handleClick = () => {
          setClick(true);
          setTimeout(() => {
               setClick(false);
          }, 1500);
     };

     return (
          <div className="SignUP">
               <div className="pageContainer">
                    <header className="Hello">
                         <img className="brand" src={tranquil} alt="" />
                         <h1>Hello!</h1>
                         <p>Create an account to get Started</p>
                         <p>
                              Already have an account?{" "}
                              <Link to="/login" className="loginLink">
                                   Sign in
                              </Link>
                         </p>
                    </header>
                    <form onSubmit={handleSubmit} className="signUpForm">
                         <fieldset>
                              <label htmlFor="fullName">Name</label>
                              <input
                                   id="fullName"
                                   type="text"
                                   placeholder="Enter your full name"
                                   value={state.fullName}
                                   onChange={(e) => {
                                        e.preventDefault();
                                        setState({
                                             ...state,
                                             fullName: e.target.value,
                                        });
                                   }}
                                   onBlur={(e) => {
                                        e.preventDefault();
                                        validateFullName();
                                   }}
                              />
                              <p className="fieldCheckers">
                                   {fullNameValidated === false &&
                                        "*Make sure to input your full name*"}
                              </p>
                         </fieldset>

                         {/******************************************/}

                         <fieldset>
                              <label htmlFor="email">Email</label>
                              <input
                                   id="email"
                                   type="email"
                                   placeholder="Enter your email ( e.g abcd@gmail.com )"
                                   autoComplete="off"
                                   value={state.email}
                                   onChange={(e) => {
                                        e.preventDefault();
                                        setState({
                                             ...state,
                                             email: e.target.value,
                                        });
                                   }}
                                   onBlur={(e) => {
                                        e.preventDefault();
                                        validateEmail();
                                   }}
                              />

                              <p className="fieldCheckers">
                                   {emailValidated === false &&
                                        "*Enter a valid email address*"}
                              </p>
                         </fieldset>

                         {/******************************************/}

                         <fieldset className="passwordField">
                              <label htmlFor="password">Password</label>
                              <div className="spanContainers">
                                   <input
                                        id="password"
                                        type={
                                             eyeclick === true
                                                  ? "text"
                                                  : "password"
                                        }
                                        placeholder="Create a password"
                                        value={state.password}
                                        onChange={(e) => {
                                             e.preventDefault();
                                             setState({
                                                  ...state,
                                                  password: e.target.value,
                                             });
                                             setPasswordVal(true);
                                        }}
                                        onBlur={(e) => {
                                             e.preventDefault();
                                             // validatePassword();
                                        }}
                                   />
                                   <span
                                        onClick={() => {
                                             setEyeclick(!eyeclick);
                                        }}
                                        className="eyeIcon"
                                   >
                                        {eyeclick === true ? (
                                             <FontAwesomeIcon icon={faEye} />
                                        ) : (
                                             <FontAwesomeIcon
                                                  icon={faEyeSlash}
                                             />
                                        )}
                                   </span>
                                   <p className="fieldCheckers">{/****/}</p>
                              </div>
                              <div className="spanContainers">
                                   <input
                                        id="confirmPassword"
                                        type={
                                             eyeclick2 === true
                                                  ? "text"
                                                  : "password"
                                        }
                                        placeholder="Confirm password"
                                        value={state.confirmPassword}
                                        onChange={(e) => {
                                             e.preventDefault();
                                             setState({
                                                  ...state,
                                                  confirmPassword:
                                                       e.target.value,
                                             });
                                        }}
                                        onBlur={(e) => {
                                             e.preventDefault();
                                             // validateConfirmPassword();
                                        }}
                                   />
                                   <span
                                        onClick={() => {
                                             setEyeclick2(!eyeclick2);
                                        }}
                                        className="eyeIcon2"
                                   >
                                        {eyeclick2 === true ? (
                                             <FontAwesomeIcon icon={faEye} />
                                        ) : (
                                             <FontAwesomeIcon
                                                  icon={faEyeSlash}
                                             />
                                        )}
                                   </span>
                                   <p className="fieldCheckers">
                                        {confirmPasswordValidated === false &&
                                             "*Passwords must be identical*"}
                                   </p>
                              </div>
                         </fieldset>

                         {/*******************************************/}
                         <fieldset className="check">
                              <input type="checkbox" className="checkb" />

                              <p className="term">
                                   I have read and agreed to the{" "}
                                   <span className="terms">
                                        Terms and Conditions
                                   </span>{" "}
                                   and{" "}
                                   <span className="terms">Privacy Policy</span>
                              </p>
                         </fieldset>

                         <button type="submit" className="createAccount">
                              Create Account
                         </button>
                    </form>
                    <div className="alt">
                         <div className="liners one"></div>{" "}
                         <p className="or">or</p>
                         <div className="liners"></div>
                         <div className="Third-Parties">
                              <div>
                                   <div className="thirdparty google">
                                        <img src={google} alt="" />
                                   </div>

                                   <div
                                        className="thirdparty apple"
                                        onClick={handleClick}
                                   >
                                        <img src={apple} alt="" />
                                   </div>
                              </div>
                         </div>
                         <p>
                              {click === true &&
                                   "This feature is currently unavailable !"}
                         </p>
                    </div>
               </div>
          </div>
     );
}

export default Credentials;
