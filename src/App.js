import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { FormProvider } from "./Components/Globals/FormContext";
import tranquilLogo from "./Assets/home_logo.svg";
import Login from "./Components/Forms/Login/Login";
import SignIn from "./Components/Forms/SignIn/SignIn";
import SignUp from "./Components/Forms/SignUp/SignUp";
import Slides from "./Components/Forms/Slides/Slides";
import Prompts from "./Components/Forms/NewUserPrompt/Prompt";
import Redirector from "./Components/Forms/Redirect/Redirector";
import Otp from "./Components/Forms/OTP/Otp";
import Forgot from "./Components/Forms/ForgotPassword/Forgot";
import Tranquil from "./Components/Tranquil App/Tranquil/Tranquil";
import Profile from "./Components/Tranquil App/Profile/Profile/Profile";
import EditProfile from "./Components/Tranquil App/Profile/Profile_Update/UpdateProfile";
import { PageProvider } from "./Components/Tranquil App/Tranquil/PageContext";
import Assessments from "./Components/Tranquil App/Home/AssessmentSchema/Assessment";
import Results from "./Components/Tranquil App/Home/AssessmentResults/Results";
import { useRef } from "react";
import { preloadImages } from "./Components/Globals/Globals";

function App() {
    var navigate = useNavigate();
    var textRef = useRef();
    var [loaded, setLoaded] = useState(false);
    function Opening() {
        useEffect(() => {
            setTimeout(() => {
                textRef.current.innerText = "Find your inner Balance";
            }, 1500);

            setTimeout(() => {
                navigate("/login");
            }, 4100);
        });

        preloadImages([tranquilLogo]).then(() => {
            setLoaded(true);
        });
        return (
            <>
                {" "}
                {loaded ? (
                    <div className="Opening">
                        <div className="container">
                            <header>
                                <div className="imgText">
                                    <div className="logo">
                                        <img src={tranquilLogo} alt="" />
                                    </div>
                                    <p className="firstText" ref={textRef}>
                                        Unleash the Power within
                                    </p>
                                </div>
                            </header>
                        </div>
                    </div>
                ) : null}
            </>
        );
    }

    return (
        <FormProvider>
            <PageProvider>
                <Routes>
                    <Route index element={<Opening />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signIn" element={<SignIn />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/getStarted" element={<Slides />} />
                    <Route path="/newUser" element={<Prompts />} />
                    <Route
                        path="/redirectPage/:token"
                        element={<Redirector />}
                    />
                    <Route path="/otp" element={<Otp />} />
                    <Route path="/forgotPassword" element={<Forgot />} />
                    <Route path="/tranquil/*" element={<Tranquil />} />
                    <Route path="/tranquil/profile/" element={<Profile />} />
                    <Route
                        path="/tranquil/profile/editProfile"
                        element={<EditProfile />}
                    />
                    <Route
                        path="/tranquil/assessments/:test/:specifics"
                        element={<Assessments />}
                    />
                    <Route
                        path="/tranquil/assessments/results/:test/:score"
                        element={<Results />}
                    />
                </Routes>
            </PageProvider>
        </FormProvider>
        //These are the routes to various pages of the app
    );
}

export default App;
