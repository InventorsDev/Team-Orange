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
               navigate("/user");
          }, 2000);
     }, [tokenFromBackEnd, setToken, navigate]);

     return <p>You will be redirected shortly . . .</p>;
}

export default Redirector;
