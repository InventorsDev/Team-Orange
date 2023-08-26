import { useEffect, useState } from "react";
import Nav from "../../Tranquil/Nav/Nav";
import "./Viewgoals.css";
import { api } from "../../../Globals/Globals";

import { FormDetails } from "../../../Globals/FormContext";

function ViewGoals() {
    var [userGoals, setUserGoals] = useState([]);
    var { token } = FormDetails();

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

    const handleDate = (elem) => {
        const [yearstr, monthstr, datestr] = elem?.split("-");
        const year = parseInt(yearstr, 10);
        const month = parseInt(monthstr, 10);
        const date = parseInt(datestr, 10);
        return `${months[month - 1]} ${date}, ${year}`;
    };

    const handleDue = (date, index, id) => {
        var [yearstr, monthstr, daystr] = date.split("-");
        var day = parseInt(daystr, 10);
        var month = parseInt(monthstr, 10) - 1;
        var year = parseInt(yearstr, 10);
        var d = new Date();
        var cday = d.getDate();
        var cmonth = d.getMonth();
        var cyear = d.getFullYear();

        if (day < cday && month <= cmonth && year <= cyear) {
            return (
                <section>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleDel(index, id);
                        }}
                    >
                        <span>Mark Completed</span>
                        <span> Due!</span>
                    </button>
                </section>
            );
        } else {
            return (
                <section>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleDel(index, id);
                        }}
                    >
                        <span>Mark Completed</span>
                    </button>
                </section>
            );
        }
    };

    const handleDel = (index, id) => {
        var requests = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch(`${api}/goal-settings/${id}`, requests)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
            });
    };

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
                console.log(result);
                if (result && result.data) {
                    setUserGoals(result.data.data);
                }
            });
    }, [token]);

    return (
        <div className="ViewGoals">
            <div className="navcont">
                <Nav link="/tranquil/goals" />
            </div>
            <header>
                <h1>My Goals</h1>
            </header>
            <div className="goals">
                {userGoals
                    ? userGoals.map((elem, index) => (
                          <div className="Eachgoal" key={index}>
                              <section>
                                  <div>
                                      <h2>{elem.goal_plan}</h2>
                                      <p>{elem.goal_information}</p>
                                  </div>
                                  <div></div>
                                  <div>
                                      <p>
                                          Start Date:{" "}
                                          {handleDate(elem.start_date)}
                                      </p>
                                      <p>
                                          End Date: {handleDate(elem.end_date)}
                                      </p>
                                  </div>
                              </section>

                              {handleDue(elem.end_date, index, elem.id)}
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
}

export default ViewGoals;
