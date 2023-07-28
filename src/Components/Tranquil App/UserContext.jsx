import { useContext, createContext, useState, useEffect } from "react";
import { FormDetails } from "../FormContext";

var UserContext = createContext();

export function UserDetails() {
     return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
     var [userDetails, setUserDetails] = useState({});
     var [component, setComponent] = useState("home");

     var { token } = FormDetails();
     useEffect(() => {
          if (token) {
               var request = {
                    method: "GET",
                    headers: {
                         Authorization: `Bearer ${token}`,
                    },
                    redirect: "follow",
               };

               fetch("https://tranquil.skrind.com/api/v1/user", request)
                    .then((response) => response.json())
                    .then((result) => {
                         console.log(result);
                         if (result) {
                              setUserDetails(result.data);
                         }
                    })
                    .catch((error) => console.log("error", error));
          }
     }, [token]);

     return (
          <UserContext.Provider
               value={{ userDetails, setUserDetails, component, setComponent }}
          >
               {children}
          </UserContext.Provider>
     );
};
