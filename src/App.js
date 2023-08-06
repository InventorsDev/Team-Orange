// importing css
import "./App.css";
//react hooks, some of react's basic functionality
import { useEffect, useState } from "react";
//React Hook used for defining routes to pages
import { Routes, Route, useNavigate } from "react-router";
//context
import { FormProvider } from "./Components/FormContext";
//logo import
import tranquilLogo from "./Assets/home_logo.svg";
//importing pages/components
import Login from "./Components/Login Page/Login";
import Slides from "./Components/SignUp Page/Slides/Slides";
import SignUp from "./Components/SignUp Page/SignUp";
import Otp from "./Components/SignUp Page/OTP/Otp";
import SignIn from "./Components/Login Page/SignIn/SignIn";
import Forgot from "./Components/ForgotPassword/Forgot";
import Redirector from "./Components/redirector";
import Home from "./Components/Tranquil App/Home/Home.jsx";
import Resources from "./Components/Tranquil App/Resources/Resources.jsx";
import Goals from "./Components/Tranquil App/Goals/Goals.jsx";
import Community from "./Components/Tranquil App/Community/Community.jsx";
import Profile from "./Components/Tranquil App/Profile/Profile.jsx";
import EditProfile from "./Components/Tranquil App/Profile/EditProfile.jsx";
import Journal from "./Components/Tranquil App/Home/Journal/Journal";
import Intro from "./Components/Tranquil App/Introduction/Intro";

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
               <Routes>
                    <Route index element={<Opening />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signIn" element={<SignIn />} />
                    <Route path="/signIn/forgotPassword" element={<Forgot />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/getStarted" element={<Slides />} />
                    <Route path="/otp" element={<Otp />} />
                    <Route
                         path="/redirectPage/:token"
                         element={<Redirector />}
                    />
                    <Route path="/home" element={<Home />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/goals" element={<Goals />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route
                         path="/profile/editProfile"
                         element={<EditProfile />}
                    />
                    <Route path="/journal" element={<Journal />} />
                    <Route path="/intro" element={<Intro />} />
               </Routes>
          </FormProvider>
          //These are the routes to various pages of the app
     );
}

export default App;
