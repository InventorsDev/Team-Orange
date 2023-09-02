import Nav from "../../Tranquil/Nav/Nav";
import "./Journal.css";
import firstentry from "../../Assets/firstentry.svg";
import rightarr from "../../Assets/rightarr.svg";
import { useNavigate } from "react-router";

function GetStarted() {
    var navigate = useNavigate();
    var d = new Date();
    var date = d.getDate();
    var month = d.getMonth();
    var day = d.getDay();
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var months = [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];
    var monthstr = months[month];
    var daystr = days[day];
    return (
        <div className="Journalgetstarted">
            <Nav link="/tranquil/home/journal" />
            <div className="imagediv">
                <img src={firstentry} alt="" />
            </div>
            <div className="letshelpyou">
                <p>
                    {daystr}, {monthstr} {date}
                </p>
                <h1>Let's help you write your first entry</h1>
                <button
                    onClick={() => {
                        navigate("/tranquil/home/journal/entry");
                    }}
                >
                    <img src={rightarr} alt="" />
                </button>
            </div>
        </div>
    );
}

export default GetStarted;
