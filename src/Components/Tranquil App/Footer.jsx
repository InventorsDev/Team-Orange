import "./Footer.css";
import { useNavigate } from "react-router";
import { FormDetails } from "../FormContext";

const Footer = (props) => {
     var navigate = useNavigate();
     var { currentPage, image } = props;
     var { token } = FormDetails();
     return (
          <footer>
               <div className="flexes">
                    <div
                         className="currentFlex"
                         onClick={() => {
                              navigate(`/home`);
                         }}
                    >
                         <img src={image.home} alt="" />
                         <p
                              style={{
                                   color: `${
                                        currentPage === "home"
                                             ? "#3bcd84"
                                             : "#000"
                                   }`,
                              }}
                         >
                              Home
                         </p>
                    </div>

                    <div
                         className="currentFlex"
                         onClick={() => {
                              navigate(`/resources`);
                         }}
                    >
                         <img src={image.resources} alt="" />
                         <p
                              style={{
                                   color: `${
                                        currentPage === "resources"
                                             ? "#3bcd84"
                                             : "#000"
                                   }`,
                              }}
                         >
                              Resources
                         </p>
                    </div>

                    <div
                         className="currentFlex"
                         onClick={() => {
                              navigate(`/goals`);
                         }}
                    >
                         <img src={image.goals} alt="" />
                         <p
                              style={{
                                   color: `${
                                        currentPage === "goals"
                                             ? "#3bcd84"
                                             : "#000"
                                   }`,
                              }}
                         >
                              Goals
                         </p>
                    </div>

                    <div
                         className="currentFlex"
                         onClick={() => {
                              navigate(`/community`);
                         }}
                    >
                         <img src={image.community} alt="" />
                         <p
                              style={{
                                   color: `${
                                        currentPage === "community"
                                             ? "#3bcd84"
                                             : "#000"
                                   }`,
                              }}
                         >
                              Community
                         </p>
                    </div>

                    <div
                         className="currentFlex"
                         onClick={() => {
                              navigate(`/profile`);
                         }}
                    >
                         <img src={image.profile} alt="" />
                         <p
                              style={{
                                   color: `${
                                        currentPage === "profile"
                                             ? "#3bcd84"
                                             : "#000"
                                   }`,
                              }}
                         >
                              Profile
                         </p>
                    </div>
               </div>
          </footer>
     );
};

export default Footer;
