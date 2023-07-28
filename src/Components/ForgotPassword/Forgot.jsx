import "./Forgot.css";
import { useRef, useState } from "react";
import tranquilLogo from "../../Assets/brand_gold.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import {
     globalValidateEmail,
     globalValidatePassword,
} from "../globalFormValidators";

function Forgot() {
     const navigate = useNavigate();
     var [step, setStep] = useState(1);
     var [state, setState] = useState({
          email: "",
          token: "",
          newPassword: "",
          confirmPassword: "",
     });

     const getIsEmailValid = () => {
          return globalValidateEmail(state.email);
     };

     var [emailSentMessage, setEmailMessage] = useState({
          string: "",
          state: false,
     });

     const fetchNewOtp = (e) => {
          e.preventDefault();
          setEmailMessage({
               ...emailSentMessage,
               string: "Hang on a sec",
               state: true,
          });
          var userEmailAddress = {
               email: state.email.trim(),
          };
          var requestOptions = {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(userEmailAddress),
               redirect: "follow",
          };
          fetch(
               "https://tranquil.skrind.com/api/v1/auth/forgot-password",
               requestOptions
          )
               .then((response) => response.json())
               .then((result) => {
                    console.log(result);
                    if (result.statusCode === 200) {
                         setEmailMessage({
                              ...emailSentMessage,
                              string: result.message,
                              state: true,
                         });
                         setState({
                              ...state,
                              email: "",
                         });
                         setTimeout(() => {
                              setStep(2);
                         }, 1000);
                    } else {
                         setEmailMessage({
                              ...emailSentMessage,
                              string: result.message,
                              state: false,
                         });
                    }
               })
               .catch((error) => console.log("error", error));
     };
     const Email = (
          <form onSubmit={fetchNewOtp}>
               <fieldset>
                    <input
                         type="text"
                         name="emailToSendForgotOtpTo"
                         placeholder="Enter your email address"
                         value={state.email}
                         onChange={(e) => {
                              e.preventDefault();
                              setState({
                                   ...state,
                                   email: e.target.value.trim(),
                              });

                              setEmailMessage({
                                   ...emailSentMessage,
                                   string: "",
                              });
                         }}
                    />
               </fieldset>

               {emailSentMessage.string ? (
                    <p
                         className={
                              emailSentMessage.state === false
                                   ? "errorReceived"
                                   : "accountFound"
                         }
                    >
                         {emailSentMessage.string}
                    </p>
               ) : null}

               <button disabled={!getIsEmailValid()} type="submit">
                    Next
               </button>
          </form>
     );

     var [tokenResetMessage, setToken] = useState({
          string: "",
          state: true,
     });

     const handleSetNewPassword = (e) => {
          e.preventDefault();
          setToken({
               ...tokenResetMessage,
               string: "Hang on a sec",
               state: true,
          });
          var userDetails = {
               token: state.token,
               password: state.newPassword,
          };
          var requestOptions = {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(userDetails),
               redirect: "follow",
          };
          fetch(
               "https://tranquil.skrind.com/api/v1/auth/reset-password",
               requestOptions
          )
               .then((response) => response.json())
               .then((result) => {
                    console.log(result);
                    if (result.statusCode === 200) {
                         setToken({
                              ...tokenResetMessage,
                              string: result.message,
                              state: true,
                         });
                         setState({
                              ...state,
                              email: "",
                              token: "",
                              newPassword: "",
                              confirmPassword: "",
                         });
                         setTimeout(() => {
                              navigate("/signIn");
                         }, 1000);
                    } else {
                         setToken({
                              ...tokenResetMessage,
                              string: result.message,
                              state: false,
                         });
                    }
               })
               .catch((error) => console.log("error", error));
     };

     var newPasswordRef = useRef();
     var confirmPasswordRef = useRef();
     var newTokenRef = useRef();

     var [passwordValidated, setPasswordVal] = useState();
     var [confirmPasswordValidated, setConfirmPasswordVal] = useState();
     const validateFields = () => {
          return (
               state.token.length === 4 &&
               globalValidatePassword(state.newPassword) &&
               state.confirmPassword.trim() === state.newPassword.trim()
          );
     };

     var [eyeclick, setEyeclick] = useState(false);
     var [eyeclick2, setEyeclick2] = useState(false);

     const validatePassword = () => {
          const isPasswordValid = globalValidatePassword(state.newPassword);
          setPasswordVal(isPasswordValid);
     };
     const Token = (
          <form onSubmit={handleSetNewPassword}>
               <fieldset>
                    <input
                         type="text"
                         placeholder="****"
                         ref={newTokenRef}
                         inputMode="numeric"
                         autoComplete="off"
                         className="otpToken"
                         maxLength={4}
                         value={state.token}
                         onChange={(e) => {
                              setState({
                                   ...state,
                                   token: e.target.value.trim(),
                              });
                         }}
                         onFocus={() => {
                              setToken({
                                   ...tokenResetMessage,
                                   string: "",
                              });
                              setPasswordVal(true);
                         }}
                    />
               </fieldset>
               <fieldset>
                    <div className="eyeIconsRelativeDivs">
                         <input
                              type={eyeclick === false ? "password" : "text"}
                              className="passwordForgot"
                              autoComplete="off"
                              placeholder="Enter a new password"
                              ref={newPasswordRef}
                              value={state.newPassword}
                              onFocus={() => {
                                   if (state.token.length !== 4) {
                                        newTokenRef.current.focus();
                                   }
                                   setState({
                                        ...state,
                                        confirmPassword: "",
                                   });
                                   setToken({
                                        ...tokenResetMessage,
                                        string: "",
                                   });
                                   setConfirmPasswordVal(true);
                              }}
                              onChange={(e) => {
                                   e.preventDefault();
                                   setState({
                                        ...state,
                                        newPassword: e.target.value.trimStart(),
                                        confirmPassword: "",
                                   });
                                   setPasswordVal(true);
                              }}
                              onBlur={validatePassword}
                         />
                         <div
                              onClick={() => {
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
                              *Contain both lowercase and uppercase letters*{" "}
                              <br />
                              *Have atleast one special character e.g (#, %, $,
                              . . .) *
                         </p>
                    ) : null}
               </fieldset>

               <fieldset>
                    <div className="eyeIconsRelativeDivs">
                         <input
                              type={eyeclick2 === false ? "password" : "text"}
                              className="passwordForgot"
                              placeholder="Confirm password"
                              autoComplete="off"
                              ref={confirmPasswordRef}
                              value={state.confirmPassword}
                              onFocus={() => {
                                   if (
                                        passwordValidated === false ||
                                        state.newPassword === ""
                                   ) {
                                        newPasswordRef.current.focus();
                                   }
                                   setToken({
                                        ...tokenResetMessage,
                                        string: "",
                                   });
                              }}
                              onChange={(e) => {
                                   e.preventDefault();
                                   setState({
                                        ...state,
                                        confirmPassword: e.target.value,
                                   });
                                   if (state.newPassword === e.target.value) {
                                        setConfirmPasswordVal(true);
                                   } else {
                                        setConfirmPasswordVal(false);
                                   }
                              }}
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

               <button
                    className="resetButtons"
                    disabled={!validateFields()}
                    type="submit"
               >
                    Reset Password
               </button>
               <button
                    className="goBack"
                    onClick={(e) => {
                         e.preventDefault();

                         setState({
                              ...state,
                              email: "",
                              token: "",
                              newPassword: "",
                              confirmPassword: "",
                         });
                         setEmailMessage({
                              ...emailSentMessage,
                              string: "",
                              state: true,
                         });
                         setStep(1);
                    }}
               >
                    Previous
               </button>

               <p
                    className={
                         tokenResetMessage.state === true
                              ? "accountFound"
                              : "fieldCheckers"
                    }
               >
                    {tokenResetMessage.string}
               </p>
          </form>
     );

     return (
          <div className="ForgotPassword">
               <header>
                    <img className="brand" src={tranquilLogo} alt="" />
                    {step === 1 && <p>Reset your password with a few steps</p>}
                    {step === 2 && (
                         <p>Enter new password with otp sent to your mail</p>
                    )}
               </header>

               {step === 1 ? Email : Token}
          </div>
     );
}

export default Forgot;
