import "./Otp.css";
import { useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FormDetails } from "../../Globals/FormContext";
import { api } from "../../Globals/Globals";
import tranquil from "../../../Assets/brand_gold.svg";

function Otp() {
    var navigate = useNavigate();
    var { email } = FormDetails();
    var [initialTimeCount, setInitialTimeCount] = useState(30);
    var [otp, setOtp] = useState({
        token: "",
    });
    var [message, setMessage] = useState({
        string: "",
        state: false,
    });
    var [resendMessage, setResendMessage] = useState({
        string: "",
        state: true,
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
        if (email) {
            fetch(`${api}/auth/verify-otp`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
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
                        setTimeout(() => {
                            setOtp({
                                ...Otp,
                                token: "",
                            });
                        }, 1000);
                    }
                });
        }
    };

    const handleResend = (e) => {
        e.preventDefault();
        setInitialTimeCount(30 + initialTimeCount);
        setOtp({
            ...Otp,
            token: "",
        });
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
        fetch(`${api}/auth/resend-otp`, requestOptions).then((response) =>
            response.json()
        );

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

    const [timeCount, dispatch] = useReducer(timerReducer, initialTimeCount);

    const resend = (
        <span className="resend" onClick={handleResend}>
            Resend
        </span>
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch({ type: "countDown" });
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeCount]);

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
                            message.state === true ? "validotp" : "invalidotp"
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
                        Resend in <span className="secs">{timeCount}</span> secs
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
