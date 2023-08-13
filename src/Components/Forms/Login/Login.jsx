import "./Login.css";
import brain from "../../../Assets/brain-icon.svg";
import google from "../../../Assets/google.svg";
import apple from "../../../Assets/apple.svg";
import brand from "../../../Assets/brand_gold.svg";
import Typewriter from "typewriter-effect";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { preloadImages } from "../../Globals/Globals";
import Spinner from "../../Globals/Spinner/Spinner";

function LogIn() {
    var navigate = useNavigate();
    var [click, setClick] = useState(false);
    var [isImagesLoading, setImagesLoaded] = useState(false);

    const handleNavigation = (e) => {
        e.preventDefault();
        navigate("/signIn");
    };

    const handleGoogle = () => {
        window.location.href =
            "https://accounts.google.com/o/oauth2/auth?client_id=834746144707-caq2kavpv92okmv38beutlabr023qg7p.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Ftranquil.skrind.com%2Fapi%2Fv1%2Fauth%2Fgoogle%2Fcallback&scope=openid+profile+email&response_type=code";
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
            .catch((error) => {
                console.log("Error Loading Images", error);
            });
    }, []);
    return (
        //The return statement where the html lives
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
                                .start(); //So this is how i implement the typewriter effect
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

export default LogIn; //I export the entire login function using this syntax, then i can access it anywhere else simply by saying import Login from the loaction it is in, check app.js for this
