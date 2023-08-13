import "./Nav.css";
import backward from "../../Assets/backwardsArrow.svg";
import { useEffect, useState } from "react";
import { FormDetails } from "../../../Globals/FormContext";
import { useNavigate } from "react-router";

function Nav(props) {
    var { link } = props;
    var { token } = FormDetails();
    var navigate = useNavigate();

    var [userProfileImage, setUserProfileImage] = useState(backward);

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
                    // if (result.data.username) {
                    //     setUsername(result.data.username);
                    // }
                });
        }
    }, [token]);

    return (
        <nav>
            <div
                onClick={() => {
                    navigate(`${link}`);
                }}
            >
                <img src={backward} alt="" />
            </div>
            <div>
                <img src={userProfileImage} alt="" />
            </div>
        </nav>
    );
}
