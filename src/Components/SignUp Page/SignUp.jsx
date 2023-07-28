import "./SignUp.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //using font awesome in react requires the imports, I'd downloaded the packages via npm
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import tranquilLogo from "./../../Assets/brand_gold.svg";
import { Link } from "react-router-dom";
import { FormDetails } from "../FormContext";
import {
     globalValidateName,
     globalValidateEmail,
     globalValidatePassword,
} from "../globalFormValidators";

function SignUp() {
     const navigate = useNavigate();
     var { setEmail } = FormDetails();

     //contains all the states to be managed by the form
     var [state, setState] = useState({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
     });

     //states to hold input Validation Status
     var [fullNameValidated, setFullNameVal] = useState();
     var [emailValidated, setEmailVal] = useState();
     var [passwordValidated, setPasswordVal] = useState();
     var [confirmPasswordValidated, setConfirmPasswordVal] = useState();
     var [check, setCheck] = useState(false); //for check box

     //refs to handle refocusing incase previous field is invalid
     var fullnameRef = useRef();
     var emailRef = useRef();
     var passwordRef = useRef();
     var confirmPasswordRef = useRef();

     const validateFullName = () => {
          var isFullNameValid = globalValidateName(state.fullName);
          setFullNameVal(isFullNameValid);
     };

     const validateEmail = () => {
          const isEmailValid = globalValidateEmail(state.email);
          setEmailVal(isEmailValid);
     };

     const validatePassword = () => {
          const isPasswordValid = globalValidatePassword(state.password);
          setPasswordVal(isPasswordValid);
     };

     const validateConfirmPassword = () => {
          if (state.confirmPassword.trim() === state.password.trim()) {
               setConfirmPasswordVal(true);
          } else {
               setConfirmPasswordVal(false);
          }
     };

     const getFormValidStatus = () => {
          return (
               fullNameValidated &&
               emailValidated &&
               passwordValidated &&
               state.confirmPassword.trim() === state.password.trim() &&
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
               full_name: state.fullName.trim(),
               email: state.email.trim(),
               password: state.password.trim(),
          };
          console.log(userDetails);
          var requestOptions = {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(userDetails),
               redirect: "follow",
          };

          setEmail(state.email);
          fetch(
               "https://tranquil.skrind.com/api/v1/auth/register",
               requestOptions
          )
               .then((response) => response.text())
               .then((result) => {
                    console.log(result);
               })
               .catch((error) => console.log("error", error));
          clearForm();
          navigate("/otp");
     };

     var [eyeclick, setEyeclick] = useState(false);
     var [eyeclick2, setEyeclick2] = useState(false);

     return (
          <div className="SignUP">
               <header className="signUpHeader">
                    <img className="brand" src={tranquilLogo} alt="" />
                    <h1>Hello!</h1>
                    <p>Create an account to get Started</p>
               </header>
               <form onSubmit={handleSubmit} className="signUpForm">
                    <fieldset>
                         <label htmlFor="fullName">Name</label>
                         <input
                              type="text"
                              autoComplete="off"
                              name="fullName"
                              placeholder="Enter your full name"
                              ref={fullnameRef}
                              value={state.fullName}
                              onFocus={() => {
                                   setEmailVal(true);
                              }}
                              onChange={(e) => {
                                   e.preventDefault();
                                   setState({
                                        ...state,
                                        fullName: e.target.value.trimStart(),
                                   });
                                   if (e.target.value.trimStart()) {
                                        setFullNameVal(true);
                                   } else {
                                        setFullNameVal(false);
                                   }
                              }}
                              onBlur={validateFullName}
                         />

                         {fullNameValidated === false ? (
                              <p className="fieldCheckers">
                                   *This field must not be empty*
                              </p>
                         ) : null}
                    </fieldset>

                    <fieldset>
                         <label htmlFor="email">Email</label>
                         <input
                              type="text"
                              autoComplete="off"
                              name="email"
                              placeholder="Enter your email address"
                              value={state.email}
                              ref={emailRef}
                              onFocus={() => {
                                   if (state.fullName.length < 1) {
                                        setFullNameVal(false);
                                        fullnameRef.current.focus();
                                   }

                                   setPasswordVal(true);
                              }}
                              onChange={(e) => {
                                   e.preventDefault();
                                   setState({
                                        ...state,
                                        email: e.target.value.trim(),
                                   });
                                   if (e.target.value.trim()) {
                                        setEmailVal(true);
                                   } else {
                                        setEmailVal(false);
                                   }
                              }}
                              onBlur={validateEmail}
                         />

                         {emailValidated === false ? (
                              <p className="fieldCheckers">
                                   *Enter a valid email address*
                              </p>
                         ) : null}
                    </fieldset>

                    <fieldset>
                         <label htmlFor="password">Password</label>
                         <div className="eyeIconsRelativeDivs">
                              <input
                                   type={
                                        eyeclick === true ? "text" : "password"
                                   }
                                   autoComplete="off"
                                   name="newPassword"
                                   ref={passwordRef}
                                   placeholder="Create a password"
                                   value={state.password}
                                   onFocus={() => {
                                        if (
                                             state.email === "" ||
                                             emailValidated === false
                                        ) {
                                             setEmailVal(false);
                                             emailRef.current.focus();
                                        }

                                        setConfirmPasswordVal(true);
                                   }}
                                   onChange={(e) => {
                                        e.preventDefault();
                                        setState({
                                             ...state,
                                             password:
                                                  e.target.value.trimStart(),
                                             confirmPassword: "",
                                        });

                                        if (e.target.value.trimStart()) {
                                             setPasswordVal(true);
                                        } else {
                                             setPasswordVal(false);
                                        }
                                   }}
                                   onBlur={validatePassword}
                              />
                              <div
                                   onClick={(e) => {
                                        e.preventDefault();
                                        setEyeclick(!eyeclick);
                                   }}
                                   className="eyeIcon"
                              >
                                   {eyeclick === true ? (
                                        <FontAwesomeIcon icon={faEye} />
                                   ) : (
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                   )}
                              </div>
                         </div>

                         {passwordValidated === false ? (
                              <p className="fieldCheckers">
                                   *Password must be 8 digits or more*
                                   <br />
                                   *Contain both lowercase and uppercase
                                   letters* <br />
                                   *Have atleast one special character e.g (#,
                                   %, $, . . .) *
                              </p>
                         ) : null}

                         <div className="eyeIconsRelativeDivs">
                              <input
                                   type={
                                        eyeclick2 === true ? "text" : "password"
                                   }
                                   autoComplete="off"
                                   name="confirmPassword"
                                   onFocus={() => {
                                        if (
                                             state.password === "" ||
                                             passwordValidated === false
                                        ) {
                                             passwordRef.current.focus();
                                        }
                                   }}
                                   ref={confirmPasswordRef}
                                   placeholder="Confirm password"
                                   value={state.confirmPassword}
                                   onChange={(e) => {
                                        e.preventDefault();
                                        setState({
                                             ...state,
                                             confirmPassword:
                                                  e.target.value.trimStart(),
                                        });
                                        if (e.target.value === state.password) {
                                             setConfirmPasswordVal(true);
                                        } else {
                                             setConfirmPasswordVal(false);
                                        }
                                   }}
                                   onBlur={validateConfirmPassword}
                              />
                              <div
                                   onClick={() => {
                                        setEyeclick2(!eyeclick2);
                                   }}
                                   className="eyeIcon"
                              >
                                   {eyeclick2 === true ? (
                                        <FontAwesomeIcon icon={faEye} />
                                   ) : (
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                   )}
                              </div>
                         </div>

                         {confirmPasswordValidated === false ? (
                              <p className="fieldCheckers">
                                   *Passwords must be identical*
                              </p>
                         ) : null}
                    </fieldset>

                    <fieldset className="check">
                         <input
                              type="checkbox"
                              onChange={() => {
                                   setCheck(!check);
                              }}
                         />

                         <p>
                              I have read and agreed to the{" "}
                              <span className="terms">
                                   Terms and Conditions
                              </span>{" "}
                              and <span className="terms">Privacy Policy</span>
                         </p>
                    </fieldset>

                    <button type="submit" disabled={!getFormValidStatus()}>
                         Create Account
                    </button>
               </form>
               <div className="signUpAlreadyExisted">
                    <p>Already have an account?</p>
                    <Link to="/login" className="loginLink">
                         Sign in
                    </Link>
               </div>
          </div>
     );
}

export default SignUp;
