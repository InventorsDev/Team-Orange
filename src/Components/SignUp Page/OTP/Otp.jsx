import "./Otp.css";
import { useState } from "react"; //refer back to app.js file
import tranquil from "../../../Assets/brand_gold.svg";
import { useNavigate } from "react-router"; //refer back to login.jsx file
import { useParams } from "react-router";

function Otp() {
     var { email } = useParams();
     const navigate = useNavigate();

     var [otp, setOtp] = useState({
          token: "",
     });
     var [message, setMessage] = useState("");
     const handleSubmitOTP = () => {
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

          setMessage("Hang on a sec");
          fetch(
               "https://tranquil.skrind.com/api/v1/auth/verify-otp",
               requestOptions
          )
               .then((response) => response.json())
               .then((result) => {
                    console.log(result);
                    if (result.statusCode === 200) {
                         setMessage(
                              "Email verified, you will be redirected shortly"
                         );
                         setTimeout(() => {
                              navigate(`/signIn`);
                         }, 2000);
                    } else {
                         setMessage("Invalid otp token");
                    }
               })
               .catch((error) => console.log("error", error));
          setOtp({ ...otp, token: "" });
     };

     const handleResend = () => {
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
          fetch(
               "https://tranquil.skrind.com/api/v1/auth/resend-otp",
               requestOptions
          )
               .then((response) => response.json())
               .then((result) => console.log(result))
               .catch((error) => console.log("error", error));
          setTimeCount(60);
     };

     var [timeCount, setTimeCount] = useState(30);
     setTimeout(() => {
          if (timeCount > 0) {
               setTimeCount((timeCount -= 1));
          }
     }, 1000);

     const resend = (
          <span className="resend" onClick={handleResend}>
               Resend
          </span>
     );

     return (
          <div className="OTP">
               <div className="OtpContainer">
                    <header className="Hello">
                         <img className="brand" src={tranquil} alt="" />

                         <p>A 4 digit otp has been sent to your email</p>
                    </header>
                    <form onSubmit={handleSubmitOTP}>
                         <fieldset className="otp">
                              <input
                                   type="text"
                                   placeholder="****"
                                   inputMode="numeric"
                                   className="otps"
                                   maxLength={4}
                                   value={otp.token}
                                   onChange={(e) => {
                                        setOtp({
                                             ...otp,
                                             token: e.target.value,
                                        });
                                   }}
                              />
                         </fieldset>

                         <p>{message}</p>
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
                                   <span className="secs">{timeCount}</span>{" "}
                                   secs
                              </>
                         )}
                    </p>
               </div>
          </div>
     );
}

export default Otp;
