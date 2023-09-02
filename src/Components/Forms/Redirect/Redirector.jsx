import { useNavigate, useParams } from "react-router";
import { FormDetails } from "../../Globals/FormContext";
import { useEffect } from "react";
import { api } from "../../Globals/Globals";

function Redirector() {
  var { token } = useParams();
  var { setToken, setEmail } = FormDetails();
  var navigate = useNavigate();

  useEffect(() => {
    setToken(token);
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
        setEmail(result.data.email);
        if (result.data.username) {
          navigate("/tranquil");
        } else if (!result.data.username) {
          navigate("/newUser");
        }
      });
  });

  return <div>You will be redirected shortly. . .</div>;
}

export default Redirector;
