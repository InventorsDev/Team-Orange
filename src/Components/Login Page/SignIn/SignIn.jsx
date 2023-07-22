import "./SignIn.css";
import tranquil from "../../../Assets/brand_gold.svg";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function SignIn() {
     const navigate = useNavigate();

     const [state, setState] = useState({
          email: "",
          password: "",
     });

     var [emailValidated, setEmailVal] = useState();
     const validateEmail = () => {
          const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
          const isEmailValid = !!state.email.match(emailRegex);
          setEmailVal(isEmailValid);
     };

     function Clearform() {
          setState({
               ...state,
               email: "",
               password: "",
          });
     }

     var [message, setMessage] = useState(" ");
     const handleSubmit = (e) => {
          e.preventDefault();
          setMessage("Hang on a sec");
          var userDetails = {
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
          fetch("https://tranquil.skrind.com/api/v1/auth/login", requestOptions)
               .then((response) => response.json())
               .then((result) => {
                    console.log(result);

                    setMessage(result.message);
                    if (result.statusText === "success") {
                         setTimeout(() => {
                              setMessage(
                                   "Will navigate you to home page shortly"
                              );
                              Clearform();
                         }, 500);
                         setTimeout(() => {
                              navigate(`/home/${result.data.token}`);
                         }, 1000);
                    } else {
                         return false;
                    }
               })
               .catch((error) => console.log("error", error.message));
     };

     var [eyeclick, setEyeclick] = useState(false);
     var emailRef = useRef();
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
                         <form className="signInForm" onSubmit={handleSubmit}>
                              <fieldset>
                                   <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={state.email}
                                        ref={emailRef}
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
                                             setMessage("");
                                        }}
                                        onBlur={validateEmail}
                                   />
                              </fieldset>

                              <fieldset>
                                   <input
                                        type={
                                             eyeclick === false
                                                  ? "password"
                                                  : "text"
                                        }
                                        placeholder="Enter your password"
                                        value={state.password}
                                        onFocus={() => {
                                             if (state.email === "") {
                                                  emailRef.current.focus();
                                             }
                                        }}
                                        onChange={(e) => {
                                             e.preventDefault();

                                             setState({
                                                  ...state,
                                                  password: e.target.value,
                                             });
                                             setMessage("");
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
                              </fieldset>

                              <button type="submit" className="signInButton">
                                   Sign In
                              </button>
                              <p
                                   className={`valids ${
                                        message ===
                                             "The provided credentials are incorrect." &&
                                        "red"
                                   }`}
                              >
                                   {message}
                              </p>
                              <p>
                                   <Link to="forgotPassword" className="forgot">
                                        Forgot password ?
                                   </Link>
                              </p>
                         </form>
                    </div>
               </div>
          </>
     );
}

export default SignIn;
