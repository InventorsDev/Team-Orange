import { useNavigate, useParams } from "react-router";
import { FormDetails } from "./FormContext";
import { useEffect } from "react";

function Redirector() {
     var { token } = useParams();
     var { setToken } = FormDetails();
     var navigate = useNavigate();

     useEffect(() => {
          setToken(token);
          setTimeout(() => {
               navigate("/home");
          }, 2000);
     });

     return <div>You will be redirected shortly. . .</div>;
}

export default Redirector;
