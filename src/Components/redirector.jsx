import { useNavigate, useParams } from "react-router";
import { FormDetails } from "./FormContext";
import { useEffect } from "react";

function Redirector() {
     var { tokenFromBackEnd } = useParams();
     var { setToken } = FormDetails();
     var navigate = useNavigate();
     useEffect(() => {
          setToken(tokenFromBackEnd);
          setTimeout(() => {
               navigate("/home");
          }, 2000);
     });

     return <div>You will be redirected shortly. . .</div>;
}

export default Redirector;
