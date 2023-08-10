import { useEffect, useRef, useState } from "react";
import "./Assessment.css";
import { api } from "../../../Globals";
import arrowBack from "../../Assets/back.svg";

function Assessments(props) {
  var { test } = props;
  var [asmt, setAsmt] = useState();
  var [state, setState] = useState([]);

  useEffect(() => {
    const requests = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${api}/daily-assessment-questions`, requests)
      .then((response) => response.json())
      .then((result) => {
        if (result && result.data.daily_assessment_conditions) {
          const asmtData = result.data.daily_assessment_conditions[0];

          setAsmt(asmtData);
          setState(() =>
            asmtData.questions.map((elmnt) => ({
              questionValue: elmnt.question_value,
              optionWeight: 0,
            }))
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [test]);

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
    return state[index].optionWeight !== null && state[index].optionWeight > 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = state.reduce(
      (accumulator, currentObject) => {
        return {
          optionWeight: accumulator.optionWeight + currentObject.optionWeight,
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
                <nav>
                  <div
                    onClick={() => {
                      formRef.current.scrollLeft -= formRef.current.clientWidth;
                    }}
                  >
                    {pgIdx > 0 && <img src={arrowBack} alt="" />}
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
                        state[pgIdx]?.optionWeight === ele.option_weight
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
                            handlePickedOption(e.target.value, pgIdx);
                          }}
                        />

                        <p>{ele.option_value}</p>
                      </div>
                    </fieldset>
                  ))}
                  <button
                    type={
                      pgIdx < asmt.questions.length - 1 ? "button" : "submit"
                    }
                    onClick={() => {
                      if (pgIdx !== asmt.questions.length - 1) {
                        formRef.current.scrollLeft +=
                          formRef.current.clientWidth;
                      }
                    }}
                    disabled={!getISBtnDisabled(pgIdx)}
                  >
                    {pgIdx < asmt.questions.length - 1 ? "Next" : "Submit"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </form>
    </div>
  );
}

export default Assessments;
