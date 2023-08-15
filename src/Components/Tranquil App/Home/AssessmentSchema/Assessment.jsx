import { useEffect, useRef, useState } from "react";
import "./Assessment.css";
import { api } from "../../../Globals/Globals";
import arrowBack from "../../Assets/back.svg";
import { useParams } from "react-router";
import Spinner from "../../../Globals/Spinner/Spinner";
import Nav from "../../Tranquil/Nav/Nav";

function Assessments() {
    var { test, specifics } = useParams();
    var [asmt, setAsmt] = useState();
    var [state, setState] = useState([]);

    var [endPoint, setEndPoint] = useState();

    useEffect(() => {
        if (test === "daily") {
            setEndPoint("daily-assessment-questions");
        } else {
            setEndPoint("assessment-questions");
        }
    }, [test]);

    var [index, setIndex] = useState();

    useEffect(() => {
        switch (specifics) {
            case "Anxiety":
                setIndex(0);
                break;

            case "Depression":
                setIndex(1);
                break;

            case "Stress":
                setIndex(2);
                break;

            case "Eating Disorder":
                setIndex(3);
                break;
            default:
                setIndex(null);
        }
    }, [specifics]);

    useEffect(() => {
        const requests = {
            method: "GET",
            redirect: "follow",
        };

        if (endPoint && endPoint === "daily-assessment-questions") {
            fetch(`${api}/${endPoint}`, requests)
                .then((response) => response.json())
                .then((result) => {
                    if (result && result.data.daily_assessment_conditions) {
                        const asmtData =
                            result.data.daily_assessment_conditions[index];

                        setAsmt(asmtData);
                        setState(() =>
                            asmtData.questions.map((elmnt) => ({
                                questionValue: elmnt.question_value,
                                optionWeight: 0,
                            }))
                        );
                    }
                });
        } else if (endPoint && endPoint === "assessment-questions") {
            fetch(`${api}/${endPoint}`, requests)
                .then((response) => response.json())
                .then((result) => {
                    if (result && result.data.assessment_conditions) {
                        const asmtData =
                            result.data.assessment_conditions[index];

                        setTimeout(() => {
                            setAsmt(asmtData);
                        }, 500);
                        setState(() =>
                            asmtData.questions.map((elmnt) => ({
                                questionValue: elmnt.question_value,
                                optionWeight: 0,
                            }))
                        );
                    }
                });
        }
    }, [endPoint, index]);

    const handlePickedOption = (val, index) => {
        setState((prevState) => {
            const newState = [...prevState];
            newState[index] = {
                ...newState[index],
                optionWeight: Number(val),
            };
            return newState;
        });
    };

    var formRef = useRef();

    const getISBtnDisabled = (index) => {
        return (
            state[index].optionWeight !== null && state[index].optionWeight > 0
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const total = state.reduce(
            (accumulator, currentObject) => {
                return {
                    optionWeight:
                        accumulator.optionWeight + currentObject.optionWeight,
                    questionValue:
                        accumulator.questionValue + currentObject.questionValue,
                };
            },
            { optionWeight: 0, questionValue: 0 }
        );

        const percent = (total.optionWeight / total.questionValue) * 100;
        console.log(`${percent}%`);
    };

    return (
        <div className="Tests">
            <form className="testForm" ref={formRef} onSubmit={handleSubmit}>
                {asmt ? (
                    <div className="testFormPgs">
                        {asmt.questions.map((elmnt, pgIdx) => (
                            <div key={pgIdx} className="qst">
                                <Nav link="/tranquil/home" />

                                <nav className="nave">
                                    <div
                                        onClick={() => {
                                            formRef.current.scrollLeft -=
                                                formRef.current.clientWidth;
                                        }}
                                    >
                                        {pgIdx > 0 && (
                                            <img src={arrowBack} alt="" />
                                        )}
                                    </div>
                                    <div>
                                        {pgIdx + 1} of {asmt.questions.length}
                                    </div>
                                </nav>
                                <header>
                                    <h1>{asmt.name} Test</h1>
                                </header>
                                <div className="questions">
                                    <p className="par">{elmnt.question}</p>
                                    {elmnt.options.map((ele, ind) => (
                                        <fieldset
                                            key={ind}
                                            className={
                                                state[pgIdx]?.optionWeight ===
                                                ele.option_weight
                                                    ? "picked"
                                                    : ""
                                            }
                                        >
                                            <div>
                                                <input
                                                    type="radio"
                                                    value={ele.option_weight}
                                                    name="options"
                                                    onChange={(e) => {
                                                        handlePickedOption(
                                                            e.target.value,
                                                            pgIdx
                                                        );
                                                    }}
                                                />

                                                <p>{ele.option_value}</p>
                                            </div>
                                        </fieldset>
                                    ))}
                                    <button
                                        type={
                                            pgIdx < asmt.questions.length - 1
                                                ? "button"
                                                : "submit"
                                        }
                                        onClick={() => {
                                            if (
                                                pgIdx !==
                                                asmt.questions.length - 1
                                            ) {
                                                formRef.current.scrollLeft +=
                                                    formRef.current.clientWidth;
                                            }
                                        }}
                                        disabled={!getISBtnDisabled(pgIdx)}
                                    >
                                        {pgIdx < asmt.questions.length - 1
                                            ? "Next"
                                            : "Submit"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Spinner />
                )}
            </form>
        </div>
    );
}

export default Assessments;
