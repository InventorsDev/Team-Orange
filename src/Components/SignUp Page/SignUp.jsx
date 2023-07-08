import { useRef, useState } from "react";
import "./SignUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Credentials() {
     var [state, setState] = useState({
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          checked: false,
     });

     var [firstNameValidated, setFnameVal] = useState(true);
     const validateFirstName = () => {
          if (state.firstName.length < 1) {
               setFnameVal(false);
               return false;
          } else {
               setFnameVal(true);
               return true;
          }
     };

     var [lastNameValidated, setLnameVal] = useState(true);
     const validateLastName = () => {
          if (state.lastName.length < 1) {
               setLnameVal(false);
               return false;
          } else {
               setLnameVal(true);
               return true;
          }
     };

     var [emailValidated, setEmailVal] = useState(true);
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
          if (state.password.length < 8 || state.password.length === null) {
               setPasswordVal(false);
               setPasswordInputed(false);
               return false;
          } else {
               setPasswordVal(true);
               setPasswordInputed(true);
               return true;
          }
     };

     var [confirmPasswordValidated, setConfirmPasswordVal] = useState(true);
     const validateConfirmPassword = () => {
          if (state.confirmPassword === state.password) {
               setConfirmPasswordVal(true);
               return true;
          } else {
               setConfirmPasswordVal(false);
               return false;
          }
     };
     var [passwordInputed, setPasswordInputed] = useState(false);
     var passwordRef = useRef();
     var confirmPasswordRef = useRef();
     var [clicked, setClicked] = useState(false);

     const [formValid, setFormValid] = useState(true);
     const getFormValidationStatus = () => {
          setFormValid(
               validateFirstName() &&
                    validateLastName() &&
                    validateEmail() &&
                    validatePassword() &&
                    validateConfirmPassword() &&
                    state.checked === true
          );
     };

     const clearForm = () => {
          setState({
               ...state,
               firstName: "",
               middleName: "",
               lastName: "",
               email: "",
               password: "",
               confirmPassword: "",
               checked: "",
          });
     };
     const handleSubmit = (e) => {
          e.preventDefault();
          getFormValidationStatus();
          var userDetails;
          if (formValid === true) {
               userDetails = {
                    lastName: `${state.lastName}`,
                    firstName: `${state.firstName}`,
                    middleName: `${state.middleName}`,
                    email: `${state.email}`,
                    password: `${state.password}`,
                    authMeans: "manual",
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
          } else {
               console.log("invalid details");
          }

          clearForm();
     };
     return (
          <div className="SignUP">
               <div className="Credentials">
                    <div className="Hello">
                         <h1>Hello!</h1>
                         <p>Create an account to get Started</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                         <fieldset>
                              <div className="Inputs">
                                   <label htmlFor="firstName">First Name</label>
                                   <input
                                        id="firstName"
                                        className="inputs"
                                        type="text"
                                        placeholder="First Name"
                                        value={state.firstName}
                                        onChange={(e) => {
                                             setState({
                                                  ...state,
                                                  firstName: e.target.value,
                                             });
                                             setFnameVal(true);
                                        }}
                                        onBlur={(e) => {
                                             e.preventDefault();
                                             validateFirstName();
                                        }}
                                   />
                                   <p
                                        className={`validateprompt ${
                                             firstNameValidated === false &&
                                             "show"
                                        }`}
                                   >
                                        This field cannot be empty *
                                   </p>
                              </div>

                              <div className="Inputs">
                                   <label htmlFor="middleName">
                                        Middle Name
                                        <span className="opt">
                                             &#x0028;optional&#x0029;
                                        </span>
                                   </label>
                                   <input
                                        id="middleName"
                                        className="inputs"
                                        type="text"
                                        placeholder="Middle Name"
                                        value={state.middleName}
                                        onChange={(e) => {
                                             e.preventDefault();
                                             setState({
                                                  ...state,
                                                  middleName: e.target.value,
                                             });
                                        }}
                                   />
                              </div>

                              <div className="Inputs">
                                   <label htmlFor="lastName">Last Name</label>
                                   <input
                                        id="lastName"
                                        className="inputs"
                                        type="text"
                                        placeholder="Last Name"
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
                                   <p
                                        className={`validateprompt ${
                                             lastNameValidated === false &&
                                             "show"
                                        }`}
                                   >
                                        This field cannot be empty *
                                   </p>
                              </div>

                              <div className="Inputs">
                                   <label htmlFor="email">Email Address</label>
                                   <input
                                        id="email"
                                        className="inputs"
                                        type="email"
                                        placeholder="abcd@gmail.com"
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
                                   <p
                                        className={`validateprompt ${
                                             emailValidated === false && "show"
                                        }`}
                                   >
                                        Email is either empty or invalid *
                                   </p>
                              </div>

                              <div className="Inputs password">
                                   <div>
                                        <label htmlFor="password">
                                             Password
                                        </label>
                                        <input
                                             id="password"
                                             className="inputs"
                                             ref={passwordRef}
                                             type="password"
                                             placeholder="Create a password"
                                             value={state.password}
                                             onChange={(e) => {
                                                  e.preventDefault();
                                                  setConfirmPasswordVal(true);
                                                  setState({
                                                       ...state,
                                                       password: e.target.value,
                                                  });
                                             }}
                                             onBlur={(e) => {
                                                  e.preventDefault();
                                                  validatePassword();
                                             }}
                                        />
                                        <span
                                             className="visibility"
                                             onClick={(e) => {
                                                  e.preventDefault();
                                                  if (clicked === false) {
                                                       passwordRef.current.type =
                                                            "text";
                                                       confirmPasswordRef.current.type =
                                                            "text";
                                                       setClicked(true);
                                                  } else {
                                                       passwordRef.current.type =
                                                            "password";
                                                       confirmPasswordRef.current.type =
                                                            "password";
                                                       setClicked(false);
                                                  }
                                             }}
                                        >
                                             {" "}
                                             {clicked === true ? (
                                                  <FontAwesomeIcon
                                                       icon={faEye}
                                                  />
                                             ) : (
                                                  <FontAwesomeIcon
                                                       icon={faEyeSlash}
                                                  />
                                             )}
                                        </span>
                                   </div>

                                   <p
                                        className={`validateprompt ${
                                             passwordValidated === true
                                                  ? ""
                                                  : "show"
                                        }`}
                                   >
                                        Password must be greater than or equal
                                        to 8 characters*
                                   </p>

                                   <input
                                        id="confirm password"
                                        className="inputs password"
                                        type="password"
                                        ref={confirmPasswordRef}
                                        placeholder="Confirm password"
                                        value={state.confirmPassword}
                                        disabled={
                                             passwordInputed === false
                                                  ? true
                                                  : false
                                        }
                                        onChange={(e) => {
                                             e.preventDefault();
                                             setState({
                                                  ...state,
                                                  confirmPassword:
                                                       e.target.value,
                                             });
                                             setConfirmPasswordVal(true);
                                        }}
                                        onBlur={(e) => {
                                             e.preventDefault();
                                             validateConfirmPassword();
                                        }}
                                   />
                              </div>

                              <p
                                   className={`validateprompt ${
                                        confirmPasswordValidated === true
                                             ? ""
                                             : "show"
                                   }`}
                              >
                                   Passwords are not identical*
                              </p>

                              <div className="Inputs check">
                                   <input
                                        id="check"
                                        type="checkbox"
                                        className="checkbox"
                                        value={state.checked}
                                        onChange={() => {
                                             setState({
                                                  ...state,
                                                  checked: !state.checked,
                                             });
                                        }}
                                   />
                                   <label htmlFor="check">
                                        {" "}
                                        I've read and agreed with the{" "}
                                        <span>
                                             Terms and Conditions
                                        </span> and <span>Privacy Policy</span>
                                   </label>
                              </div>
                              <p
                                   className={`validateprompt ${
                                        formValid === true ? "" : "show"
                                   }`}
                              >
                                   Make sure to fill out all necessary fields*
                              </p>
                              <div className="Inputs submit">
                                   <input
                                        type="submit"
                                        value="Next"
                                        disabled={!state.checked}
                                        className="inputs submit"
                                   />
                              </div>
                         </fieldset>
                    </form>
               </div>
          </div>
     );
}

export default Credentials;
