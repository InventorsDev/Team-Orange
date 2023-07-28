import "./Home.css";
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
import { UserDetails } from "../UserContext";
import { useEffect } from "react";
function Home() {
     var { userDetails } = UserDetails();
     useEffect(() => {
          if (userDetails) {
               console.log(userDetails);
          }
     });
     var date = new Date();
     var day = date.getDate();
     var month = date.getMonth() + 1;
     var year = date.getFullYear();
     var monthString;
     switch (month) {
          case 1:
               monthString = "Jan";
               break;
          case 2:
               monthString = "Feb";
               break;
          case 3:
               monthString = "March";
               break;
          case 4:
               monthString = "April";
               break;
          case 5:
               monthString = "May";
               break;
          case 6:
               monthString = "June";
               break;
          case 7:
               monthString = "July";
               break;
          case 8:
               monthString = "Aug";
               break;
          case 9:
               monthString = "Sept";
               break;
          case 10:
               monthString = "Oct";
               break;
          case 11:
               monthString = "Nov";
               break;
          case 12:
               monthString = "Dec";
               break;
          default:
               monthString = "";
               break;
     }

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

     return (
          <div className="Home">
               <div className="AppContainer">
                    <div className="hiUser">
                         <h1>Hi </h1>
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
          </div>
     );
}

export default Home;
