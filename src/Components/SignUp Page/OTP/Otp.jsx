import "./Otp.css";
import { useReducer, useState, useEffect } from "react"; //refer back to app.js file
import tranquil from "../../../Assets/brand_gold.svg";
import { useNavigate } from "react-router"; //refer back to login.jsx file
import { FormDetails } from "../../FormContext";
import { api } from "../../Globals";

function Otp() {
     var { email } = FormDetails();
     const navigate = useNavigate();
     var [otp, setOtp] = useState({
          token: "",
     });

     var [message, setMessage] = useState({
          string: "",
          state: false,
     });

     const handleSubmitOTP = (e) => {
          e.preventDefault();
          var otpDetails = {
               token: otp,
               email: email,
          };
          var requestOptions = {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(otpDetails),
               redirect: "follow",
          };

          setMessage({
               ...message,
               string: "Hang on a sec",
               state: true,
          });
          fetch(`${api}/verify-otp`, requestOptions)
               .then((response) => response.json())
               .then((result) => {
                    console.log(result);
                    if (result.statusCode === 200) {
                         setMessage({
                              ...message,
                              string: "Email verified, redirecting you shortly. . .",
                              state: true,
                         });
                         setOtp({ ...otp, token: "" });
                         setTimeout(() => {
                              navigate("/signIn");
                         }, 2000);
                    } else {
                         setMessage({
                              ...message,
                              string: "Invalid Token",
                              state: false,
                         });
                    }
               })
               .catch((error) => console.log("error", error));
     };

     var [resendMessage, setResendMessage] = useState({
          string: "",
          state: true,
     });

     const handleResend = (e) => {
          e.preventDefault();
          setInitialTimeCount(30 + initialTimeCount);
          setResendMessage({
               ...resendMessage,
               string: "A new token has been sent to you",
               state: true,
          });
          dispatch({
               type: "resetCountDown",
               initialTime: initialTimeCount,
          });
          var emailToResend = {
               email: email,
          };

          var requestOptions = {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(emailToResend),
               redirect: "follow",
          };
          fetch(`${api}/auth/resend-otp`, requestOptions)
               .then((response) => response.json())
               .then((result) => console.log(result))
               .catch((error) => console.log("error", error));

          const resetTimer = setTimeout(() => {
               setResendMessage({
                    ...resendMessage,
                    string: "",
                    state: true,
               });
          }, 3000);

          return () => {
               clearTimeout(resetTimer);
          };
     };

     const timerReducer = (state, action) => {
          switch (action.type) {
               case "countDown":
                    return state > 0 ? state - 1 : state;
               case "resetCountDown":
                    return action.initialTime;
               default:
                    return state;
          }
     };

     var [initialTimeCount, setInitialTimeCount] = useState(30);

     const [timeCount, dispatch] = useReducer(timerReducer, initialTimeCount);

     useEffect(() => {
          const timer = setTimeout(() => {
               dispatch({ type: "countDown" });
          }, 1000);

          return () => clearTimeout(timer);
     }, [timeCount]);

     const resend = (
          <span className="resend" onClick={handleResend}>
               Resend
          </span>
     );

     return (
          <div className="Otp">
               <header>
                    <img className="brand" src={tranquil} alt="" />

                    <p>A 4 digit otp has been sent to your email</p>
               </header>
               <form onSubmit={handleSubmitOTP} className="otpForm">
                    <fieldset>
                         <input
                              type="text"
                              placeholder="****"
                              inputMode="numeric"
                              maxLength={4}
                              value={otp.token}
                              onChange={(e) => {
                                   setOtp({
                                        ...otp,
                                        token: e.target.value,
                                   });
                              }}
                              onFocus={() => {
                                   setMessage({
                                        ...message,
                                        string: "",
                                        state: true,
                                   });
                              }}
                         />
                    </fieldset>

                    {message.string ? (
                         <p
                              className={
                                   message.state === true
                                        ? "validotp"
                                        : "invalidotp"
                              }
                         >
                              {message.string}
                         </p>
                    ) : null}
                    <button className="verify" type="submit">
                         {" "}
                         Verify
                    </button>
               </form>
               <p className="resendOTP">
                    Didn't receive otp ?{" "}
                    {timeCount === 0 ? (
                         <>{resend}</>
                    ) : (
                         <>
                              Resend in{" "}
                              <span className="secs">{timeCount}</span> secs
                         </>
                    )}
               </p>
               {resendMessage.string ? (
                    <p className="resendMessage">{resendMessage.string}</p>
               ) : null}
          </div>
     );
}

export default Otp;
