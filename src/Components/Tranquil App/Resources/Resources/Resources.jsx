import "./Resources.css";
import backwards from "../../Assets/backwardsArrow.svg";
import Article from "../../Assets/Articles.svg";
import Videos from "../../Assets/Videos.svg";
import Materials from "../../Assets/Materials.svg";
import Listen from "../../Assets/Listen.svg";
import Spinner from "../../../Globals/Spinner/Spinner";
import { preloadImages } from "../../../Globals/Globals";
import { useEffect, useState } from "react";
import { PageDetails } from "../../Tranquil/PageContext";
import Nav from "../../Tranquil/Nav/Nav";
import { Route, Routes, useNavigate } from "react-router";
import Articles from "../Articles/Articles";

function Initial() {
    var [isImagesLoading, setImagesLoaded] = useState(false);
    var { setCurrentPage } = PageDetails();
    var navigate = useNavigate();
    useEffect(() => {
        setCurrentPage("resources");
    });
    useEffect(() => {
        const imagesToPreload = [backwards, Article, Videos, Materials, Listen];
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
        <div className="ResourcesPage">
            {isImagesLoading === false ? <Spinner /> : null}

            <Nav link="/tranquil/home" />
            <header>
                <h1>Resources</h1>
            </header>
            <div className="sections">
                <div
                    className="group"
                    onClick={() => {
                        navigate("articles");
                    }}
                >
                    <div>
                        <img src={Article} alt="" />
                    </div>
                    <p>Articles</p>
                </div>

                <div className="group">
                    <div>
                        <img src={Videos} alt="" />
                    </div>
                    <p>Videos</p>
                </div>

                <div className="group">
                    <div>
                        <img src={Materials} alt="" />
                    </div>
                    <p>Materials</p>
                </div>

                <div className="group">
                    <div>
                        <img src={Listen} alt="" />
                    </div>
                    <p>Listen</p>
                </div>
            </div>
        </div>
    );
}

function Resources() {
    return (
        <Routes>
            <Route path="" element={<Initial />} />
            <Route path="articles" element={<Articles />} />
        </Routes>
    );
}
export default Resources;
