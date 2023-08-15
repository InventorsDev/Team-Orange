import "./Nav.css";
import backward from "../../Assets/backwardsArrow.svg";
import { useEffect, useState } from "react";
import { FormDetails } from "../../../Globals/FormContext";
import { useNavigate } from "react-router";
import { api } from "../../../Globals/Globals";

function Nav(props) {
    var { link } = props;
    var { token } = FormDetails();
    var navigate = useNavigate();

    var [userProfileImage, setUserProfileImage] = useState(null);

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
                    if (result && result.data.profile_image_url) {
                        setUserProfileImage(result.data.profile_image_url);
                    }
                });
        }
    }, [token]);

    return (
        <nav className="nav">
            <button
                onClick={(e) => {
                    e.preventDefault();
                    if (link) {
                        navigate(`${link}`);
                    }
                }}
            >
                <img src={backward} alt="" />
            </button>
            <div>
                <img src={userProfileImage} alt="" />
            </div>
        </nav>
    );
}

export default Nav;
