import { useEffect, useRef, useState } from "react";
import "./App.css";
import Login from "./Components/Login Page/Login";
import Slides from "./Components/SignUp Page/Slides/Slides";
import SignUp from "./Components/SignUp Page/SignUp";
import { Routes, Route } from "react-router";
import Logo from "./Assets/home_logo.svg";

function App() {
     const [loaded, setLoaded] = useState(false);

     function Opening() {
          const textRef = useRef();
          const handleText = () => {
               textRef.current.innerText = "Unleash The Power Within";
          };

          useEffect(() => {
               window.addEventListener("load", handleText());
               setTimeout(() => {
                    textRef.current.innerText = "Find Your Inner Balance";
               }, 2000);
          });
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

     setTimeout(() => {
          setLoaded(true);
     }, 4500);

     return (
          <Routes>
               <Route
                    exact
                    path="/"
                    element={loaded === false ? <Opening /> : <Login />}
               />
               <Route path="/getStarted" element={<Slides />} />
               <Route path="/createAccount" element={<SignUp />} />
          </Routes>
     );
}

export default App;
