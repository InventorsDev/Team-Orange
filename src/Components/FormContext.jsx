import { createContext, useState, useContext } from "react";

const FormsContext = createContext();

export const FormDetails = () => {
     return useContext(FormsContext);
};

export const FormProvider = ({ children }) => {
     var [email, setEmail] = useState("");
     var [token, setToken] = useState("");

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
