import "./Goals.css";
import Goal from "../Assets/Goals.svg";
import Spinner from "../../Globals/Spinner/Spinner";
import { useState, useEffect } from "react";
import { preloadImages } from "../../Globals/Globals";
import { PageDetails } from "../Tranquil/PageContext";
import Nav from "../Tranquil/Nav/Nav";

function Goals() {
    var [isImagesLoading, setImagesLoaded] = useState(false);
    var { setCurrentPage } = PageDetails();
    useEffect(() => {
        setCurrentPage("goals");
    });
    useEffect(() => {
        const imagesToPreload = [Goal];
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
        <div className="Goals">
            {isImagesLoading === false ? <Spinner /> : null}
            <Nav link="/tranquil/home" />
            <header>
                <h1>Goal Setting</h1>
            </header>
            <div className="Image">
                <img src={Goal} alt="" />
            </div>
            <div className="Paragraph">
                <p>
                    Setting goals is an important part of achieving success and
                    happiness in life. By setting clear, specific goals, you can
                    focus your energy and efforts on the things that matter most
                    to you, and make steady progress towards achieving your
                    dreams.
                </p>
                <button>Add a goal</button>
            </div>
        </div>
    );
}

export default Goals;
