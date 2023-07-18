import "./Otp.css";
import { useState } from "react";
import tranquil from "../../../Assets/brand_gold.svg";
import { useNavigate } from "react-router";

function Otp() {
     var [timeCount, setTimeCount] = useState(60);
     setTimeout(() => {
          if (timeCount > 0) {
               setTimeCount((timeCount -= 1));
          }
     }, 1000);

     const resend = (
          <span href="#" className="resend">
               Resend
          </span>
     );

     var [otp, setOtp] = useState();
     const navigate = useNavigate();
     const handleSubmit = () => {
          navigate("/getStarted");
     };

     return (
          <div className="OTP">
               <div className="OtpContainer">
                    <header className="Hello">
                         <img className="brand" src={tranquil} alt="" />

                         <p>A 4 digit otp has been sent to your email</p>
                    </header>
                    <form onSubmit={handleSubmit}>
                         <fieldset className="otp">
                              <input
                                   type="text"
                                   placeholder="****"
                                   inputMode="numeric"
                                   className="otps"
                                   maxLength={4}
                                   value={otp}
                                   onChange={(e) => {
                                        setOtp(e.target.value);
                                   }}
                              />
                         </fieldset>
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
