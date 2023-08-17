import "./Articles.css";
import { useEffect, useState } from "react";
import Nav from "../../Tranquil/Nav/Nav";
import "../../Tranquil/Nav/Nav.css";
import search from "../../Assets/search.svg";
import { newsapi, newstoken } from "../../../Globals/Globals";
import Spinner from "../../../Globals/Spinner/Spinner";
import { FormDetails } from "../../../Globals/FormContext";
import navImage from "../../Assets/profile_img_default.svg";
import { api } from "../../../Globals/Globals";
import backward from "../../Assets/backwardsArrow.svg";

function Articles() {
    var [articles, setArticles] = useState([]);
    var [topic, setTopic] = useState(
        "stress, anxiety, depression, eating disorder"
    );
    var [ardx, setArdx] = useState();
    var [articlePage, setArticlePage] = useState(false);
    var { token } = FormDetails();
    var [userProfileImage, setUserProfileImage] = useState(navImage);
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const handleString = (elem) => {
        const [yearstr, monthstr, datestr] = elem?.split("-");

        const year = parseInt(yearstr, 10);
        const month = parseInt(monthstr, 10);
        const date = parseInt(datestr, 10);

        return `${months[month - 1]} ${date}, ${year}`;
    };

    const handleTrim = (string, maxLenght) => {
        if (string.length <= maxLenght) {
            return string;
        } else {
            return string.slice(0, maxLenght) + " . . .";
        }
    };

    const handleLongContent = (elem) => {
        const ellipsisIndex = elem.indexOf("…");

        if (ellipsisIndex !== -1) {
            const cont = elem.substring(0, ellipsisIndex);

            return `${cont}`;
        }
    };
    useEffect(() => {
        var requests = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${newstoken}`,
            },
        };
        fetch(
            `${newsapi}/everything?q=${topic} mental health&language=en`,
            requests
        )
            .then((response) => response.json())
            .then((result) => {
                setArticles(result.articles);
            })
            .catch((err) => console.log(err));
    }, [topic]);

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

    var [inputText, setInput] = useState("");
    var [sbut, setSbut] = useState(false);
    return (
        <div className="Articles">
            {articlePage === false ? (
                <>
                    <Nav link="/tranquil/resources" />
                    {!sbut ? (
                        <header>
                            <h1>Articles</h1>
                            <div
                                onClick={() => {
                                    setSbut(true);
                                }}
                            >
                                <img src={search} alt="" />
                            </div>
                        </header>
                    ) : (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (inputText !== "") {
                                    setSbut(false);
                                    setTopic(inputText);
                                    setInput("");
                                }
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Search. . ."
                                value={inputText}
                                onChange={(e) => {
                                    setInput(e.target.value.trimStart());
                                }}
                            />
                            <button type="submit" disabled={inputText === ""}>
                                <img src={search} alt="" />
                            </button>
                        </form>
                    )}

                    <div className="artcont">
                        {articles ? (
                            articles.map((elem, index) => (
                                <div
                                    key={index}
                                    className="articleBox"
                                    onClick={() => {
                                        setArdx(index);
                                        setTimeout(() => {
                                            setArticlePage(true);
                                        }, 0);
                                    }}
                                >
                                    <div>
                                        <img
                                            src={elem?.urlToImage}
                                            alt=""
                                            loading="lazy"
                                        />
                                    </div>
                                    <div>
                                        <p>
                                            {elem.publishedAt &&
                                                handleString(
                                                    elem.publishedAt.slice(
                                                        0,
                                                        10
                                                    )
                                                )}
                                        </p>
                                        <p>
                                            {elem.title &&
                                                handleTrim(elem.title, 75)}
                                        </p>
                                        <p>
                                            {elem.author
                                                ? handleTrim(elem.author, 25)
                                                : "Anonymous"}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Spinner />
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className="Articles">
                        <nav className="nav">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setArticlePage(false);
                                }}
                            >
                                <img src={backward} alt="" />
                            </button>
                            <div>
                                <img src={userProfileImage} alt="" />
                            </div>
                        </nav>

                        <div className="artcont">
                            <div className="specificArt">
                                <div className="imgCont">
                                    <img
                                        src={
                                            articles[ardx]?.urlToImage
                                                ? articles[ardx].urlToImage
                                                : null
                                        }
                                        alt=""
                                    />
                                </div>
                                <div className="headings">
                                    <h1>
                                        {articles[ardx]?.title
                                            ? articles[ardx].title
                                            : null}{" "}
                                    </h1>
                                    <p>
                                        {articles[ardx]?.publishedAt
                                            ? handleString(
                                                  articles[
                                                      ardx
                                                  ].publishedAt.slice(0, 10)
                                              )
                                            : null}
                                    </p>
                                    <p>
                                        {articles[ardx]?.author
                                            ? articles[ardx].author
                                            : "Anonymous"}
                                    </p>
                                </div>
                                <div className="content">
                                    <p>
                                        {articles[ardx]?.content
                                            ? handleLongContent(
                                                  articles[ardx].content
                                              )
                                            : null}
                                        . . .
                                        <span>
                                            <a
                                                href={
                                                    articles[ardx]?.url
                                                        ? articles[ardx].url
                                                        : null
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Read more
                                            </a>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Articles;
