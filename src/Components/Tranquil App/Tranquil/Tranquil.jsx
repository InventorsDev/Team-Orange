import { useEffect, useState } from "react";
import "./Tranquil.css";
import Home from "../Home/Home/Home.jsx";
import Resources from "../Resources/Resources/Resources.jsx";
import Goals from "../Goals/Goals.jsx";
import Community from "../Community/Community.jsx";
import homeGreen from "../Assets/homeGreen.svg";
import homeBlack from "../Assets/homeBlack.svg";
import resourcesGreen from "../Assets/resourcesGreen.svg";
import resourcesBlack from "../Assets/resourcesBlack.svg";
import goalsGreen from "../Assets/goalsGreen.svg";
import goalsBlack from "../Assets/goalsBlack.svg";
import communityGreen from "../Assets/communityGreen.svg";
import communityBlack from "../Assets/communityBlack.svg";
import profileGreen from "../Assets/profileGreen.svg";
import profileBlack from "../Assets/profileBlack.svg";
import { Routes, Route, useNavigate, Navigate } from "react-router";
import { PageDetails } from "./PageContext";

function Tranquil() {
    var { currentPage, setCurrentPage } = PageDetails();
    var navigate = useNavigate();
    var images = {
        home: currentPage === "home" ? homeGreen : homeBlack,
        resources:
            currentPage === "resources" ? resourcesGreen : resourcesBlack,
        goals: currentPage === "goals" ? goalsGreen : goalsBlack,
        community:
            currentPage === "community" ? communityGreen : communityBlack,
        profile: currentPage === "profile" ? profileGreen : profileBlack,
    };

    const Footer = (props) => {
        var { image } = props;
        return (
            <footer>
                <div className="routes">
                    <div
                        onClick={() => {
                            if (currentPage !== "home") {
                                setCurrentPage("home");
                                navigate("/tranquil/home");
                            }
                        }}
                    >
                        <img src={image.home} alt="" />
                        <p
                            style={{
                                color: `${
                                    currentPage === "home" ? "#3bcd84" : "#000"
                                }`,
                            }}
                        >
                            Home
                        </p>
                    </div>

                    <div
                        onClick={() => {
                            if (currentPage !== "resources") {
                                setCurrentPage("resources");
                                navigate("/tranquil/resources");
                            }
                        }}
                    >
                        <img src={image.resources} alt="" />
                        <p
                            style={{
                                color: `${
                                    currentPage === "resources"
                                        ? "#3bcd84"
                                        : "#000"
                                }`,
                            }}
                        >
                            Resources
                        </p>
                    </div>

                    <div
                        onClick={() => {
                            if (currentPage !== "goals") {
                                setCurrentPage("goals");
                                navigate("/tranquil/goals");
                            }
                        }}
                    >
                        <img src={image.goals} alt="" />
                        <p
                            style={{
                                color: `${
                                    currentPage === "goals" ? "#3bcd84" : "#000"
                                }`,
                            }}
                        >
                            Goals
                        </p>
                    </div>

                    <div
                        onClick={() => {
                            if (currentPage !== "community") {
                                setCurrentPage("community");
                                navigate("/tranquil/community");
                            }
                        }}
                    >
                        <img src={image.community} alt="" />
                        <p
                            style={{
                                color: `${
                                    currentPage === "community"
                                        ? "#3bcd84"
                                        : "#000"
                                }`,
                            }}
                        >
                            Community
                        </p>
                    </div>

                    <div
                        onClick={() => {
                            navigate("profile");
                        }}
                    >
                        <img src={image.profile} alt="" />
                        <p
                            style={{
                                color: `${
                                    currentPage === "profile"
                                        ? "#3bcd84"
                                        : "#000"
                                }`,
                            }}
                        >
                            Profile
                        </p>
                    </div>
                </div>
            </footer>
        );
    };

    const [scrollPosition, setScrollPosition] = useState(0);
    const [footerVisible, setFooterVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY;

            if (currentPosition > scrollPosition && currentPosition > 20) {
                setFooterVisible(false);
            } else {
                setFooterVisible(true);
            }

            setScrollPosition(currentPosition);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrollPosition]);

    return (
        <div className="Tranquil">
            <Routes>
                <Route path="" element={<Navigate to="home" />} />
                <Route path="home/*" element={<Home />} />
                <Route path="resources" element={<Resources />} />
                <Route path="goals" element={<Goals />} />
                <Route path="community" element={<Community />} />
            </Routes>

            {footerVisible && <Footer image={images} />}
        </div>
    );
}

export default Tranquil;
