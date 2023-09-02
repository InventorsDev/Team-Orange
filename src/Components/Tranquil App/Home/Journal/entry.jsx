import Nav from "../../Tranquil/Nav/Nav";
import "./Journal.css";
import cam from "../../Assets/cam.svg";
import journalcam from "../../Assets/journalcam.svg";
import zigzag from "../../Assets/zigzag.svg";
import torch from "../../Assets/torch.svg";
import cancel from "../../Assets/cancel.svg";
import { useState } from "react";
import { api } from "../../../Globals/Globals";
import { FormDetails } from "../../../Globals/FormContext";
import Spinner from "../../../Globals/Spinner/Spinner";
import journalCreated from "../../Assets/profileUpdateSuccess.svg";

function Entry() {
    var { token } = FormDetails();
    var [state, setState] = useState({
        title: "",
        content: "",
    });
    var [showSpinner, setShowSpinner] = useState(false);
    var [isJournalCreated, setIsJournalCreated] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSpinner(true);
        var userDetails = {
            title: state.title,
            content: state.content,
        };

        var requests = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails),
        };
        fetch(`${api}/user/journal`, requests)
            .then((response) => response.json())
            .then((result) => {
                if (result.statusCode === 201) {
                    setIsJournalCreated(true);
                    setShowSpinner(false);
                }
            })
            .catch(console.log("error"));
    };

    const isbuttonDisabled = () => {
        return state.title !== "" && state.content !== "";
    };

    return (
        <div className="Journalentry">
            {showSpinner ? <Spinner /> : null}
            <Nav link="/tranquil/home/journal/getstarted" />
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <input
                        type="text"
                        placeholder="Untitled"
                        value={state.title}
                        onChange={(e) => {
                            setState({
                                ...state,
                                title: e.target.value,
                            });
                        }}
                    />
                    <textarea
                        placeholder="Start Writing. . ."
                        value={state.content}
                        onChange={(e) => {
                            setState({
                                ...state,
                                content: e.target.value,
                            });
                        }}
                    />
                    <button type="submit" disabled={!isbuttonDisabled()}>
                        Submit
                    </button>
                </fieldset>
            </form>

            <div className="basedesigns">
                <div className="camera">
                    <section>
                        <img src={cam} alt="" />
                    </section>
                    <div></div>
                    <section>
                        <img src={journalcam} alt="" />
                    </section>
                    <div></div>
                    <section>
                        <img src={zigzag} alt="" />
                    </section>
                </div>
                <div className="insights">
                    <div>
                        <img src={torch} alt="" />
                    </div>
                    <div>
                        <img src={cancel} alt="" />
                    </div>
                </div>
            </div>

            {isJournalCreated ? (
                <div className="journalcreated">
                    <div>
                        <img src={journalCreated} alt="" />
                        <h1>Congratulations</h1>
                        <p>You have successfully created a journal </p>
                        <button
                            onClick={() => {
                                setState({
                                    ...state,
                                    title: "",
                                    content: "",
                                });
                                setIsJournalCreated(false);
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

export default Entry;
