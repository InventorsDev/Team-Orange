import { useState, useEffect } from "react";
import "./Intro.css";
import journal from "../Assets/Journal.svg";
import breathe from "../Assets/Breathe.svg";
import meditate from "../Assets/Meditate.svg";
import read from "../Assets/Read.svg";
import listen from "../Assets/Listen.svg";
import health from "../Assets/Health.svg";
import backwards from "../Assets/back.svg";
import { FormDetails } from "../FormContext";
import { preloadImages, api } from "../Globals";
import { useNavigate } from "react-router";
import logo from "../../../Assets/brand_gold.svg";
import Spinner from "../Spinner";

function Intro() {
     var [currentPage, setCurrentPage] = useState(1);
     var { email, token } = FormDetails();
     var navigate = useNavigate();

     const WayToHelp = () => {
          var prompts = [
               "Increase Productivity",
               "Reduce / Manage Stress",
               "Reduce mood swings",
               "Self Care / Improvement",
               "Improve Sleep",
               "Others",
          ];
          return (
               <div className="waysToHelp">
                    <header>
                         <h1>How can Tranquil help to improve your mind ?</h1>
                         <p>
                              Our goal is to assist you and improve your mental
                              health
                              <br />
                              How can we help today?
                         </p>
                    </header>
                    <div className="questions">
                         {prompts.map((element, index) => (
                              <div
                                   key={index}
                                   onClick={(e) => {
                                        if (e.target.className === "clicked") {
                                             e.target.className = "";
                                        } else {
                                             e.target.className = "clicked";
                                        }
                                   }}
                              >
                                   {element}
                              </div>
                         ))}

                         <button
                              onClick={() => {
                                   setCurrentPage(2);
                              }}
                         >
                              Next
                         </button>
                    </div>
               </div>
          );
     };

     const SelectActivities = () => {
          var [isImagesLoading, setImagesLoaded] = useState(false);
          useEffect(() => {
               const imagesToPreload = [
                    journal,
                    breathe,
                    meditate,
                    read,
                    listen,
                    health,
               ];

               preloadImages(imagesToPreload)
                    .then(() => {
                         const imageTimer = setTimeout(() => {
                              setImagesLoaded(true);
                         }, 1000);

                         return () => {
                              clearTimeout(imageTimer);
                         };
                    })
                    .catch((error) => {
                         console.log("Error Loading Images", error);
                    });
          }, []);

          return (
               <div className="selectActivities">
                    {isImagesLoading === false ? <Spinner /> : null}
                    <div className="nav">
                         <img
                              src={backwards}
                              alt=""
                              onClick={() => {
                                   setCurrentPage(1);
                              }}
                         />
                    </div>
                    <header>
                         <h1>
                              Select the activities you would most likely enjoy
                         </h1>
                         <p>
                              Your answers won't affect your offers and you can
                              change your activities anytime !
                         </p>
                    </header>

                    <div className="activities">
                         <div
                              onClick={(e) => {
                                   if (e.target.className === "clicked-1") {
                                        e.target.className = "";
                                   } else {
                                        e.target.className = "clicked-1";
                                   }
                              }}
                         >
                              <img src={journal} alt="" />
                              <p>Journal</p>
                         </div>
                         <div
                              onClick={(e) => {
                                   if (e.target.className === "clicked-2") {
                                        e.target.className = "";
                                   } else {
                                        e.target.className = "clicked-2";
                                   }
                              }}
                         >
                              <img src={breathe} alt="" />
                              <p>Breathe</p>
                         </div>
                         <div
                              onClick={(e) => {
                                   if (e.target.className === "clicked-3") {
                                        e.target.className = "";
                                   } else {
                                        e.target.className = "clicked-3";
                                   }
                              }}
                         >
                              <img src={meditate} alt="" />
                              <p>Meditate</p>
                         </div>
                         <div
                              onClick={(e) => {
                                   if (e.target.className === "clicked-4") {
                                        e.target.className = "";
                                   } else {
                                        e.target.className = "clicked-4";
                                   }
                              }}
                         >
                              <img src={read} alt="" />
                              <p>Read</p>
                         </div>
                         <div
                              onClick={(e) => {
                                   if (e.target.className === "clicked-5") {
                                        e.target.className = "";
                                   } else {
                                        e.target.className = "clicked-5";
                                   }
                              }}
                         >
                              <img src={listen} alt="" />
                              <p>Listen</p>
                         </div>
                         <div
                              onClick={(e) => {
                                   if (e.target.className === "clicked-6") {
                                        e.target.className = "";
                                   } else {
                                        e.target.className = "clicked-6";
                                   }
                              }}
                         >
                              <img src={health} alt="" />
                              <p>Health habits</p>
                         </div>
                    </div>
                    <button
                         onClick={() => {
                              setCurrentPage(3);
                         }}
                    >
                         Next
                    </button>
               </div>
          );
     };

     const Username = () => {
          const handleSubmit = (e) => {
               e.preventDefault();
               var details = {
                    email: email,
                    username: state.username.trim(),
               };
               var requests = {
                    method: "POST",
                    headers: {
                         Authorization: `Bearer ${token}`,
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify(details),
                    redirect: "follow",
               };
               fetch(`${api}/user/set-username`, requests)
                    .then((response) => response.json())
                    .then((result) => {
                         console.log(result);
                         if (result.statusCode === 200) {
                              setMessage({
                                   ...message,
                                   string: result.message,
                                   status: true,
                              });
                              setTimeout(() => {
                                   navigate("/getStarted");
                              }, 2000);
                         } else {
                              setMessage({
                                   ...message,
                                   string: result.validationErrors.username[0],
                                   status: false,
                              });
                         }
                    })
                    .catch((err) => console.log("Error:", err));
          };

          const getUsernameState = () => {
               return state.username;
          };

          var [state, setState] = useState({
               username: "",
          });

          var [message, setMessage] = useState({
               string: "",
               status: true,
          });

          return (
               <div className="username">
                    <header>
                         <img src={logo} alt="" />
                         <p>Help us identify you uniquely</p>
                    </header>

                    <form onSubmit={handleSubmit}>
                         <input
                              type="text"
                              value={state.username}
                              onChange={(e) => {
                                   setState({
                                        ...state,
                                        username: e.target.value.trimStart(),
                                   });
                              }}
                              placeholder="Username"
                         />
                         <button type="submit" disabled={!getUsernameState()}>
                              Submit
                         </button>
                    </form>

                    {message.string ? (
                         <p className={message.status ? "success" : "fail"}>
                              {message.string}
                         </p>
                    ) : null}
               </div>
          );
     };

     return (
          <div className="Intro">
               {currentPage === 1 && <WayToHelp />}
               {currentPage === 2 && <SelectActivities />}
               {currentPage === 3 && <Username />}
          </div>
     );
}
export default Intro;
