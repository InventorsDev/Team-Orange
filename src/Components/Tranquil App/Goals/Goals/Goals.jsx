import "./Goals.css";
import Goal from "../../Assets/Goals.svg";
import Spinner from "../../../Globals/Spinner/Spinner";
import { useState, useEffect } from "react";
import { preloadImages, api } from "../../../Globals/Globals";
import { PageDetails } from "../../Tranquil/PageContext";
import { FormDetails } from "../../../Globals/FormContext";
import Nav from "../../Tranquil/Nav/Nav";
import { Route, Routes, useNavigate } from "react-router";
import SetGoals from "../SetGoals/Setgoals";
import ViewGoals from "../VIewGoals/Viewgoals";
import { Link } from "react-router-dom";

function Initial() {
    var { token } = FormDetails();
    var [isImagesLoading, setImagesLoaded] = useState(false);
    var { setCurrentPage } = PageDetails();
    var navigate = useNavigate();
    var [showView, setShowView] = useState(false);
    var [showSpinner, setShowSpinner] = useState(true);

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

    useEffect(() => {
        var requests = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch(`${api}/goal-settings`, requests)
            .then((response) => response.json())
            .then((result) => {
                if (result && result.statusCode === 200) {
                    console.log(result.data.data);
                    if (result.data.data.length > 0) {
                        setShowView(true);
                        if (isImagesLoading) {
                            setShowSpinner(false);
                        }
                    } else {
                        setShowView(false);
                        if (isImagesLoading) {
                            setShowSpinner(false);
                        }
                    }
                }
            });
    }, [token, isImagesLoading]);

    return (
        <div className="Goals">
            {showSpinner ? <Spinner /> : null}
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
                {showView ? (
                    <Link
                        className="viewSetGoals"
                        to="/tranquil/goals/viewGoals"
                    >
                        View Set Goals
                    </Link>
                ) : null}
                <button
                    onClick={() => {
                        navigate("/tranquil/goals/newGoal");
                    }}
                >
                    Add a goal
                </button>
            </div>
        </div>
    );
}

function Goals() {
    return (
        <Routes>
            <Route path="" element={<Initial />} />
            <Route path="newGoal" element={<SetGoals />} />
            <Route path="viewGoals" element={<ViewGoals />} />
        </Routes>
    );
}

export default Goals;
