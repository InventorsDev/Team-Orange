import { useEffect, useState } from "react";
import "./Daily.css";
import { api } from "../../../Globals";
import arrowBack from "../../Assets/back.svg";

function DailyQuestions(props) {
    var { test } = props;
    var [asmt, setAsmt] = useState({});
    // var [current, setCurrent] = useState(0);
    // var [clickedRadioIndex, setRadioInputClicked] = useState();
    // var [state, setState] = useState([]);

    useEffect(() => {
        const requests = {
            method: "GET",
            redirect: "follow",
        };

        fetch(`${api}/daily-assessment-questions`, requests)
            .then((response) => response.json())
            .then((result) => {
                if (result && result.data.daily_assessment_conditions) {
                    const assessmentData =
                        result.data.daily_assessment_conditions[test];

                    setAsmt({ ...asmt, assessmentData });
                    // setState(() =>
                    //     questionsData.questions.map((element) => ({
                    //         questionValue: element.question_value,
                    //         optionWeight: null,
                    //     }))
                    // );
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [test]);

    // const handlePickedOption = (value) => {
    //     setState((prevState) => {
    //         const newState = [...prevState];
    //         newState[current] = {
    //             ...newState[current],
    //             optionWeight: value,
    //         };
    //         return newState;
    //     });
    // };

    // useEffect(() => {
    //     console.log(state);
    // }, [state]);

    // const getIsButtonClicked = () => {
    //     return state[current]?.optionWeight !== null;
    // };

    // var [lastQuestion, setLastQuestion] = useState(false);
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    // };
    return (
        <>
            {asmt ? (
                <>
                    <div className="DailyTests">
                        <nav>
                            {/* {current > 0 ? (
                                <div
                                    onClick={() => {
                                        setCurrent((prev) => prev - 1);
                                    }}
                                >
                                    <img
                                        src={arrowBack}
                                        alt=""
                                    />
                                </div>
                            ) : null} */}

                            {/* <p>{1 of ${
                                asmt.questions.length
                            }`}</p> */}
                        </nav>
                        <header>
                            <p>{asmt.name} Test</p>
                        </header>
                        {asmt ? (
                            <>
                                <div className="Questions">
                                    <h3>{asmt.name}</h3>
                                    {asmt?.questions.map((elt, index) => {
                                        <p>{elt.question}</p>;
                                    })}
                                </div>
                            </>
                        ) : null}
                    </div>
                </>
            ) : null}
        </>
    );
}

export default DailyQuestions;

{
    /* {assessment.questions[current].options.map(
                                    (element, index) => (
                                        <fieldset
                                            key={index}
                                            className={
                                                index === clickedRadioIndex
                                                    ? "picked"
                                                    : null
                                            }
                                        >
                                            <div>
                                                <input
                                                    value={
                                                        element.option_weight
                                                    }
                                                    type="radio"
                                                    name={`question_${current}`}
                                                    onChange={() => {
                                                        handlePickedOption(
                                                            element.option_weight
                                                        );
                                                        setRadioInputClicked(
                                                            index
                                                        );
                                                    }}
                                                />
                                                <p>{element.option_value}</p>
                                            </div>
                                        </fieldset>
                                    )
                                )}

                                {lastQuestion ? (
                                    <button type="submit">Submit</button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            if (
                                                current >= 0 &&
                                                current <
                                                    assessment.questions
                                                        .length -
                                                        1
                                            ) {
                                                setCurrent(current + 1);
                                                setRadioInputClicked(-4);
                                            } else if (
                                                current ===
                                                assessment.questions.length - 2
                                            ) {
                                                setLastQuestion(true);
                                            }
                                        }}
                                        disabled={!getIsButtonClicked()}
                                    >
                                        Next
                                    </button>
                                )} */
}
