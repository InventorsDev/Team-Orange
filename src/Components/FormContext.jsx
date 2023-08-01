import { createContext, useState, useContext, useEffect } from "react";

const FormsContext = createContext();

export const FormDetails = () => {
     return useContext(FormsContext);
};

export const FormProvider = ({ children }) => {
     var [email, setEmail] = useState("");
     var [token, setToken] = useState("");

     useEffect(() => {
          var storedToken = localStorage.getItem("tranquil-user");
          if (storedToken) {
               setToken(JSON.parse(storedToken));
          }
     }, []);

     useEffect(() => {
          var storedMail = localStorage.getItem("tranquil-userMail");
          if (storedMail) {
               setEmail(JSON.parse(storedMail));
          }
     }, []);

     useEffect(() => {
          if (token) {
               localStorage.setItem("tranquil-user", JSON.stringify(token));
          }
     }, [token]);

     useEffect(() => {
          if (email) {
               localStorage.setItem("tranquil-userMail", JSON.stringify(email));
          }
     }, [email]);

     return (
          <FormsContext.Provider
               value={{
                    token,
                    setToken,
                    email,
                    setEmail,
               }}
          >
               {children}
          </FormsContext.Provider>
     );
};
