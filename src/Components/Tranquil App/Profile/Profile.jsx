import "./Profile.css";
import editProfile from "../Assets/editProfile.svg";
import notifications from "../Assets/notification.svg";
import language from "../Assets/language.svg";
import darkMode from "../Assets/darkMode.svg";
import inviteFriends from "../Assets/inviteFriends.svg";
import logOut from "../Assets/logOut.svg";
import arrowLeft from "../Assets/arrowLeft.svg";
import darkModeToggle from "../Assets/darkModeToggle.svg";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { FormDetails } from "../../FormContext";
import Spinner from "../../Spinner";
import { preloadImages, api } from "../../Globals";
function Profile() {
     var navigate = useNavigate();
     const handleEditProfile = () => {
          navigate("/profile/editProfile");
     };
     var [isImagesLoading, setImagesLoaded] = useState(false);
     useEffect(() => {
          const imagesToPreload = [
               editProfile,
               notifications,
               language,
               darkMode,
               inviteFriends,
               logOut,
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

     var { token } = FormDetails();
     var [state, setState] = useState({
          fullName: "",
     });
     useEffect(() => {
          if (token) {
               var requests = {
                    method: "GET",
                    headers: {
                         Authorization: `Bearer ${token}`,
                    },
                    redirect: "follow",
               };
               fetch(`${api}/user`, requests)
                    .then((response) => response.json())
                    .then((result) => {
                         var data = result.data;
                         setState((prevState) => ({
                              ...prevState,
                              fullName: data.full_name,
                         }));
                    });
          }
     }, [token]);

     var [isUserLogggingOut, setLogstatus] = useState(false);
     return (
          <div className="Profile">
               {isImagesLoading === false ? <Spinner /> : null}
               <header>
                    <h1>Profile</h1>

                    <div></div>

                    <p>{state.fullName}</p>
               </header>
               <div className="profileOptions">
                    <div onClick={handleEditProfile}>
                         <img src={editProfile} alt="" />
                         <p>Edit Profile</p>
                         <img src={arrowLeft} alt="" />
                    </div>
                    <div>
                         <img src={notifications} alt="" />
                         <p>Notifications</p>
                         <img src={arrowLeft} alt="" />
                    </div>
                    <div>
                         <img src={language} alt="" />
                         <p>Language</p>
                         <img src={arrowLeft} alt="" />
                    </div>
                    <div>
                         <img src={darkMode} alt="" />
                         <p>Dark Mode</p>
                         <img src={darkModeToggle} alt="" />
                    </div>
                    <div>
                         <img src={inviteFriends} alt="" />
                         <p>Invite Friends</p>
                         <img src={arrowLeft} alt="" />
                    </div>

                    <div
                         className="logOut"
                         onClick={() => {
                              setLogstatus(true);
                         }}
                    >
                         <img src={logOut} alt="" />
                         <p>Logout</p>
                    </div>
               </div>

               {isUserLogggingOut === true ? (
                    <div className="UserExit">
                         <div className="container">
                              <div className="logout">
                                   <img src={logOut} alt="" />
                                   <p>Logout</p>
                              </div>
                              <p className="par">
                                   Are you sure you want to Logout
                              </p>
                              <div className="buttons">
                                   <button
                                        onClick={(e) => {
                                             e.preventDefault();
                                             setLogstatus(false);
                                        }}
                                   >
                                        Cancel
                                   </button>
                                   <button
                                        onClick={(e) => {
                                             e.preventDefault();
                                             navigate("/login");
                                        }}
                                   >
                                        Yes, Logout
                                   </button>
                              </div>
                         </div>
                    </div>
               ) : null}
          </div>
     );
}

export default Profile;
