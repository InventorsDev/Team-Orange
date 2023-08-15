// importing css
import "./App.css";
//react hooks, some of react's basic functionality
import { useEffect, useState } from "react";
//React Hook used for defining routes to pages
import { Routes, Route, useNavigate } from "react-router";
//context
import { FormProvider } from "./Components/Globals/FormContext";
//logo import
import tranquilLogo from "./Assets/home_logo.svg";
//importing pages/components
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
function App() {
    var navigate = useNavigate();
    var [openingCompleted, setCompletionState] = useState(false);
    var [firstTextDisplay, setNewTextDisplay] = useState(true);
    function Opening() {
        useEffect(() => {
            const firstTextTimer = setTimeout(() => {
                setNewTextDisplay(false);
            }, 2000);

            const introTimer = setTimeout(() => {
                setCompletionState(true);
            }, 2100);

            return () => {
                clearTimeout(firstTextTimer);
                clearTimeout(introTimer);
            };
        }, []);
        useEffect(() => {
            openingCompleted === true && navigate("/login");
        });

        return (
            <div className="Opening">
                <header>
                    <div className="imgText">
                        <div className="logo">
                            <img src={tranquilLogo} alt="" />
                        </div>

                        {firstTextDisplay ? (
                            <p className="firstText">
                                Unleash the Power within
                            </p>
                        ) : (
                            <p className="secondText">
                                Find your inner Balance
                            </p>
                        )}
                    </div>
                </header>
            </div>
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
                </Routes>
            </PageProvider>
        </FormProvider>
        //These are the routes to various pages of the app
    );
}

export default App;
