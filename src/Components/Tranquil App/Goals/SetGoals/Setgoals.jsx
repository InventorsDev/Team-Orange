import "./Setgoals.css";
import Nav from "../../Tranquil/Nav/Nav";
import calgrey from "../../Assets/calGrey.svg";
import { PageDetails } from "../../Tranquil/PageContext";
import { useEffect, useState } from "react";
import { FormDetails } from "../../../Globals/FormContext";
import { api } from "../../../Globals/Globals";
import goalSet from "../../Assets/profileUpdateSuccess.svg";
import { useNavigate } from "react-router";

function SetGoals() {
    var { setCurrentPage } = PageDetails();
    var navigate = useNavigate();
    var { token } = FormDetails();
    var date = new Date();
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var day = date.getDate().toString().padStart(2, "0");
    var nextday = (date.getDate() + 1).toString().padStart(2, "0");
    var [state, setState] = useState({
        goalPlan: "",
        goalInfo: "",
        duration: "weekly",
        startDate: `${year}-${month}-${day}`,
        endDate: `${year}-${month}-${nextday}`,
    });
    var [isgoalSet, setGoalstatus] = useState(false);
    var [message, setMessage] = useState({
        string: "",
        state: false,
    });

    // useEffect(() => {
    //     console.log(state);
    // }, [state]);

    useEffect(() => {
        setCurrentPage("goals");
    });

    const isGoalsSetValid = () => {
        return state.goalInfo !== "" && state.goalPlan !== "";
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        var goalsBody = {
            goal_plan: state.goalPlan,
            goal_information: state.goalInfo,
            duration: state.duration,
            start_date: state.startDate,
            end_date: state.endDate,
        };

        var requests = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(goalsBody),
            redirect: "follow",
        };

        fetch(`${api}/goal-settings`, requests)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if ((result.statusCode = 201)) {
                    setGoalstatus(true);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="SetGoals">
            <div className="navCont">
                <Nav link="/tranquil/goals" />
            </div>
            <header>
                <h1>Goal Setting</h1>
            </header>

            <form onSubmit={handleSubmit}>
                <fieldset className="goalPlan">
                    <label>Goal Plan</label>
                    <textarea
                        placeholder="e.g Read five health-related books daily"
                        value={state.goalPlan}
                        onChange={(e) => {
                            setState({
                                ...state,
                                goalPlan: e.target.value.trimStart(),
                            });
                        }}
                    />
                </fieldset>
                <fieldset className="goalInfo">
                    <label>Goal Information</label>
                    <textarea
                        placeholder="e.g The main aim of the goal is to read books regarding mental health to improve on how I think and behave to things"
                        value={state.goalInfo}
                        onChange={(e) => {
                            setState({
                                ...state,
                                goalInfo: e.target.value.trimStart(),
                            });
                        }}
                    />
                </fieldset>

                <fieldset className="startdate">
                    <label>Start Date</label>
                    <input
                        type="date"
                        value={state.startDate}
                        onChange={(e) => {
                            setState({
                                ...state,
                                startDate: e.target.value,
                            });
                        }}
                    />
                    <img src={calgrey} alt="" />
                </fieldset>
                <fieldset className="endDate">
                    <label>End Date</label>
                    <input
                        type="date"
                        value={state.endDate}
                        onChange={(e) => {
                            setState({
                                ...state,
                                endDate: e.target.value,
                            });
                        }}
                    />
                    <img src={calgrey} alt="" />
                </fieldset>
                {message.string ? (
                    <p className={message.state ? "success" : "fail"}>
                        {message.string}
                    </p>
                ) : null}
                <button type="submit" disabled={!isGoalsSetValid()}>
                    Set Goal
                </button>
            </form>
            {isgoalSet ? (
                <div className="goalSet">
                    <div>
                        <img src={goalSet} alt="" />
                        <h1>Congratulations</h1>
                        <p>You have successfully set a goal</p>
                        <button
                            onClick={() => {
                                navigate("/tranquil/goals");
                            }}
                        >
                            Done
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default SetGoals;
