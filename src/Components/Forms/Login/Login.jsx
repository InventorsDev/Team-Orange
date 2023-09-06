import "./Login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { preloadImages, Oauth } from "../../Globals/Globals";
import Spinner from "../../Globals/Spinner/Spinner";
import brain from "../../../Assets/brain-icon.svg";
import google from "../../../Assets/google.svg";
import apple from "../../../Assets/apple.svg";
import brand from "../../../Assets/brand_gold.svg";
import Typewriter from "typewriter-effect";

function LogIn() {
    var navigate = useNavigate();
    var [click, setClick] = useState(false);
    var [isImagesLoading, setImagesLoaded] = useState(false);

    const handleNavigation = (e) => {
        e.preventDefault();
        navigate("/signIn");
    };

    const handleGoogle = () => {
        if (Oauth) {
            window.location.href = Oauth;
        }
    };

    const appleClicked = () => {
        setClick(true);
        const clickTimer = setTimeout(() => {
            setClick(false);
        }, 3000);
        return () => {
            clearTimeout(clickTimer);
        };
    };

    useEffect(() => {
        const imagesToPreload = [brain, google, apple, brand];
        preloadImages(imagesToPreload)
            .then(() => {
                const imageTimer = setTimeout(() => {
                    setImagesLoaded(true);
                }, 1000);

                return () => {
                    clearTimeout(imageTimer);
                };
            })
            .catch(() => {
                console.log("Error Loading Images");
            });
    }, []);

    return (
        <div className="Login">
            {isImagesLoading === false ? <Spinner /> : null}
            <img src={brain} alt="" className="brain" />
            <div className="head">
                <img src={brand} alt="" />
                <h1>Welcome !</h1>
                <div>
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter
                                .changeDelay(20)
                                .typeString("Have a Better Mindful Experience")
                                .start();
                        }}
                    />
                </div>
            </div>

            <div className="loginOptions">
                <button className="auths google" onClick={handleGoogle}>
                    <div className="authImageDiv">
                        <img src={google} alt="" />
                    </div>
                    <div className="textDiv">
                        <p>Continue with Google</p>
                    </div>
                </button>

                <button className="auths apple" onClick={appleClicked}>
                    <div className="authImageDiv">
                        <img src={apple} alt="" />
                    </div>
                    <div className="textDiv">
                        <p>Continue with Apple</p>
                    </div>
                </button>

                {click === true && (
                    <p className="appleUnavailable">
                        This feature is currently unavailable !
                    </p>
                )}

                <p className="or">OR</p>
                <button className="auths tranquil" onClick={handleNavigation}>
                    Sign in
                </button>
            </div>

            <div className="newAccount">
                <p>
                    Don't have an account ?{" "}
                    <span
                        onClick={() => {
                            navigate("/signUp");
                        }}
                        className="span"
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
}

export default LogIn;
