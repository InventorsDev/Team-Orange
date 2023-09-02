import { FormDetails } from "../../../../Globals/FormContext";
import "./viewjournals.css";
import { useEffect, useState } from "react";
import { api } from "../../../../Globals/Globals";
import Nav from "../../../Tranquil/Nav/Nav";
function ViewJournals() {
    var { token } = FormDetails();
    var [userJournals, setUserJournals] = useState([]);
    useEffect(() => {
        var requests = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch(`${api}/user/journals`, requests)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setUserJournals(result.data);
            });
    }, [token]);

    return (
        <div className="ViewJournal">
            <div className="navcont">
                <Nav link="/tranquil/home/journal" />
            </div>
            <header>
                <h1>My Journal</h1>
            </header>
            <div className="journals">
                {userJournals.length > 0
                    ? userJournals.map((elem, index) => (
                          <div className="Eachjournal" key={index}>
                              <section>
                                  <div>
                                      <h2>{elem.title}</h2>
                                      <p>{elem.content}</p>
                                  </div>
                              </section>
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
}

export default ViewJournals;
