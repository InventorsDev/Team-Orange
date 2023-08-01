import "./Home.css";
import { useEffect, useState } from "react";
import resources from "../Assets/resourcesQuick.svg";
import goalSetting from "../Assets/goalSetting.svg";
import assessment from "../Assets/assessmentQuick.svg";
import journal from "../Assets/journalQuick.svg";
import happy from "../Assets/happy.svg";
import anxious from "../Assets/anxious.svg";
import stressed from "../Assets/stressed.svg";
import angry from "../Assets/angry.svg";
import exclamation from "../Assets/exclamation.svg";
import writingHand from "../Assets/writingHand.svg";
import writingSun from "../Assets/writingSun.svg";
import selfCareLove from "../Assets/selfCareLove.svg";
import selfCareStar from "../Assets/selfCareStar.svg";
import goalsFlower from "../Assets/goalsFlowers.svg";
import homeGreen from "../Assets/homeGreen.svg";
import resourcesBlack from "../Assets/resourcesBlack.svg";
import goalsBlack from "../Assets/goalsBlack.svg";
import communityBlack from "../Assets/communityBlack.svg";
import profileBlack from "../Assets/profileBlack.svg";
import { preloadImages } from "../../Globals";
import Footer from "../Footer";
import Spinner from "../../Spinner";
// import { FormDetails } from "../../FormContext";

function Home() {
     var date = new Date();
     var day = date.getDate();
     var month = date.getMonth();
     var year = date.getFullYear();
     var months = [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
     ];
     var monthString = months[month];

     var tests = [
          {
               name: "Anxiety :",
               text: "Do you always feel anxious at everything ?",
          },
          {
               name: "Depression :",
               text: "Always tired and exhausted ?",
          },
          {
               name: "Stress :",
               text: "Isolating yourself from the world ?",
          },

          {
               name: "Eating Disorder :",
               text: "Have dieting issues ?",
          },
     ];

     var image = {
          home: homeGreen,
          resources: resourcesBlack,
          goals: goalsBlack,
          community: communityBlack,
          profile: profileBlack,
     };

     var [isImagesLoading, setImagesLoaded] = useState(false);
     useEffect(() => {
          const imagesToPreload = [
               resources,
               goalSetting,
               assessment,
               journal,
               happy,
               anxious,
               stressed,
               angry,
               exclamation,
               writingHand,
               writingSun,
               selfCareLove,
               selfCareStar,
               goalsFlower,
               homeGreen,
               resourcesBlack,
               goalsBlack,
               communityBlack,
               profileBlack,
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

     // var { token } = FormDetails();

     // useEffect(() => {
     //      if (token) {
     //           var requests = {
     //                method: "GET",
     //                headers: {
     //                     Authorization: `Bearer ${token}`,
     //                },
     //                redirect: "follow",
     //           };
     //           fetch(`${api}/user`, requests)
     //                .then((response) => response.json())
     //                .then((result) => console.log(result));
     //      }
     // }, [token]);
     return (
          <div
               className={`Home ${isImagesLoading === false ? "noScroll" : ""}`}
          >
               {isImagesLoading === false ? <Spinner /> : null}
               <div className="AppContainer">
                    <div className="hiUser">
                         <h1>Hi</h1>
                         <p>
                              {monthString} {day}, {year}
                         </p>
                    </div>
                    <div className="Quote">
                         <p className="quote first">
                              "There's only one of you in the entire world,{" "}
                         </p>
                         <p className="quote">Live it. Love it!"</p>
                         <p className="today">Today's Quote</p>
                    </div>

                    <div className="howAreYou">
                         <h2>How are you feeling today ?</h2>
                         <div className="emojiFlex">
                              <div className="emojiGroup">
                                   <div className="greenBag">
                                        <img src={happy} alt="" />
                                   </div>
                                   <p>Happy</p>
                              </div>
                              <div className="emojiGroup">
                                   <div className="greenBag">
                                        <img src={anxious} alt="" />
                                   </div>
                                   <p>Anxious</p>
                              </div>
                              <div className="emojiGroup">
                                   <div className="greenBag">
                                        <img src={stressed} alt="" />
                                   </div>
                                   <p>Stressed</p>
                              </div>
                              <div className="emojiGroup">
                                   <div className="greenBag">
                                        <img src={angry} alt="" />
                                   </div>
                                   <p>Angry</p>
                              </div>
                         </div>
                    </div>

                    <div className="DailyCheckIn">
                         <h2>Daily Check-in</h2>
                         <p>
                              Get some insights and increase your mental
                              awareness.
                         </p>
                         <p className="second">
                              Based on the assessments results, you will get
                              personalized results and insights.
                         </p>
                         <button className="startTest">Start</button>
                         <div className="exclaim">
                              <img src={exclamation} alt="" className="mark" />
                         </div>
                    </div>

                    <div className="recommended">
                         <h2>Recommended</h2>
                         <p>
                              Deep dive into your mental health with our finely
                              set questionnaires
                         </p>

                         <div className="asde">
                              <div className="asdeContainer">
                                   {tests.map((test, index) => (
                                        <div key={index} className="asdeBox">
                                             <h3>{test.name}</h3>
                                             <p className="test">{test.text}</p>
                                             <p className="test2">
                                                  Take this test!
                                             </p>
                                        </div>
                                   ))}
                              </div>
                         </div>
                    </div>
                    <div className="quickAccess">
                         <h2>Quick Access</h2>
                         <div className="mrFlex">
                              <div className="resources">
                                   <div>
                                        <section>
                                             <img alt="" src={resources} />
                                             <span>Resources</span>
                                        </section>
                                   </div>
                              </div>

                              <div className="goalSetting">
                                   <div>
                                        <section>
                                             <img alt="" src={goalSetting} />
                                             <span>Goal Setting</span>
                                        </section>
                                   </div>
                              </div>

                              <div className="assessment">
                                   <div>
                                        <section>
                                             <img alt="" src={assessment} />
                                             <span>Assessments</span>
                                        </section>
                                   </div>
                              </div>

                              <div className="journal">
                                   <div>
                                        <section>
                                             <img alt="" src={journal} />
                                             <span>Journal</span>
                                        </section>
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className="Resources">
                         <h2>Resources</h2>
                         <div className="resource">
                              <div className="benefits">
                                   <div>
                                        <p>Benefits of writing</p>
                                        <img
                                             className="writingHand"
                                             alt=""
                                             src={writingHand}
                                        />
                                        <img
                                             className="writingSun"
                                             alt=""
                                             src={writingSun}
                                        />
                                   </div>
                              </div>

                              <div className="selfCare">
                                   <div>
                                        <p>Self-Care Routine</p>
                                        <img
                                             className="selfCareLove"
                                             alt=""
                                             src={selfCareLove}
                                        />
                                        <img
                                             className="selfCareStar"
                                             alt=""
                                             src={selfCareStar}
                                        />
                                   </div>
                              </div>
                              <div className="setGoals">
                                   <div>
                                        <p>Setting up your Goals</p>
                                        <img
                                             className="goalsFlower"
                                             alt=""
                                             src={goalsFlower}
                                        />
                                   </div>
                              </div>
                              <div className="journals">
                                   <div>
                                        <p>How to journal well</p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
               <Footer currentPage="home" image={image} />
          </div>
     );
}

export default Home;
