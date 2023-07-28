// importing css
import "./App.css";
//react hooks, some of react's basic functionality
import { useEffect, useState } from "react";
//React Hook used for defining routes to pages
import { Routes, Route, useNavigate } from "react-router";
//These are the contexts that handle data passed throught the different pages
import { FormProvider } from "./Components/FormContext";
import { UserProvider } from "./Components/Tranquil App/UserContext";
//logo import
import tranquilLogo from "./Assets/home_logo.svg";
//importing pages/components
import Login from "./Components/Login Page/Login";
import Slides from "./Components/SignUp Page/Slides/Slides";
import SignUp from "./Components/SignUp Page/SignUp";
import Otp from "./Components/SignUp Page/OTP/Otp";
import SignIn from "./Components/Login Page/SignIn/SignIn";
import Forgot from "./Components/ForgotPassword/Forgot";
import User from "./Components/Tranquil App/User";
import Redirector from "./Components/redirector";

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
               <UserProvider>
                    <Routes>
                         <Route index element={<Opening />} />
                         <Route path="/login" element={<Login />} />
                         <Route path="/signIn" element={<SignIn />} />
                         <Route
                              path="/signIn/forgotPassword"
                              element={<Forgot />}
                         />
                         <Route path="/signUp" element={<SignUp />} />
                         <Route path="/getStarted" element={<Slides />} />
                         <Route path="/otp/" element={<Otp />} />
                         <Route path="/user/*" element={<User />} />
                         <Route
                              path="/redirectPage/:token"
                              element={<Redirector />}
                         />
                    </Routes>
               </UserProvider>
          </FormProvider>
          //These are the routes to various pages of the app
     );
}

export default App;
