import { useRef, useState } from "react";
import "./SignUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //me using font awesome in react requires the imports, I'd downloaded the packages via npm
import { faCheck, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import google from "./../../Assets/google.svg";
import apple from "./../../Assets/apple.svg";
import tranquil from "./../../Assets/brand_gold.svg";
import { Link } from "react-router-dom";

function Credentials() {
     //contains all the states to be managed by the form
     var [state, setState] = useState({
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          checked: false,
     });
     var [firstNameValidated, setFnameVal] = useState(); //firstname validation and function to validate it. Same thing goes for the next functions
     const validateFirstName = () => {
          if (state.firstName.length < 1) {
               setFnameVal(false);
          } else {
               setFnameVal(true);
          }
     };
     var [lastNameValidated, setLnameVal] = useState();
     const validateLastName = () => {
          if (state.lastName.length < 1) {
               setLnameVal(false);
          } else {
               setLnameVal(true);
          }
     };

     var [emailValidated, setEmailVal] = useState(false);
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

     var [passwordValidated, setPasswordVal] = useState(false);
     const validatePassword = () => {
          if (state.password.length < 8) {
               setPasswordVal(false);
          } else {
               setPasswordVal(true);
          }
     };

     var [confirmPasswordValidated, setConfirmPasswordVal] = useState();
     const validateConfirmPassword = () => {
          if (state.confirmPassword === state.password) {
               setConfirmPasswordVal(true);
          } else {
               setConfirmPasswordVal(false);
          }
     };
     //when submit button is clicked, clearform clears all the input fields
     const clearForm = () => {
          setState({
               ...state,
               firstName: "",
               middleName: "",
               lastName: "",
               email: "",
               password: "",
               confirmPassword: "",
               checked: !state.checked,
          });
     };
     //this returns the values provide by the user to backend point
     const handleSubmit = (e) => {
          e.preventDefault();
          var userDetails;
          userDetails = {
               lastName: `${state.lastName}`,
               firstName: `${state.firstName}`,
               middleName: `${state.middleName}`,
               email: `${state.email}`,
               password: `${state.password}`,
               authMeans: "manual",
          };
          console.log(userDetails);
          clearForm();
          setCurrentInput(4);
          // var postContent = {
          //      method: "POST",
          //      body: JSON.stringify(userDetails),
          //      redirect: "follow",
          // };

          // fetch("http://127.0.0.1:8000/api/v1/auth/register", postContent)
          //      .then((response) => response.text())
          //      .then((result) => console.log(result))
          //      .catch((error) => console.log("error"));
     };

     var [currentInput, setCurrentInput] = useState(1);
     //All these are additional logics, bare with me, i can't explain all
     var passwordRef = useRef();
     var confirmPasswordRef = useRef();
     var [click, setClick] = useState(false);
     //This const contain several fieldsets and inputs
     const names = (
          <>
               <fieldset>
                    <input
                         id="firstName"
                         type="text"
                         placeholder="What's your first name?"
                         value={state.firstName}
                         onChange={(e) => {
                              e.preventDefault();
                              setState({
                                   ...state,
                                   firstName: e.target.value,
                              });
                         }}
                         onFocus={(e) => {
                              e.preventDefault();
                              setFnameVal(true);
                         }}
                         onBlur={(e) => {
                              e.preventDefault();
                              validateFirstName();
                         }}
                    />
               </fieldset>
               <p
                    className={`hide ${
                         firstNameValidated === false && "validators"
                    }`}
               >
                    This field cannot be empty ***
               </p>
               <fieldset>
                    <input
                         id="middleName"
                         type="text"
                         placeholder="Your middle name?  ( optional )"
                         disabled={!firstNameValidated}
                         value={state.middleName}
                         onChange={(e) => {
                              e.preventDefault();
                              setState({
                                   ...state,
                                   middleName: e.target.value,
                              });
                         }}
                    />
               </fieldset>
               <fieldset>
                    <input
                         id="lastName"
                         type="text"
                         placeholder="Your last name ?"
                         disabled={!firstNameValidated}
                         value={state.lastName}
                         onChange={(e) => {
                              e.preventDefault();
                              setState({
                                   ...state,
                                   lastName: e.target.value,
                              });
                              setLnameVal(true);
                         }}
                         onBlur={(e) => {
                              e.preventDefault();
                              validateLastName();
                         }}
                    />
               </fieldset>
               <p
                    className={`hide ${
                         lastNameValidated === false && "validators"
                    }`}
               >
                    This field cannot be empty ***
               </p>

               <button
                    className="scroll"
                    disabled={!lastNameValidated}
                    onClick={(e) => {
                         e.preventDefault();
                         setCurrentInput(2);
                    }}
               >
                    Next
               </button>
          </>
     );

     const email = (
          <>
               <fieldset>
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
                              setEmailVal(true);
                         }}
                         onBlur={(e) => {
                              e.preventDefault();
                              validateEmail();
                         }}
                    />
               </fieldset>
               <p
                    className={`hide ${
                         emailValidated === false && "validators"
                    }`}
               >
                    Enter a valid email please ***
               </p>
               <div className="relatives">
                    <button
                         className="emailLeft"
                         disabled={!emailValidated}
                         onClick={(e) => {
                              e.preventDefault();
                              setCurrentInput(3);
                         }}
                    >
                         Next
                    </button>
                    <button
                         className="emailright"
                         type="buttton"
                         onClick={(e) => {
                              e.preventDefault();
                              setCurrentInput(1);
                         }}
                    >
                         Previous
                    </button>
               </div>
          </>
     );

     const passwords = (
          <>
               <fieldset>
                    <input
                         id="password"
                         type="password"
                         placeholder="Create a password"
                         ref={passwordRef}
                         value={state.password}
                         onChange={(e) => {
                              e.preventDefault();
                              setState({
                                   ...state,
                                   password: e.target.value,
                              });
                              setPasswordVal(true);
                         }}
                         onFocus={(e) => {
                              e.preventDefault();
                              setPasswordVal(true);
                         }}
                         onBlur={(e) => {
                              e.preventDefault();
                              validatePassword();
                         }}
                    />
                    <span
                         onClick={(e) => {
                              e.preventDefault();
                              setClick(!click);
                              if (click === false) {
                                   passwordRef.current.type = "text";
                                   confirmPasswordRef.current.type = "text";
                              } else if (click === true) {
                                   passwordRef.current.type = "password";
                                   confirmPasswordRef.current.type = "password";
                              }
                         }}
                    >
                         {click === false ? (
                              <FontAwesomeIcon icon={faEye} />
                         ) : (
                              <FontAwesomeIcon icon={faEyeSlash} />
                         )}
                    </span>
               </fieldset>
               <p
                    className={`hide ${
                         passwordValidated === false && "validators pass"
                    }`}
               >
                    Password must be a minimum of 8 characters ***
               </p>
               <fieldset>
                    <input
                         id="confirm password"
                         type="password"
                         placeholder="Confirm password"
                         ref={confirmPasswordRef}
                         value={state.confirmPassword}
                         disabled={!passwordValidated}
                         onChange={(e) => {
                              e.preventDefault();
                              setState({
                                   ...state,
                                   confirmPassword: e.target.value,
                              });
                         }}
                         onFocus={(e) => {
                              e.preventDefault();
                              setConfirmPasswordVal(true);
                         }}
                         onBlur={(e) => {
                              e.preventDefault();
                              validateConfirmPassword();
                         }}
                    />
               </fieldset>
               <p
                    className={`hide ${
                         confirmPasswordValidated === false && "validators"
                    }`}
               >
                    Passwords must be identical ***
               </p>
               <div className="check">
                    <div
                         onClick={(e) => {
                              if (confirmPasswordValidated === true) {
                                   setState({
                                        ...state,
                                        checked: !state.checked,
                                   });
                              }
                         }}
                         className={state.checked && "checkmark"}
                    >
                         <p>
                              {" "}
                              {state.checked === true && (
                                   <FontAwesomeIcon icon={faCheck} />
                              )}
                         </p>
                    </div>
                    <div className="terms">
                         <p>
                              I have read and agreed with the Terms and
                              Conditions and Privacy Policy
                         </p>
                    </div>
               </div>
               <div className="relatives">
                    <button
                         className="emailLeft"
                         disabled={!state.checked}
                         type="submit"
                    >
                         Submit
                    </button>
                    <button
                         className="emailright"
                         type="buttton"
                         onClick={(e) => {
                              e.preventDefault();
                              setCurrentInput(2);
                         }}
                    >
                         Previous
                    </button>
               </div>
          </>
     );
     var [OTP, setOTP] = useState();
     const otp = (
          <>
               <p className="otp">An otp has been sent to your email</p>
               <fieldset className="fieldsetOtp">
                    <input
                         type="number"
                         value={OTP}
                         onChange={(e) => {
                              if (e.target.value.length < 7) {
                                   setOTP(e.target.value);
                              }
                         }}
                         placeholder="*  *  *  *  *  *"
                    />
               </fieldset>
               <button className="verify">Verify</button>
          </>
     );
     const auths = (
          <>
               <p className="or">or</p>

               <div className="Third-Parties">
                    <div>
                         <div className="thirdparty google">
                              <img src={google} alt="" />
                         </div>

                         <div className="thirdparty apple">
                              <img src={apple} alt="" />
                         </div>
                    </div>
               </div>

               <p className="exist">
                    Already have an account?{" "}
                    <Link to="/login" className="linktoLog">
                         Sign in
                    </Link>
               </p>
          </>
     );

     const hello = (
          <>
               <h1>Hello!</h1>
               <p>Create an account to get Started</p>
          </>
     );
     return (
          <div className="SignUP">
               <div className="Credentials">
                    <div className="Hello">
                         <img className="brand" src={tranquil} alt="" />
                         {currentInput === 4 ? "" : <>{hello}</>}
                    </div>
                    <div className="FormContainer">
                         <form onSubmit={handleSubmit} className="signUpForm">
                              {currentInput === 1 && <>{names}</>}
                              {currentInput === 2 && <>{email}</>}
                              {currentInput === 3 && <>{passwords}</>}
                              {currentInput === 4 && <>{otp}</>}{" "}
                              {/* I split the form parts so that all of them wouldnt appear at once an the design would look somehow*/}
                         </form>
                    </div>
                    <div className="absolutee">
                         {" "}
                         {currentInput === 1 && <>{auths}</>}
                    </div>
               </div>
          </div>
     );
}

export default Credentials;
