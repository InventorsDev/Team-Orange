import { useEffect, useRef } from "react"; //react hooks
import "./App.css"; // importing css
import Login from "./Components/Login Page/Login";
import Slides from "./Components/SignUp Page/Slides/Slides";
import SignUp from "./Components/SignUp Page/SignUp";
import Otp from "./Components/SignUp Page/OTP/Otp";
import { Routes, Route } from "react-router";
import Logo from "./Assets/home_logo.svg";
import { useNavigate } from "react-router"; //Used to navigate to a defined route
import SignIn from "./Components/Login Page/SignIn/SignIn";

function App() {
     //This is the function that returns the page that shows when the website is loaded. As the name denotes, Opening
     function Opening() {
          const navigate = useNavigate();
          const textRef = useRef();
          const handleText = () => {
               textRef.current.innerText = "Unleash The Power Within";
          };

          useEffect(() => {
               window.addEventListener("load", handleText());
               setTimeout(() => {
                    textRef.current.innerText = "Find Your Inner Balance";
               }, 2000); //This is for the animation that changes the text
          });
          setTimeout(() => {
               navigate("/login");
          }, 4500); //This timeout here navigates to the login page automatically after 4500s
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
               <Route path="/getStarted" element={<Slides />} />
               <Route path="/createAccount" element={<SignUp />} />
               <Route path="/otp" element={<Otp />} />
          </Routes>
          //These are the routes to various parts of the app
     );
}

export default App;
