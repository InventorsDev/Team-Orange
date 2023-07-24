import "./footer.css";
import { useNavigate } from "react-router";
import homeBlack from "./Assets/homeBlack.svg";
import homeGreen from "./Assets/homeGreen.svg";
import resourcesBlack from "./Assets/resourcesBlack.svg";
import resourcesGreen from "./Assets/resourcesGreen.svg";
import goalsBlack from "./Assets/goalsBlack.svg";
import goalsGreen from "./Assets/goalsGreen.svg";
import communityBlack from "./Assets/communityBlack.svg";
import communityGreen from "./Assets/communityGreen.svg";
import profileBlack from "./Assets/profileBlack.svg";
import profileGreen from "./Assets/profileGreen.svg";

function Footer(props) {
     var navigate = useNavigate();
     var component = props.component;
     var token = props.token;
     return (
          <footer>
               <div className="flexes">
                    <div
                         className="currentFlex"
                         onClick={() => {
                              navigate(`/home/${token}`);
                         }}
                    >
                         <img
                              src={component === "home" ? homeGreen : homeBlack}
                              alt=""
                         />
                         <p
                              style={{
                                   color: `${
                                        component === "home"
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
                              navigate("/resources");
                         }}
                    >
                         <img
                              src={
                                   component === "resources"
                                        ? resourcesGreen
                                        : resourcesBlack
                              }
                              alt=""
                         />
                         <p
                              style={{
                                   color: `${
                                        component === "resources"
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
                              navigate("/goals");
                         }}
                    >
                         <img
                              src={
                                   component === "goals"
                                        ? goalsGreen
                                        : goalsBlack
                              }
                              alt=""
                         />
                         <p
                              style={{
                                   color: `${
                                        component === "goals"
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
                              navigate("/community");
                         }}
                    >
                         <img
                              src={
                                   component === "community"
                                        ? communityGreen
                                        : communityBlack
                              }
                              alt=""
                         />
                         <p
                              style={{
                                   color: `${
                                        component === "community"
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
                              navigate("/profile");
                         }}
                    >
                         <img
                              src={
                                   component === "profile"
                                        ? profileGreen
                                        : profileBlack
                              }
                              alt=""
                         />
                         <p
                              style={{
                                   color: `${
                                        component === "profile"
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
}

export default Footer;
