import { useRef, useState } from "react";
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
     var [check, setCheck] = useState(false); //for check box

     var fullnameRef = useRef();
     var emailRef = useRef();
     var passwordRef = useRef();
     var fullnameRef = useRef();

     const validateFullName = () => {
          if (state.fullName.length >= 1 && state.fullName !== "") {
               setFullNameVal(true);
          } else {
               setFullNameVal(false);
          }
     };

     const validateEmail = () => {
          const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
          const isEmailValid = !!state.email.match(emailRegex);
          setEmailVal(isEmailValid);
     };

     const validatePassword = () => {
          const regex =
               /^(?=.*[!@#$%^&*()\-=+{};:,<.>/?[\]\\|`~])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
          const isPasswordValid = !!state.password.match(regex);
          setPasswordVal(isPasswordValid);
     };

     const validateConfirmPassword = () => {
          if (state.confirmPassword === state.password) {
               setConfirmPasswordVal(true);
          } else {
               setConfirmPasswordVal(false);
          }
     };

     var [formValid, setFormValid] = useState();
     const getFormValidStatus = () => {
          return (
               fullNameValidated &&
               emailValidated &&
               passwordValidated &&
               confirmPasswordValidated &&
               check
          );
     };

     function clearForm() {
          setState({
               ...state,
               fullName: "",
               email: "",
               password: "",
               confirmPassword: "",
          });
     }

     const handleSubmit = (e) => {
          e.preventDefault();

          var userDetails = {
               full_name: state.fullName,
               email: state.email,
               password: state.password,
          };

          var requestOptions = {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(userDetails),
               redirect: "follow",
          };

          if (getFormValidStatus() === true) {
               fetch(
                    "https://tranquil.skrind.com/api/v1/auth/register",
                    requestOptions
               )
                    .then((response) => response.text())
                    .then((result) => console.log(result))
                    .catch((error) => console.log("error", error));

               clearForm();

               navigate(`/otp/${state.email}`);
          } else {
               setFormValid(false);
          }
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

     const handleGoogle = (e) => {
          e.preventDefault();
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
                                   autoComplete="off"
                                   placeholder="Enter your full name"
                                   ref={fullnameRef}
                                   value={state.fullName}
                                   onChange={(e) => {
                                        e.preventDefault();
                                        setState({
                                             ...state,
                                             fullName: e.target.value,
                                        });
                                        if (e.target.value !== "") {
                                             setFullNameVal(true);
                                        } else {
                                             setFullNameVal(false);
                                        }
                                   }}
                                   onBlur={validateFullName}
                              />
                              <p className="fieldCheckers">
                                   {fullNameValidated === false &&
                                        "*This field must not be empty*"}
                              </p>
                         </fieldset>

                         <fieldset>
                              <label htmlFor="email">Email</label>
                              <input
                                   id="email"
                                   type="email"
                                   autoComplete="off"
                                   placeholder="Enter your email address"
                                   value={state.email}
                                   ref={emailRef}
                                   onFocus={(e) => {
                                        if (state.fullName === "") {
                                             fullnameRef.current.focus();
                                        }
                                   }}
                                   onChange={(e) => {
                                        e.preventDefault();
                                        setState({
                                             ...state,
                                             email: e.target.value,
                                        });
                                        if (e.target.value !== "") {
                                             setEmailVal(true);
                                        } else {
                                             setEmailVal(false);
                                        }
                                   }}
                                   onBlur={() => {
                                        if (state.fullName) {
                                             validateEmail();
                                        } else {
                                             return;
                                        }
                                   }}
                              />

                              <p className="fieldCheckers">
                                   {emailValidated === false &&
                                        "*Enter a valid email address*"}
                              </p>
                         </fieldset>

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
                                        autoComplete="off"
                                        ref={passwordRef}
                                        placeholder="Create a password"
                                        value={state.password}
                                        onFocus={(e) => {
                                             if (state.email === "") {
                                                  emailRef.current.focus();
                                             }
                                        }}
                                        onChange={(e) => {
                                             e.preventDefault();
                                             setState({
                                                  ...state,
                                                  password: e.target.value,
                                                  confirmPassword: "",
                                             });
                                             if (e.target.value) {
                                                  setPasswordVal(true);
                                             } else {
                                                  setPasswordVal(false);
                                             }
                                        }}
                                        onBlur={() => {
                                             if (state.email) {
                                                  validatePassword();
                                             } else {
                                                  return;
                                             }
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
                                   <p className="fieldCheckers">
                                        {passwordValidated === false &&
                                             "*8 or more digit password must contain both lowercase and uppercase letters and atleast one special character*"}
                                   </p>
                              </div>
                              <div className="spanContainers">
                                   <input
                                        id="confirmPassword"
                                        type={
                                             eyeclick2 === true
                                                  ? "text"
                                                  : "password"
                                        }
                                        onFocus={(e) => {
                                             if (state.password === "") {
                                                  passwordRef.current.focus();
                                             }
                                        }}
                                        autoComplete="off"
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
                                        onBlur={validateConfirmPassword}
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

                         <fieldset className="check">
                              <input
                                   type="checkbox"
                                   onChange={() => {
                                        setCheck(!check);
                                   }}
                                   className="checkb"
                              />

                              <p className="term">
                                   I have read and agreed to the{" "}
                                   <span className="terms">
                                        Terms and Conditions
                                   </span>{" "}
                                   and{" "}
                                   <span className="terms">Privacy Policy</span>
                              </p>
                         </fieldset>

                         <button
                              type="submit"
                              disabled={!getFormValidStatus()}
                              className="createAccount"
                         >
                              Create Account
                         </button>
                    </form>
                    <p className="fieldCheckers last">
                         {formValid === false &&
                              "*Make sure to input all your details correctly*"}
                    </p>
                    <div className="alt">
                         <div className="liners one"></div>{" "}
                         <p className="or">or</p>
                         <div className="liners"></div>
                         <div className="Third-Parties">
                              <div>
                                   <div
                                        className="thirdparty google"
                                        onClick={handleGoogle}
                                   >
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
