import "./Forgot.css";
import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
    globalValidateEmail,
    globalValidatePassword,
    api,
} from "../../Globals/Globals";

function Forgot() {
    var navigate = useNavigate();
    var [step, setStep] = useState(1);
    var [state, setState] = useState({
        email: "",
        token: "",
        newPassword: "",
        confirmPassword: "",
    });
    var [emailSentMessage, setEmailMessage] = useState({
        string: "",
        state: false,
    });

    var [tokenResetMessage, setToken] = useState({
        string: "",
        state: true,
    });
    var newPasswordRef = useRef();
    var confirmPasswordRef = useRef();
    var newTokenRef = useRef();
    var [eyeclick, setEyeclick] = useState(false);
    var [eyeclick2, setEyeclick2] = useState(false);
    var [passwordValidated, setPasswordVal] = useState();
    var [confirmPasswordValidated, setConfirmPasswordVal] = useState();

    const getIsEmailValid = () => {
        return globalValidateEmail(state.email);
    };

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
        fetch(`${api}/auth/forgot-password`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
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
            });
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
        fetch(`${api}/auth/reset-password`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
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
            });
    };

    const validateFields = () => {
        return (
            state.token.length === 4 &&
            globalValidatePassword(state.newPassword) &&
            state.confirmPassword.trim() === state.newPassword.trim()
        );
    };

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
                        *Contain both lowercase and uppercase letters* <br />
                        *Have atleast one special character e.g (#, %, $, . . .)
                        *
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
                <h1>Forgot Password</h1>
                {step === 1 && <p>We'll be done in a jiffy</p>}
                {step === 2 && (
                    <p>Reset Token was sent to the provided email address</p>
                )}
            </header>

            {step === 1 ? Email : Token}
        </div>
    );
}

export default Forgot;
