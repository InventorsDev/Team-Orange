import "./Profile.css";
import profile from "../Assets/profileGreen.svg";
function Profile() {
     return (
          <div className="Profile">
               <div className="profileImage">
                    <h1>Profile</h1>

                    <div className="greener">
                         <div>
                              <img src={profile} alt="" />
                         </div>
                         <p></p>
                    </div>
               </div>
               <div className="profileEdits">
                    <div>
                         <p>Edit Profile</p>
                    </div>
                    <div>
                         <p>Notifications</p>
                    </div>
                    <div>
                         <p>Language</p>
                    </div>
                    <div>
                         <p>Dark Mode</p>
                    </div>
                    <div>
                         <p>Invite Friends</p>
                    </div>
                    <div>LogOut</div>
               </div>
          </div>
     );
}

export default Profile;
