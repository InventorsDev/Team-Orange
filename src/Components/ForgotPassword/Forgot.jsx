import "./Forgot.css";
import { useRef, useState } from "react";
import tranquil from "../../Assets/brand_gold.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
function Forgot() {
     const navigate = useNavigate();
     var [step, setStep] = useState(1);
     var [state, setState] = useState({
          email: "",
          token: "",
          newPassword: "",
          confirmPassword: "",
     });

     var [emailVal, setEmailVal] = useState();

     var [message, setMessage] = useState({
          string: "",
          state: false,
     });
     function handleNext(e) {
          e.preventDefault();

          setMessage({
               ...message,
               string: "Hang on a sec",
               state: true,
          });
          var userDetails = {
               email: state.email,
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
               "https://tranquil.skrind.com/api/v1/auth/forgot-password",
               requestOptions
          )
               .then((response) => response.json())
               .then((result) => {
                    console.log(result);
                    if (result.statusCode === 200) {
                         setMessage({
                              ...message,
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
                         setMessage({
                              ...message,
                              string: result.message,
                              state: false,
                         });
                    }
               })
               .catch((error) => console.log("error", error));
     }
     const Email = (
          <div className="emailInput">
               <form onSubmit={handleNext}>
                    <fieldset>
                         <input
                              type="email"
                              className="emailForgot"
                              placeholder="Enter your email address"
                              value={state.email}
                              onChange={(e) => {
                                   e.preventDefault();
                                   setState({
                                        ...state,
                                        email: e.target.value,
                                   });
                                   setEmailVal(true);
                                   setMessage({
                                        ...message,
                                        string: "",
                                   });
                              }}
                         />
                    </fieldset>

                    <p
                         className={
                              message.state === false
                                   ? "fieldCheckers"
                                   : "accountFound"
                         }
                    >
                         {message.string}
                    </p>

                    <button
                         className="resetButtons"
                         disabled={!emailVal}
                         type="submit"
                    >
                         Next
                    </button>
               </form>
          </div>
     );

     var [tokenResetMessage, setToken] = useState({
          string: "",
          state: true,
     });
     function handleVerify(e) {
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
     }
     var newPasswordRef = useRef();
     var confirmPasswordRef = useRef();
     var newTokenRef = useRef();
     var [confirmPasswordVal, setConfirmPasswordVal] = useState();
     function ValidateFields() {
          if (
               state.token.length === 4 &&
               state.newPassword !== "" &&
               state.confirmPassword === state.newPassword
          ) {
               return true;
          } else {
               return false;
          }
     }
     var [eyeclick, setEyeclick] = useState(false);
     var [eyeclick2, setEyeclick2] = useState(false);
     var [passwordVal, setPasswordVal] = useState();
     const validatePassword = () => {
          const regex =
               /^(?=.*[!@#$%^&*()\-=+{};:,<.>/?[\]\\|`~])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
          const isPasswordValid = !!state.newPassword.match(regex);
          setPasswordVal(isPasswordValid);
     };
     const Token = (
          <div className="tokenInput">
               <form onSubmit={handleVerify}>
                    <fieldset className="otpField">
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
                                        token: e.target.value,
                                   });
                              }}
                              onFocus={() => {
                                   setToken({
                                        ...tokenResetMessage,
                                        string: "",
                                   });
                              }}
                         />
                    </fieldset>
                    <fieldset>
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
                              }}
                              onChange={(e) => {
                                   e.preventDefault();
                                   setState({
                                        ...state,
                                        newPassword: e.target.value,
                                        confirmPassword: "",
                                   });
                                   setPasswordVal(true);
                              }}
                              onBlur={() => {
                                   if (state.token.length === 4) {
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
                                   <FontAwesomeIcon icon={faEyeSlash} />
                              )}
                         </span>
                    </fieldset>
                    <p className="validateMessage">
                         {passwordVal === false &&
                              "*8 or more digit password must contain both lowercase and uppercase letters and atleast one special character*"}
                    </p>
                    <fieldset>
                         <input
                              type={eyeclick2 === false ? "password" : "text"}
                              className="passwordForgot"
                              placeholder="Confirm password"
                              autoComplete="off"
                              ref={confirmPasswordRef}
                              value={state.confirmPassword}
                              onFocus={() => {
                                   if (
                                        passwordVal === false ||
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
                         <span
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
                         </span>
                    </fieldset>
                    <p className="validateMessage">
                         {confirmPasswordVal === false &&
                              "*Passwords must be identical*"}
                    </p>

                    <button
                         className="resetButtons"
                         disabled={!ValidateFields()}
                         type="submit"
                    >
                         Reset Password
                    </button>
                    <button
                         className="resetButtons goBack"
                         onClick={(e) => {
                              e.preventDefault();
                              setMessage({
                                   ...message,
                                   string: "",
                              });
                              setEmailVal(false);
                              setStep(1);
                              setState({
                                   ...state,
                                   email: "",
                                   token: "",
                                   newPassword: "",
                                   confirmPassword: "",
                              });
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
          </div>
     );

     return (
          <div className="ForgotPassword">
               <div className="ResetPassword">
                    <header className="Hello">
                         <img className="brand" src={tranquil} alt="" />
                         {step === 1 && (
                              <p>Reset your password with a few steps</p>
                         )}
                         {step === 2 && (
                              <p>
                                   Enter new password with otp sent to your mail
                              </p>
                         )}
                    </header>
                    {step === 1 ? Email : Token}
               </div>
          </div>
     );
}

export default Forgot;
