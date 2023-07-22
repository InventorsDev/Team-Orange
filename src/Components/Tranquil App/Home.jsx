import "./Home.css";
import resources from "../../Assets/resources.svg";
import goalSetting from "../../Assets/goalSetting.svg";
import assessment from "../../Assets/assessment.svg";
import journal from "../../Assets/journal.svg";
function Home() {
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
     }

     return (
          <div className="Home">
               <div className="AppContainer">
                    <div className="hiUser">
                         <h1>Hi, Daniel!</h1>
                         <p>
                              {monthString} {day}, {year}
                         </p>
                    </div>

                    <div className="quickAccess">
                         <h2>Quick Access</h2>
                         <div className="mrFlex">
                              <div className="resources">
                                   <div>
                                        <a>
                                             <img alt="" src={resources} />
                                             <span>Resources</span>
                                        </a>
                                   </div>
                              </div>

                              <div className="goalSetting">
                                   <div>
                                        <a>
                                             <img alt="" src={goalSetting} />
                                             <span>Goal Setting</span>
                                        </a>
                                   </div>
                              </div>

                              <div className="assessment">
                                   <div>
                                        <a>
                                             <img alt="" src={assessment} />
                                             <span>Assessments</span>
                                        </a>
                                   </div>
                              </div>

                              <div className="journal">
                                   <div>
                                        <a>
                                             <img alt="" src={journal} />
                                             <span>Journal</span>
                                        </a>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default Home;
