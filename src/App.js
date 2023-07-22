import "./App.css"; // importing css
import { useEffect, useRef } from "react"; //react hooks, some of react's basic functionality
import { useNavigate } from "react-router"; //Used to navigate to a defined route (page)
import { Routes, Route } from "react-router"; //React Hook used for navigation
import Logo from "./Assets/home_logo.svg"; //Image import
import Login from "./Components/Login Page/Login"; //importing pages/components
import Slides from "./Components/SignUp Page/Slides/Slides";
import SignUp from "./Components/SignUp Page/SignUp";
import Otp from "./Components/SignUp Page/OTP/Otp";
import Home from "./Components/Tranquil App/Home";
import SignIn from "./Components/Login Page/SignIn/SignIn";
import Forgot from "./Components/ForgotPassword/Forgot";

function App() {
     //Opening Page
     function Opening() {
          const navigate = useNavigate();
          const textRef = useRef();
          const handleText = () => {
               textRef.current.innerText = "Unleash The Power Within";
          }; //Initial Introductory text

          useEffect(() => {
               window.addEventListener("load", handleText());
               setTimeout(() => {
                    textRef.current.innerText = "Find Your Inner Balance";
               }, 2000); //Text Change for the blur animation , occurs after 200 secs
          });
          useEffect(() => {
               setTimeout(() => {
                    navigate("/login");
               }, 4500);
          }, []); //This timeout here navigates to the login page automatically after 4500s}

          return (
               <div className="Opening">
                    <header className="Content">
                         <div className="LogoText">
                              <div className="Text-box">
                                   <img src={Logo} alt="" loading="lazy" />
                              </div>
                              <p ref={textRef} className="text"></p>
                         </div>
                    </header>
               </div>
          );
     }

     return (
          <Routes>
               <Route exact path="/" element={<Opening />} />
               <Route path="/login" element={<Login />} />
               <Route path="/signIn" element={<SignIn />} />
               <Route path="/signIn/forgotPassword" element={<Forgot />} />
               <Route path="/createAccount" element={<SignUp />} />
               <Route path="/getStarted" element={<Slides />} />
               <Route path="/otp/:email" element={<Otp />} />
               <Route path="/home/:token" element={<Home />} />
          </Routes>
          //These are the routes to various pages of the app
     );
}

export default App;
