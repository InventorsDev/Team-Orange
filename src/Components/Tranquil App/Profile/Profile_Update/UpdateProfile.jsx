import { useState, useEffect } from "react";
import { FormDetails } from "../../FormContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import profileUpdateSucess from "../Assets/profileUpdateSuccess.svg";
import calendar from "../Assets/calendar.svg";
import email from "../Assets/mail.svg";
import dropdown from "../Assets/dropDown.svg";
import { api } from "../../Globals";
// import { useNavigate } from "react-router";

function EditProfile() {
     var { token } = FormDetails();

     var [message, setMessage] = useState({
          string: "",
          status: true,
     });
     var date = new Date();
     var year = date.getFullYear();
     var month = (date.getMonth() + 1).toString().padStart(2, "0");
     var day = date.getDate().toString().padStart(2, "0");
     var [state, setState] = useState({
          fullName: "",
          userName: "",
          DOB: "",
          email: "",
          country: "",
          phone: "",
          gender: "",
     });
     var [retrievedValues, setRetrieved] = useState();
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
                         setRetrieved(data);
                         setState((prevState) => ({
                              ...prevState,
                              fullName: data.full_name,
                              userName: data.username,
                              DOB: data.date_of_birth,
                              email: data.email,
                              country: data.country,
                              countryId: data.country_id,
                              phone: data.phone_number,
                              gender: data.gender,
                         }));
                    });
          }
     }, [token]);

     var [country, setCountry] = useState("ng");
     var [isFormSubmitted, setSubmissionStatus] = useState(false);

     const handleSubmit = (e) => {
          e.preventDefault();
          setMessage({
               ...message,
               string: "Hang on a sec",
               status: true,
          });
          var myHeaders = new Headers();
          myHeaders.append("enctype", "multipart/related");
          myHeaders.append("Authorization", `Bearer ${token}`);

          var formdata = new FormData();
          formdata.append("full_name", state.fullName.trim());
          formdata.append("date_of_birth", state.DOB);
          formdata.append("gender", state.gender);
          formdata.append("phone_number", state.phone.trim());

          var requestOptions = {
               method: "POST",
               headers: myHeaders,
               body: formdata,
               redirect: "follow",
          };

          fetch(`${api}/user/update-profile`, requestOptions)
               .then((response) => response.json())
               .then((result) => {
                    console.log(result);
                    if (result.statusCode === 200) {
                         setSubmissionStatus(true);
                         setMessage({
                              ...message,
                              string: result.message,
                              status: true,
                         });
                    } else {
                         setMessage({
                              ...message,
                              string: result.message,
                              status: false,
                         });
                    }
               })
               .catch((error) => console.log("Error:", error));
     };

     const getIsformChanged = () => {
          if (retrievedValues) {
               return (
                    state.fullName !== retrievedValues.full_name ||
                    (state.gender !== retrievedValues.gender &&
                         state.gender !== "") ||
                    (state.phone !== retrievedValues.phone_number &&
                         state.phone !== "234") ||
                    (state.DOB !== retrievedValues.date_of_birth &&
                         state.DOB !== `${year}-${month}-${day}`)
               );
          } else {
               return false;
          }
     };

     var [isUserNotYetUpdated, setUpdatedState] = useState(true);
     return (
          <div className="EditProfile">
               <header>
                    <h1>Edit Profile</h1>
               </header>
               <form onSubmit={handleSubmit}>
                    <fieldset>
                         <input
                              type="text"
                              placeholder="Full Name"
                              value={state.fullName}
                              onChange={(e) => {
                                   e.preventDefault();
                                   setState({
                                        ...state,
                                        fullName: e.target.value.trimStart(),
                                   });
                              }}
                         />
                    </fieldset>

                    <fieldset>
                         <input
                              type="text"
                              placeholder="Username"
                              // value={state.userName}
                              disabled
                         />
                    </fieldset>

                    <fieldset>
                         <input
                              type="date"
                              value={state.DOB || `${year}-${month}-${day}`}
                              onChange={(e) => {
                                   setState({
                                        ...state,
                                        DOB: e.target.value,
                                   });
                              }}
                         />
                         <div className="sideImages">
                              <img src={calendar} alt="" />
                         </div>
                    </fieldset>

                    <fieldset>
                         <input
                              type="email"
                              placeholder=""
                              value={state.email}
                              disabled
                         />
                         <div className="sideImages">
                              <img src={email} alt="" />
                         </div>
                    </fieldset>

                    <fieldset>
                         <select
                              value={country}
                              onChange={(e) => {
                                   setCountry(e.target.value);
                              }}
                         >
                              <option value="bj">Benin</option>
                              <option value="bf">Burkina Faso</option>
                              <option value="cv">Cape Verde</option>
                              <option value="ci">Cote D'Ivoire</option>
                              <option value="gm">Gambia</option>
                              <option value="gh">Ghana</option>
                              <option value="gn">Guinea</option>
                              <option value="gw">Guinea-Bissau</option>
                              <option value="lr">Liberia</option>
                              <option value="ml">Mali</option>
                              <option value="mr">Mauritania</option>
                              <option value="ne">Niger</option>
                              <option value="ng">Nigeria</option>
                              <option value="sn">Senegal</option>
                              <option value="sl">Sierra Leone</option>
                              <option value="tg">Togo</option>
                         </select>
                         <div className="sideImages">
                              <img src={dropdown} alt="" />
                         </div>
                    </fieldset>

                    <fieldset>
                         <PhoneInput
                              country={country}
                              onlyCountries={[
                                   "bj",
                                   "bf",
                                   "cv",
                                   "ci",
                                   "gm",
                                   "gh",
                                   "gn",
                                   "gw",
                                   "lr",
                                   "ml",
                                   "mr",
                                   "ne",
                                   "ng",
                                   "sn",
                                   "sl",
                                   "tg",
                              ]}
                              containerClass="containerClass"
                              buttonStyle={{
                                   backgroundColor: "transparent",
                                   height: "50px",
                                   border: "none",
                                   marginLeft: "15px",
                              }}
                              inputStyle={{
                                   backgroundColor: "transparent",
                                   height: "50px",
                                   border: "none",
                                   marginLeft: "20px",
                              }}
                              value={state.phone || "234"}
                              onChange={(value) => {
                                   setState({
                                        ...state,
                                        phone: value.trimStart(),
                                   });
                              }}
                              disableDropdown
                              disableCountryGuess
                         />
                    </fieldset>

                    <fieldset>
                         <select
                              value={state.gender || ""}
                              onChange={(e) => {
                                   setState({
                                        ...state,
                                        gender: e.target.value,
                                   });
                              }}
                         >
                              <option value="" disabled>
                                   Select your gender . . .
                              </option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Rather not say">
                                   Rather not say
                              </option>
                         </select>
                         <div className="sideImages">
                              <img src={dropdown} alt="" />
                         </div>
                    </fieldset>
                    {isUserNotYetUpdated ? (
                         <button type="submit" disabled={!getIsformChanged()}>
                              Update
                         </button>
                    ) : null}
               </form>
               {message.string ? (
                    <p className={message.status ? "success" : "fail"}>
                         {message.string}
                    </p>
               ) : null}
               {isFormSubmitted ? (
                    <div className="profileUpdateSuccess">
                         <div>
                              <img src={profileUpdateSucess} alt="" />
                              <h1>Confirmed</h1>
                              <p>Profile has been updated successfully</p>
                              <button
                                   onClick={(e) => {
                                        e.preventDefault();
                                        setSubmissionStatus(false);
                                        setUpdatedState(false);
                                   }}
                              >
                                   OK
                              </button>
                         </div>
                    </div>
               ) : null}
          </div>
     );
}
export default EditProfile;
