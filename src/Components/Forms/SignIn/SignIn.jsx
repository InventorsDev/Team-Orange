import "./SignIn.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { globalValidateEmail, api } from "../../Globals/Globals";

function SignIn() {
  var navigate = useNavigate();
  var [emailValidated, setEmailVal] = useState();
  var [eyeclick, setEyeclick] = useState(false);
  var emailRef = useRef();
  var [state, setState] = useState({
    email: "",
    password: "",
  });
  var [message, setMessage] = useState({
    string: "",
    state: false,
  });

  const validateEmail = () => {
    const isEmailValid = globalValidateEmail(state.email);
    setEmailVal(isEmailValid);
  };

  const clearForm = () => {
    setState({
      ...state,
      email: "",
      password: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({
      ...message,
      string: "Hang on a sec",
      state: true,
    });

    var signIn = {
      email: state.email,
      password: state.password,
    };

    var request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signIn),
      redirect: "follow",
    };
    fetch(`${api}/auth/login`, request)
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setMessage({
            ...message,
            string: result.message,
            state: true,
          });

          clearForm();
          const navigateTimeOut = setTimeout(() => {
            navigate(`/redirectPage/${result.data.token}`);
          }, 1000);

          return () => {
            clearTimeout(navigateTimeOut);
          };
        } else {
          setMessage({
            ...message,
            string: result.message,
            state: false,
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  function getIsFormValid() {
    return emailValidated && state.password;
  }

  return (
    <>
      <div className="SignIn">
        <header>
          <h1>Welcome !</h1>
          <p>Input your details to continue</p>
        </header>
        <form className="signInForm" onSubmit={handleSubmit}>
          <fieldset>
            <input
              type="text"
              placeholder="Enter your email"
              value={state.email}
              ref={emailRef}
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
                setMessage({
                  ...message,
                  string: "",
                  state: true,
                });
              }}
              onBlur={validateEmail}
            />
          </fieldset>

          {emailValidated === false ? (
            <p className="emailValidated">*Enter a valid email address*</p>
          ) : null}

          <fieldset>
            <input
              type={eyeclick === false ? "password" : "text"}
              placeholder="Enter your password"
              value={state.password}
              onFocus={() => {
                if (state.email === "" || emailValidated === false) {
                  emailRef.current.focus();
                }
              }}
              onChange={(e) => {
                e.preventDefault();

                setState({
                  ...state,
                  password: e.target.value.trimStart(),
                });
                setMessage("");
              }}
              onBlur={validateEmail}
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
          </fieldset>

          <button type="submit" disabled={!getIsFormValid()}>
            Sign In
          </button>
          {message.string ? (
            <p className={`valids ${message.state === false ? "red" : ""}`}>
              {message.string}
            </p>
          ) : null}

          <Link to="/forgotPassword" className="forgot">
            Forgot password ?
          </Link>
        </form>
      </div>
    </>
  );
}

export default SignIn;
